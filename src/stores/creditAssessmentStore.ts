import { defineStore } from 'pinia'
import { ref, computed, markRaw } from 'vue'
import { DocumentType, type DocumentMap, type Step } from '@/types/creditAssessment'
import { MenuId, MenuTitle } from '@/types/menu'
import CarnetIdentidadComponent from '@/components/dashboard/content/credit-assessment/CarnetIdentidadComponent.vue'
import IPSComponent from '@/components/dashboard/content/credit-assessment/IPSComponent.vue'
import AclaracionDeudaComponent from '@/components/dashboard/content/credit-assessment/AclaracionDeudaComponent.vue'
import CertificadoDeudaComponent from '@/components/dashboard/content/credit-assessment/CertificadoDeudaComponent.vue'
import InformesComercialesComponent from '@/components/dashboard/content/credit-assessment/InformesComercialesComponent.vue'
import LeyReemprendimientoComponent from '@/components/dashboard/content/credit-assessment/LeyReemprendimientoComponent.vue'
import RegistroDeudoresComponent from '@/components/dashboard/content/credit-assessment/RegistroDeudoresComponent.vue'
import PreevaluacionCreditoComponent from '@/components/dashboard/content/credit-assessment/PreevaluacionCreditoComponent.vue'
import VigenciaCedulaComponent from '@/components/dashboard/content/credit-assessment/VigenciaCedulaComponent.vue'
import NeitcomComponent from '@/components/dashboard/content/credit-assessment/NeitcomComponent.vue'
import ValidacionPrevisionComponent from '@/components/dashboard/content/credit-assessment/ValidacionPrevisionComponent.vue'


export const useCreditAssessmentStore = defineStore('creditAssessment', () => {

  const steps = ref<Step[]>(
    [
      { id: MenuId.CARNET_IDENTIDAD , title: MenuTitle.CARNET_IDENTIDAD, icon: 'mdi-card-account-details', component:  markRaw(CarnetIdentidadComponent), documentType: DocumentType.CARNET_IDENTIDAD },
      { id: MenuId.IPS, title: MenuTitle.IPS, icon: 'mdi-hospital-box', component: markRaw(IPSComponent), documentType: DocumentType.IPS },
      { id: MenuId.ACLARACION_DEUDA, title: MenuTitle.ACLARACION_DEUDA, icon: 'mdi-file-check', component: markRaw(AclaracionDeudaComponent), documentType: DocumentType.ACLARACION_DEUDA },
      { id: MenuId.CERTIFICADO_DEUDA, title: MenuTitle.CERTIFICADO_DEUDA, icon: 'mdi-file-document-check', component: markRaw(CertificadoDeudaComponent), documentType: DocumentType.CERTIFICADO_DEUDA },
      { id: MenuId.INFORMES_COMERCIALES, title: MenuTitle.INFORMES_COMERCIALES, icon: 'mdi-chart-box', component: markRaw(InformesComercialesComponent), documentType: DocumentType.INFORMES_COMERCIALES },
      { id: MenuId.LEY_REEMPENDIMIENTO, title: MenuTitle.LEY_REEMPENDIMIENTO, icon: 'mdi-gavel', component: markRaw(LeyReemprendimientoComponent), documentType: DocumentType.LEY_REEMPENDIMIENTO },
      { id: MenuId.REGISTRO_DEUDORES, title:  MenuTitle.REGISTRO_DEUDORES, icon: 'mdi-account-alert', component: markRaw(RegistroDeudoresComponent), documentType: DocumentType.REGISTRO_DEUDORES },
      { id: MenuId.PREEVALUACION_CREDITO, title: MenuTitle.PREEVALUACION_CREDITO, icon: 'mdi-file-document-edit', component: markRaw(PreevaluacionCreditoComponent), documentType: DocumentType.PREEVALUACION_CREDITO },
      { id: MenuId.VIGENCIA_CEDULA, title: MenuTitle.VIGENCIA_CEDULA, icon: 'mdi-card-account-details-outline', component: markRaw(VigenciaCedulaComponent), documentType: DocumentType.VIGENCIA_CEDULA },
      { id: MenuId.NEITCOM, title: MenuTitle.NEITCOM, icon: 'mdi-database-search', component: markRaw(NeitcomComponent), documentType: DocumentType.NEITCOM },
      { id: MenuId.VALIDACION_PREVISION, title: MenuTitle.VALIDACION_PREVISION, icon: 'mdi-shield-check', component: markRaw(ValidacionPrevisionComponent), documentType: DocumentType.VALIDACION_PREVISION }
    ]
  )


  const documents = ref<DocumentMap>({
    [DocumentType.CARNET_IDENTIDAD]: undefined,
    [DocumentType.IPS]: undefined,
    [DocumentType.ACLARACION_DEUDA]: undefined,
    [DocumentType.CERTIFICADO_DEUDA]: undefined,
    [DocumentType.INFORMES_COMERCIALES]: undefined,
    [DocumentType.LEY_REEMPENDIMIENTO]: undefined,
    [DocumentType.REGISTRO_DEUDORES]: undefined,
    [DocumentType.PREEVALUACION_CREDITO]: undefined,
    [DocumentType.VIGENCIA_CEDULA]: undefined,
    [DocumentType.NEITCOM]: undefined,
    [DocumentType.VALIDACION_PREVISION]: undefined
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
  const ips = computed(() => documents.value[DocumentType.IPS])
  const aclaracionDeuda = computed(() => documents.value[DocumentType.ACLARACION_DEUDA])
  const certificadoDeuda = computed(() => documents.value[DocumentType.CERTIFICADO_DEUDA])
  const informesComerciales = computed(() => documents.value[DocumentType.INFORMES_COMERCIALES])
  const leyReemprendimiento = computed(() => documents.value[DocumentType.LEY_REEMPENDIMIENTO])
  const registroDeudores = computed(() => documents.value[DocumentType.REGISTRO_DEUDORES])
  const preevaluacionCredito = computed(() => documents.value[DocumentType.PREEVALUACION_CREDITO])
  const vigenciaCedula = computed(() => documents.value[DocumentType.VIGENCIA_CEDULA])
  const neitcom = computed(() => documents.value[DocumentType.NEITCOM])
  const validacionPrevision = computed(() => documents.value[DocumentType.VALIDACION_PREVISION])


  const hasAnyDocuments = computed(() => {
    return steps.value.some(step => getDocument(step.documentType))
  })

  const missingDocuments = computed(() => {
    return steps.value
      .filter(step => !getDocument(step.documentType))
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


  return {
    // States
    documents,
    steps,

    // Getters
    carnetIdentidad,
    ips,
    aclaracionDeuda,
    certificadoDeuda,
    informesComerciales,
    leyReemprendimiento,
    registroDeudores,
    preevaluacionCredito,
    vigenciaCedula,
    neitcom,
    validacionPrevision,
    hasAnyDocuments,
    missingDocuments,
    availableDocs,

    // Actions
    setDocument,
    getDocument,
    clearAllDocuments
  }
})
