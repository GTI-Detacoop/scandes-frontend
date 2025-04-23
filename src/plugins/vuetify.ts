import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const scandesTheme = {
  dark: false,
  colors: {
    primary: 'rgb(4, 60, 92)',  // The requested main color
    secondary: '#607D8B',         // Bluish gray
    accent: '#26A69A',            // Teal
    info: '#2196F3',              // Information blue
    warning: '#FFC107',           // Warning yellow
    error: '#FF5252',             // Error red
    success: '#4CAF50',           // Success green
  },
}

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'scandesTheme',
    themes: {
      scandesTheme,
    },
  },
})

export default vuetify
