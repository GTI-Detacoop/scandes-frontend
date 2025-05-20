import { type Configuration, LogLevel, PublicClientApplication } from '@azure/msal-browser'

export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_MSAL_CLIENT_ID || 'd6a6992a-85b8-4530-a6f3-40a669f12c4a',
    authority: import.meta.env.VITE_MSAL_AUTHORITY || 'https://login.microsoftonline.com/dd0ebd4a-dbd1-46be-b1d2-1e6dd5ce5123/v2.0/.well-known/openid-configuration',
    redirectUri: import.meta.env.VITE_MSAL_REDIRECT_URI || window.location.origin,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message)
            break
          case LogLevel.Info:
            console.info(message)
            break
          case LogLevel.Verbose:
            console.warn(message)
            break
          case LogLevel.Warning:
            console.warn(message)
            break
          default:
            break
        }
      },
      logLevel: LogLevel.Info,
    },
  },
}

export const loginRequest = {
  scopes: ['User.Read', 'profile', 'openid', 'email'],
}

export const msalInstance = new PublicClientApplication(msalConfig)

export default msalInstance
