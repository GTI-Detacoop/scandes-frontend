import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { DocumentType, type DocumentMap } from '@/types/creditAssessment'

export const useCreditAssessmentStore = defineStore('creditAssessment', () => {
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

  return {
    // States
    documents,

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

    // Actions
    setDocument,
    getDocument,
    clearAllDocuments
  }
})
