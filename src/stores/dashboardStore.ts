import { defineStore } from 'pinia'
import { ref, computed, markRaw } from 'vue'
import { MenuTitle, MenuId, type MainMenuItem } from '../types/menu'
import ObtenerIPSComponent from '@/components/dashboard/content/ObtenerIPSComponent.vue'
import CreditAssessmentComponent from '@/components/dashboard/content/CreditAssesmentComponent.vue'
import HistorialComponent from '@/components/dashboard/content/HistorialComponent.vue'
import OtroProductoComponent from '@/components/dashboard/content/OtroProductoComponent.vue'

export const useDashboardStore = defineStore('dashboard', () => {
  const selectedMainItem = ref<MenuId>(MenuId.DESCUENTO_PLANILLA)
  const selectedSubItem = ref<MenuId>(MenuId.CARNET_IDENTIDAD)
  const sidebarExpanded = ref<boolean>(true)


  const mainMenuItems = ref<MainMenuItem[]>([
    {
      id: MenuId.DESCUENTO_PLANILLA,
      title: MenuTitle.DESCUENTO_PLANILLA,
      icon: 'mdi-cash-multiple',
      subItems: [
        {
          id: MenuId.EVALUACION_CREDITO,
          title: MenuTitle.EVALUACION_CREDITO,
          icon: 'mdi-file-search',
          component: markRaw(CreditAssessmentComponent),
          isGroup: true,
          nested: [
            {
              id: MenuId.CARNET_IDENTIDAD,
              title: MenuTitle.CARNET_IDENTIDAD,
              icon: 'mdi-card-account-details',
              component: markRaw(CreditAssessmentComponent)
            },
            {
              id: MenuId.IPS,
              title: MenuTitle.IPS,
              icon: 'mdi-hospital-box',
              component: markRaw(CreditAssessmentComponent)
            },
            {
              id: MenuId.ACLARACION_DEUDA,
              title: MenuTitle.ACLARACION_DEUDA,
              icon: 'mdi-file-check',
              component: markRaw(CreditAssessmentComponent)
            },
            {
              id: MenuId.CERTIFICADO_DEUDA,
              title: MenuTitle.CERTIFICADO_DEUDA,
              icon: 'mdi-file-document-check',
              component: markRaw(CreditAssessmentComponent)
            },
            {
              id: MenuId.INFORMES_COMERCIALES,
              title: MenuTitle.INFORMES_COMERCIALES,
              icon: 'mdi-chart-box',
              component: markRaw(CreditAssessmentComponent)
            },
            {
              id: MenuId.LEY_REEMPENDIMIENTO,
              title: MenuTitle.LEY_REEMPENDIMIENTO,
              icon: 'mdi-gavel',
              component: markRaw(CreditAssessmentComponent)
            },
            {
              id: MenuId.REGISTRO_DEUDORES,
              title: MenuTitle.REGISTRO_DEUDORES,
              icon: 'mdi-account-alert',
              component: markRaw(CreditAssessmentComponent)
            },
            {
              id: MenuId.PREEVALUACION_CREDITO,
              title: MenuTitle.PREEVALUACION_CREDITO,
              icon: 'mdi-file-document-edit',
              component: markRaw(CreditAssessmentComponent)
            },
            {
              id: MenuId.VIGENCIA_CEDULA,
              title: MenuTitle.VIGENCIA_CEDULA,
              icon: 'mdi-card-account-details-star',
              component: markRaw(CreditAssessmentComponent)
            },
            {
              id: MenuId.NEITCOM,
              title: MenuTitle.NEITCOM,
              icon: 'mdi-shield-check',
              component: markRaw(CreditAssessmentComponent)
            },
            {
              id: MenuId.VALIDACION_PREVISION,
              title: MenuTitle.VALIDACION_PREVISION,
              icon: 'mdi-medical-bag',
              component: markRaw(CreditAssessmentComponent)
            }
          ]
        },
        {
          id: MenuId.OBTENER_IPS,
          title: MenuTitle.OBTENER_IPS,
          icon: 'mdi-download',
          component: markRaw(ObtenerIPSComponent)
        },
        {
          id: MenuId.HISTORIAL,
          title: MenuTitle.HISTORIAL,
          icon: 'mdi-history',
          component: markRaw(HistorialComponent)
        }
      ]
    },
    {
      id: MenuId.OTRO_PRODUCTO,
      title: MenuTitle.OTRO_PRODUCTO,
      icon: 'mdi-package-variant',
      subItems: [
        {
          id: MenuId.INICIO,
          title: MenuTitle.INICIO,
          icon: 'mdi-home',
          component: markRaw(OtroProductoComponent)
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
    let found = currentSubItems.value.find(item => item.id === selectedSubItem.value)

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

  function setMainItem(itemId: MenuId) {
    selectedMainItem.value = itemId
  }

  function setSubItem(itemId: MenuId) {
    selectedSubItem.value = itemId
  }

  function toggleSidebar() {
    sidebarExpanded.value = !sidebarExpanded.value
  }

  return {
    // States
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
