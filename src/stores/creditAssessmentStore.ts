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
import CarnetMedicinaCurativaComponent from '@/components/dashboard/content/credit-assessment/CarnetMedicinaCurativaComponent.vue'
import CertificadoSaldoDeFondaComponent from '@/components/dashboard/content/credit-assessment/CertificadoSaldoDeFondaComponent.vue'
import CertificadoDeNacimientoComponent from '@/components/dashboard/content/credit-assessment/CertificadoDeNacimientoComponent.vue'
import CertificadoDeMatrimonioComponent from '@/components/dashboard/content/credit-assessment/CertificadoDeMatrimonioComponent.vue'


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
      { id: MenuId.VALIDACION_PREVISION, title: MenuTitle.VALIDACION_PREVISION, icon: 'mdi-shield-check', component: markRaw(ValidacionPrevisionComponent), documentType: DocumentType.VALIDACION_PREVISION },
      { id: MenuId.CARNET_MEDICINA_CURATIVA, title: MenuTitle.CARNET_MEDICINA_CURATIVA, icon: 'mdi-medical-bag', component: markRaw(CarnetMedicinaCurativaComponent), documentType: DocumentType.CARNET_MEDICINA_CURATIVA },
      { id: MenuId.CERTIFICADO_SALDO_DE_FONDA, title: MenuTitle.CERTIFICADO_SALDO_DE_FONDA, icon: 'mdi-cash-check', component: markRaw(CertificadoSaldoDeFondaComponent), documentType: DocumentType.CERTIFICADO_SALDO_DE_FONDA },
      { id: MenuId.CERTIFICADO_DE_NACIMIENTO, title: MenuTitle.CERTIFICADO_DE_NACIMIENTO, icon: 'mdi-baby', component: markRaw(CertificadoDeNacimientoComponent), documentType: DocumentType.CERTIFICADO_DE_NACIMIENTO },
      { id: MenuId.CERTIFICADO_DE_MATRIMONIO, title: MenuTitle.CERTIFICADO_DE_MATRIMONIO, icon: 'mdi-ring', component: markRaw(CertificadoDeMatrimonioComponent), documentType: DocumentType.CERTIFICADO_DE_MATRIMONIO }
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
    [DocumentType.VALIDACION_PREVISION]: undefined,
    [DocumentType.CARNET_MEDICINA_CURATIVA]: undefined,
    [DocumentType.CERTIFICADO_SALDO_DE_FONDA]: undefined,
    [DocumentType.CERTIFICADO_DE_NACIMIENTO]: undefined,
    [DocumentType.CERTIFICADO_DE_MATRIMONIO]: undefined
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
  const carnetMedicinaCurativa = computed(() => documents.value[DocumentType.CARNET_MEDICINA_CURATIVA])
  const certificadoSaldoDeFonda = computed(() => documents.value[DocumentType.CERTIFICADO_SALDO_DE_FONDA])
  const certificadoDeNacimiento = computed(() => documents.value[DocumentType.CERTIFICADO_DE_NACIMIENTO])
  const certificadoDeMatrimonio = computed(() => documents.value[DocumentType.CERTIFICADO_DE_MATRIMONIO])


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
    carnetMedicinaCurativa,
    certificadoSaldoDeFonda,
    certificadoDeNacimiento,
    certificadoDeMatrimonio,
    hasAnyDocuments,
    missingDocuments,
    availableDocs,

    // Actions
    setDocument,
    getDocument,
    clearAllDocuments
  }
})
