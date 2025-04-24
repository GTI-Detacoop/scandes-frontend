import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Interfaces para tipado
export interface NestedMenuItem {
  id: string
  title: string
  icon: string
  component: string
}

export interface SubMenuItem {
  id: string
  title: string
  icon: string
  component: string
  nested?: NestedMenuItem[]
  isGroup?: boolean
}

export interface MainMenuItem {
  id: string
  title: string
  icon: string
  component?: string
  subItems: SubMenuItem[]
}

export const useDashboardStore = defineStore('dashboard', () => {
  // Estado
  const selectedMainItem = ref<string>('descuento-planilla')
  const selectedSubItem = ref<string>('evaluacion-credito-id')
  const sidebarExpanded = ref<boolean>(true)

  // Configuración de ítems del menú
  const mainMenuItems = ref<MainMenuItem[]>([
    {
      id: 'descuento-planilla',
      title: 'Descuento por Planilla',
      icon: 'mdi-view-dashboard-outline',
      subItems: [
        {
          id: 'evaluacion-credito',
          title: 'Evaluación de Crédito',
          icon: 'mdi-file-document-outline',
          component: 'EvaluacionCreditoComponent',
          isGroup: true,
          nested: [
            {
              id: 'evaluacion-credito-id',
              title: 'Carnet de Identidad',
              icon: 'mdi-card-account-details-outline',
              component: 'CarnetIdentidadComponent'
            },
            {
              id: 'evaluacion-credito-ips',
              title: 'IPS',
              icon: 'mdi-hospital-box-outline',
              component: 'IPSComponent'
            }
          ]
        },
        {
          id: 'obtener-ips',
          title: 'Obtener IPS',
          icon: 'mdi-cloud-download',
          component: 'ObtenerIPSComponent'
        },
        {
          id: 'historial',
          title: 'Historial',
          icon: 'mdi-history',
          component: 'HistorialComponent'
        }
      ]
    },
    {
      id: 'otro-producto',
      title: 'Otro Producto',
      icon: 'mdi-card-account-details-outline',
      subItems: [
        {
          id: 'otro-producto-inicio',
          title: 'Inicio',
          icon: 'mdi-home-outline',
          component: 'OtroProductoComponent'
        }
      ]
    }
  ])

  // Getters
  const currentMainItem = computed(() => {
    return mainMenuItems.value.find(item => item.id === selectedMainItem.value)
  })

  const currentSubItems = computed(() => {
    return currentMainItem.value?.subItems || []
  })

  const currentSubItem = computed(() => {
    // Buscar primero en los ítems directos
    let found = currentSubItems.value.find(item => item.id === selectedSubItem.value)

    // Si no se encuentra, buscar en los ítems anidados
    if (!found) {
      for (const subItem of currentSubItems.value) {
        if (subItem.nested) {
          found = subItem.nested.find(nestedItem => nestedItem.id === selectedSubItem.value)
          if (found) break
        }
      }
    }

    return found
  })

  // Obtener un grupo padre para un item anidado
  const getParentGroup = computed(() => {
    for (const subItem of currentSubItems.value) {
      if (subItem.nested && subItem.nested.some(nestedItem => nestedItem.id === selectedSubItem.value)) {
        return subItem
      }
    }
    return null
  })

  const currentTitle = computed(() => {
    if (currentSubItem.value) {
      return currentSubItem.value.title
    } else if (currentMainItem.value) {
      return currentMainItem.value.title
    }
    return 'Dashboard'
  })

  const currentComponent = computed(() => {
    if (currentSubItem.value) {
      return currentSubItem.value.component
    } else if (currentMainItem.value?.component) {
      return currentMainItem.value.component
    }
    return null
  })

  // Acciones
  function setMainItem(itemId: string) {
    selectedMainItem.value = itemId

    // Seleccionar automáticamente el primer subitem disponible
    const mainItem = mainMenuItems.value.find(item => item.id === itemId)
    if (mainItem && mainItem.subItems.length > 0) {
      const firstSubItem = mainItem.subItems[0]
      if (firstSubItem.isGroup && firstSubItem.nested && firstSubItem.nested.length > 0) {
        selectedSubItem.value = firstSubItem.nested[0].id
      } else {
        selectedSubItem.value = firstSubItem.id
      }
    }
  }

  function setSubItem(itemId: string) {
    selectedSubItem.value = itemId
  }

  function toggleSidebar() {
    sidebarExpanded.value = !sidebarExpanded.value
  }

  return {
    // Estado
    selectedMainItem,
    selectedSubItem,
    sidebarExpanded,
    mainMenuItems,

    // Getters
    currentMainItem,
    currentSubItems,
    currentSubItem,
    getParentGroup,
    currentTitle,
    currentComponent,

    // Acciones
    setMainItem,
    setSubItem,
    toggleSidebar
  }
})
