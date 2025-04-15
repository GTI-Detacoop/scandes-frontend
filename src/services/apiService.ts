// src/services/apiService.ts
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { useAuthStore } from '@/stores/authStore'

class ApiService {
  private axiosInstance: AxiosInstance
  private baseURL: string

  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com'

    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const authStore = useAuthStore()

        if (authStore.isAuthenticated) {
          try {
            const token = await authStore.getAccessToken()

            if (token && config.headers) {
              config.headers.Authorization = `Bearer ${token}`
            }
          } catch (error) {
            console.error('Error while getting access token:', error)
          }
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const authStore = useAuthStore()

        if (error.response && error.response.status === 401) {
          console.warn('Session expired or not authenticated')

          try {
            await authStore.getAccessToken()
            return this.axiosInstance(error.config)
          } catch (error) {
            authStore.logoutRedirect()
            return Promise.reject(error)
          }
        }

        return Promise.reject(error)
      },
    )
  }

  async get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(url, config)
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config)
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, config)
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config)
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleError(error: any): never {
    if (error.response) {
      console.error('Response error:', {
        data: error.response.data,
        status: error.response.status,
        headers: error.response.headers,
      })

      switch (error.response.status) {
        case 400:
          throw new Error('Solicitud incorrecta. Verifique los datos enviados.')
        case 403:
          throw new Error('No tiene permisos para realizar esta acción.')
        case 404:
          throw new Error('El recurso solicitado no existe.')
        case 500:
          throw new Error('Error interno del servidor. Inténtelo de nuevo más tarde.')
        default:
          throw new Error(
            `Error ${error.response.status}: ${error.response.data.message || 'Desconocido'}`,
          )
      }
    } else if (error.request) {
      console.error('Reqest error:', error.request)
      throw new Error('The server response was not recieve.')
    } else {
      console.error('Config error:', error.message)
      throw new Error('Error: ' + error.message)
    }
  }
}

// Singleton
export const apiService = new ApiService()

export default ApiService
