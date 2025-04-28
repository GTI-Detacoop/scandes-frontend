import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCarnetStore = defineStore('carnet', () => {
  const ci = ref('')
  const document = ref<File | undefined>(undefined)

  const setCi = (value: string) => {
    ci.value = value
  }

  const setDocument = (value: File | undefined) => {
    document.value = value
  }

  const clearForm = () => {
    ci.value = ''
    document.value = undefined
  }

  return {
    ci,
    document,
    setCi,
    setDocument,
    clearForm
  }
})
