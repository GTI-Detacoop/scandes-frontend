import { defineStore } from 'pinia'
import { type AccountInfo, InteractionStatus } from '@azure/msal-browser'
import { msalInstance, loginRequest } from '@/config/msalConfig'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const account = ref<AccountInfo | null>(null)
  const isAuthenticated = ref(false)
  const userRoles = ref<string[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)
  const accessToken = ref<string | null>(null)
  const interactionStatus = ref<InteractionStatus | null>(null)

  const userName = computed(() => account.value?.name || '')
  const userEmail = computed(() => account.value?.username || '')
  const userId = computed(() => account.value?.localAccountId || '')
  const userClaims = computed(() => {
    if (!account.value?.idTokenClaims) return {}
    return account.value.idTokenClaims
  })

  const userInitials = computed(() => {
    if (userName.value) {
      const nameParts = userName.value.split(' ');
      if (nameParts.length >= 2) {
        return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
      }
      return userName.value.substring(0, 2).toUpperCase();
    }

    if (userEmail.value) {
      const username = userEmail.value.split('@')[0];
      return username.substring(0, 2).toUpperCase();
    }

    return '?';
  })

  const hasRole = computed(() => (role: string) => userRoles.value.includes(role))

  async function initialize() {
    loading.value = true
    error.value = null

    await msalInstance.initialize().then(() => {
      msalInstance.handleRedirectPromise().catch((error) => {
        console.error('Error in redirect:', error)
      })
    })

    try {
      const currentAccounts = msalInstance.getAllAccounts()

      if (currentAccounts.length > 0) {
        account.value = currentAccounts[0]
        isAuthenticated.value = true
        await getUserRoles()
        loading.value = false
      } else {
        isAuthenticated.value = false
        account.value = null
      }

      return isAuthenticated.value
    } catch (err) {
      console.error('Error initializing auth:', err)
      error.value = err instanceof Error ? err : new Error(String(err))
      loading.value = false
      return false
    }
  }

  async function loginRedirect() {
    try {
      await msalInstance.loginRedirect(loginRequest)
    } catch (err) {
      console.error('Error initializing redirect flow:', err)
      error.value = err instanceof Error ? err : new Error(String(err))
      throw err
    }
  }

  async function handleRedirectCallback() {
    try {
      const authResult = await msalInstance.handleRedirectPromise()
      if (!authResult) {
        loading.value = false
        return null
      }
      account.value = authResult.account
      isAuthenticated.value = true
      await getUserRoles()
      accessToken.value = authResult.accessToken
      loading.value = false
    } catch (err) {
      console.error('Error handling the redirection flow:', err)
      error.value = err instanceof Error ? err : new Error(String(err))
      throw err
    }
  }

  async function logoutRedirect() {
    try {
      await msalInstance.logoutRedirect()
      resetState()
    } catch (err) {
      console.error('Error during logout:', err)
      error.value = err instanceof Error ? err : new Error(String(err))
      throw err
    }
  }

  async function getAccessToken(scopes: string[] = loginRequest.scopes) {
    loading.value = true
    error.value = null

    try {
      if (!account.value) {
        throw new Error('No account found')
      }

      const tokenRequest = {
        scopes,
        account: account.value,
      }

      const authResult = await msalInstance.acquireTokenSilent(tokenRequest)
      accessToken.value = authResult.accessToken
      loading.value = false
      return authResult.accessToken
    } catch (err) {
      console.error('Error acquiring token silently, try again...', err)

      try {
        const authResult = await msalInstance.acquireTokenPopup({
          scopes,
          account: account.value as AccountInfo,
        })

        accessToken.value = authResult.accessToken
        loading.value = false
        return authResult.accessToken
      } catch (interactiveErr) {
        console.error('Error acquireing token popup:', interactiveErr)
        error.value =
          interactiveErr instanceof Error ? interactiveErr : new Error(String(interactiveErr))
        loading.value = false
        throw interactiveErr
      }
    }
  }

  async function getUserRoles() {
    if (!account.value?.idTokenClaims) {
      userRoles.value = []
      return []
    }

    const claims = account.value.idTokenClaims

    const roles = claims.roles || claims.wids || claims.groups || []
    userRoles.value = Array.isArray(roles) ? roles : []

    return userRoles.value
  }

  function resetState() {
    account.value = null
    isAuthenticated.value = false
    userRoles.value = []
    accessToken.value = null
    error.value = null
  }

  function setInteractionStatus(status: InteractionStatus) {
    interactionStatus.value = status
  }

  return {
    account,
    isAuthenticated,
    userRoles,
    loading,
    error,
    accessToken,
    interactionStatus,

    userName,
    userEmail,
    userId,
    userClaims,
    userInitials,
    hasRole,

    initialize,
    loginRedirect,
    handleRedirectCallback,
    logoutRedirect,
    getAccessToken,
    getUserRoles,
    resetState,
    setInteractionStatus,
  }
})
