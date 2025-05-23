import { defineStore } from 'pinia'
import { ref, computed, markRaw, watch } from 'vue'
import { DocumentType, type DocumentMap, type Step } from '@/types/creditAssessment'
import { MenuId, MenuTitle } from '@/types/menu'
import { useProductStore } from '@/stores/productStore'
import type { SubProduct } from '@/types/product'
import CarnetIdentidadComponent from '@/components/dashboard/content/credit-assessment/CarnetIdentidadComponent.vue'
import AclaracionDeudaComponent from '@/components/dashboard/content/credit-assessment/AclaracionDeudaComponent.vue'
import CertificadoDeudaComponent from '@/components/dashboard/content/credit-assessment/CertificadoDeudaComponent.vue'
import InformesComercialesComponent from '@/components/dashboard/content/credit-assessment/InformesComercialesComponent.vue'
import LeyReemprendimientoComponent from '@/components/dashboard/content/credit-assessment/LeyReemprendimientoComponent.vue'
import RegistroDeudoresComponent from '@/components/dashboard/content/credit-assessment/RegistroDeudoresComponent.vue'
import PreevaluacionCreditoComponent from '@/components/dashboard/content/credit-assessment/PreevaluacionCreditoComponent.vue'
import VigenciaCedulaComponent from '@/components/dashboard/content/credit-assessment/VigenciaCedulaComponent.vue'
import NeitcomComponent from '@/components/dashboard/content/credit-assessment/NeitcomComponent.vue'
import ValidacionPrevisionComponent from '@/components/dashboard/content/credit-assessment/ValidacionPrevisionComponent.vue'
import CarnetMedicinaCurativaComponent from '@/components/dashboard/content/credit-assessment/CarnetMedicinaCurativaComponent.vue'
import CertificadoSaldoDeFondaComponent from '@/components/dashboard/content/credit-assessment/CertificadoSaldoDeFondaComponent.vue'
import CertificadoDeNacimientoComponent from '@/components/dashboard/content/credit-assessment/CertificadoDeNacimientoComponent.vue'
import CertificadoDeMatrimonioComponent from '@/components/dashboard/content/credit-assessment/CertificadoDeMatrimonioComponent.vue'
import PolizaComponent from '@/components/dashboard/content/credit-assessment/PolizaComponent.vue'
import LiquidacionesComponent from '@/components/dashboard/content/credit-assessment/LiquidacionesComponent.vue'

export const useCreditAssessmentStore = defineStore('creditAssessment', () => {
  const productStore = useProductStore()

  const allSteps = ref<Step[]>([
    { id: MenuId.LIQUIDACIONES, title: MenuTitle.LIQUIDACIONES, icon: 'mdi-hospital-box', component: markRaw(LiquidacionesComponent), documentType: DocumentType.LIQUIDACIONES },
    { id: MenuId.CARNET_IDENTIDAD , title: MenuTitle.CARNET_IDENTIDAD, icon: 'mdi-card-account-details', component:  markRaw(CarnetIdentidadComponent), documentType: DocumentType.CARNET_IDENTIDAD },
    { id: MenuId.INFORMES_COMERCIALES, title: MenuTitle.INFORMES_COMERCIALES, icon: 'mdi-chart-box', component: markRaw(InformesComercialesComponent), documentType: DocumentType.INFORMES_COMERCIALES },
    { id: MenuId.VALIDACION_PREVISION, title: MenuTitle.VALIDACION_PREVISION, icon: 'mdi-shield-check', component: markRaw(ValidacionPrevisionComponent), documentType: DocumentType.VALIDACION_PREVISION },
    { id: MenuId.LEY_REEMPENDIMIENTO, title: MenuTitle.LEY_REEMPENDIMIENTO, icon: 'mdi-gavel', component: markRaw(LeyReemprendimientoComponent), documentType: DocumentType.LEY_REEMPENDIMIENTO },
    { id: MenuId.REGISTRO_DEUDORES, title:  MenuTitle.REGISTRO_DEUDORES, icon: 'mdi-account-alert', component: markRaw(RegistroDeudoresComponent), documentType: DocumentType.REGISTRO_DEUDORES },
    { id: MenuId.PREEVALUACION_CREDITO, title: MenuTitle.PREEVALUACION_CREDITO, icon: 'mdi-file-document-edit', component: markRaw(PreevaluacionCreditoComponent), documentType: DocumentType.PREEVALUACION_CREDITO },
    { id: MenuId.VIGENCIA_CEDULA, title: MenuTitle.VIGENCIA_CEDULA, icon: 'mdi-card-account-details-outline', component: markRaw(VigenciaCedulaComponent), documentType: DocumentType.VIGENCIA_CEDULA },
    { id: MenuId.NEITCOM, title: MenuTitle.NEITCOM, icon: 'mdi-database-search', component: markRaw(NeitcomComponent), documentType: DocumentType.NEITCOM },
    { id: MenuId.CERTIFICADO_DEUDA, title: MenuTitle.CERTIFICADO_DEUDA, icon: 'mdi-file-document-check', component: markRaw(CertificadoDeudaComponent), documentType: DocumentType.CERTIFICADO_DEUDA },
    { id: MenuId.CARNET_MEDICINA_CURATIVA, title: MenuTitle.CARNET_MEDICINA_CURATIVA, icon: 'mdi-medical-bag', component: markRaw(CarnetMedicinaCurativaComponent), documentType: DocumentType.CARNET_MEDICINA_CURATIVA },
    { id: MenuId.CERTIFICADO_SALDO_DE_FONDA, title: MenuTitle.CERTIFICADO_SALDO_DE_FONDA, icon: 'mdi-cash-check', component: markRaw(CertificadoSaldoDeFondaComponent), documentType: DocumentType.CERTIFICADO_SALDO_DE_FONDA },
    // Optional documents
    { id: MenuId.ACLARACION_DEUDA, title: MenuTitle.ACLARACION_DEUDA, icon: 'mdi-file-check', component: markRaw(AclaracionDeudaComponent), documentType: DocumentType.ACLARACION_DEUDA },
    { id: MenuId.CERTIFICADO_DE_NACIMIENTO, title: MenuTitle.CERTIFICADO_DE_NACIMIENTO, icon: 'mdi-baby', component: markRaw(CertificadoDeNacimientoComponent), documentType: DocumentType.CERTIFICADO_DE_NACIMIENTO },
    { id: MenuId.CERTIFICADO_DE_MATRIMONIO, title: MenuTitle.CERTIFICADO_DE_MATRIMONIO, icon: 'mdi-ring', component: markRaw(CertificadoDeMatrimonioComponent), documentType: DocumentType.CERTIFICADO_DE_MATRIMONIO },
    { id: MenuId.POLIZA, title: MenuTitle.POLIZA, icon: 'mdi-shield-check', component: markRaw(PolizaComponent), documentType: DocumentType.POLIZA },
  ])

  const steps = ref<Step[]>([...allSteps.value])

  const documents = ref<DocumentMap>({
    [DocumentType.CARNET_IDENTIDAD]: undefined,
    [DocumentType.LIQUIDACIONES]: undefined,
    [DocumentType.ACLARACION_DEUDA]: undefined,
    [DocumentType.CERTIFICADO_DEUDA]: undefined,
    [DocumentType.INFORMES_COMERCIALES]: undefined,
    [DocumentType.LEY_REEMPENDIMIENTO]: undefined,
    [DocumentType.REGISTRO_DEUDORES]: undefined,
    [DocumentType.PREEVALUACION_CREDITO]: undefined,
    [DocumentType.VIGENCIA_CEDULA]: undefined,
    [DocumentType.NEITCOM]: undefined,
    [DocumentType.VALIDACION_PREVISION]: undefined,
    [DocumentType.CARNET_MEDICINA_CURATIVA]: undefined,
    [DocumentType.CERTIFICADO_SALDO_DE_FONDA]: undefined,
    [DocumentType.CERTIFICADO_DE_NACIMIENTO]: undefined,
    [DocumentType.CERTIFICADO_DE_MATRIMONIO]: undefined,
    [DocumentType.POLIZA]: undefined
  })

  function setDocument(type: DocumentType, file: File | undefined) {
    documents.value[type] = file
  }

  function getDocument(type: DocumentType): File | undefined {
    return documents.value[type]
  }

  function clearAllDocuments() {
    Object.keys(documents.value).forEach(key => {
      documents.value[key as DocumentType] = undefined
    })
  }

  const carnetIdentidad = computed(() => documents.value[DocumentType.CARNET_IDENTIDAD])
  const liquidaciones = computed(() => documents.value[DocumentType.LIQUIDACIONES])
  const aclaracionDeuda = computed(() => documents.value[DocumentType.ACLARACION_DEUDA])
  const certificadoDeuda = computed(() => documents.value[DocumentType.CERTIFICADO_DEUDA])
  const informesComerciales = computed(() => documents.value[DocumentType.INFORMES_COMERCIALES])
  const leyReemprendimiento = computed(() => documents.value[DocumentType.LEY_REEMPENDIMIENTO])
  const registroDeudores = computed(() => documents.value[DocumentType.REGISTRO_DEUDORES])
  const preevaluacionCredito = computed(() => documents.value[DocumentType.PREEVALUACION_CREDITO])
  const vigenciaCedula = computed(() => documents.value[DocumentType.VIGENCIA_CEDULA])
  const neitcom = computed(() => documents.value[DocumentType.NEITCOM])
  const validacionPrevision = computed(() => documents.value[DocumentType.VALIDACION_PREVISION])
  const carnetMedicinaCurativa = computed(() => documents.value[DocumentType.CARNET_MEDICINA_CURATIVA])
  const certificadoSaldoDeFonda = computed(() => documents.value[DocumentType.CERTIFICADO_SALDO_DE_FONDA])
  const certificadoDeNacimiento = computed(() => documents.value[DocumentType.CERTIFICADO_DE_NACIMIENTO])
  const certificadoDeMatrimonio = computed(() => documents.value[DocumentType.CERTIFICADO_DE_MATRIMONIO])
  const poliza = computed(() => documents.value[DocumentType.POLIZA])

  const hasAnyDocuments = computed(() => {
    return steps.value.some(step => getDocument(step.documentType))
  })

  const missingDocuments = computed(() => {
    const requiredDocs = productStore.selectedSubProduct?.documentsNeeded || []
    return steps.value
      .filter(step => {
        const isRequired = requiredDocs.includes(step.id)
        return isRequired && !getDocument(step.documentType)
      })
      .map(step => ({
        id: step.id,
        title: step.title,
        icon: step.icon
      }))
  })

  const availableDocs = computed(() => {
    return steps.value
    .filter(step => {
      const document = getDocument(step.documentType)
      return document !== undefined && document !== null
    })
    .map(step => ({
      title: step.title,
      file: getDocument(step.documentType) as File
    }))
  })

  // Watch for changes in the selected product/subproduct and update steps accordingly
  watch(
    [
      () => productStore.selectedProduct,
      () => productStore.selectedSubProduct
    ],
    ([product, subProduct]) => {
      console.log('product', product)
      console.log('subProduct', subProduct)
      if (!product) {
        steps.value = [...allSteps.value]
        return
      }

      const requiredDocs = new Set<MenuId>()

      if (subProduct) {
        // If subproduct is selected, show its specific documents
        if (subProduct.documentsNeeded) {
          subProduct.documentsNeeded.forEach((doc: MenuId) => requiredDocs.add(doc))
          console.log('requiredDocs', requiredDocs)
        }
        if (subProduct.optionalDocuments) {
          subProduct.optionalDocuments.forEach((doc: MenuId) => requiredDocs.add(doc))
        }
      } else {
        // If only product is selected, show common documents across all its subproducts
        product.subProducts.forEach((sp: SubProduct, index: number) => {
          const docs = new Set([...(sp.documentsNeeded || []), ...(sp.optionalDocuments || [])])
          if (index === 0) {
            docs.forEach(doc => requiredDocs.add(doc))
          } else {
            for (const doc of [...requiredDocs]) {
              if (!docs.has(doc)) {
                requiredDocs.delete(doc)
              }
            }
          }
        })
      }

      steps.value = allSteps.value.filter(step => requiredDocs.has(step.id))
    },
    { immediate: true }
  )

  return {
    // States
    documents,
    steps,

    // Getters
    carnetIdentidad,
    liquidaciones,
    aclaracionDeuda,
    certificadoDeuda,
    informesComerciales,
    leyReemprendimiento,
    registroDeudores,
    preevaluacionCredito,
    vigenciaCedula,
    neitcom,
    validacionPrevision,
    carnetMedicinaCurativa,
    certificadoSaldoDeFonda,
    certificadoDeNacimiento,
    certificadoDeMatrimonio,
    poliza,
    hasAnyDocuments,
    missingDocuments,
    availableDocs,

    // Actions
    setDocument,
    getDocument,
    clearAllDocuments
  }
})
