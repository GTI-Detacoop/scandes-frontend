<template>
  <v-card-actions class="download-actions">
    <v-spacer />
    <v-btn
      color="primary"
      @click="showDownloadDialog"
      class="download-btn"
      :disabled="!hasAnyDocuments"
    >
      <v-icon start>mdi-download</v-icon>
      Descargar Set de Credito
    </v-btn>
  </v-card-actions>

  <DownloadDocumentsWarningDialog
    v-model="showWarningDialog"
    :missing-documents="missingDocuments"
    @confirm="downloadDocuments"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCreditAssessmentStore } from '@/stores/creditAssessmentStore'
import { MenuId, MenuTitle } from '@/types/menu'
import { DocumentType } from '@/types/creditAssessment'
import DownloadDocumentsWarningDialog from './DownloadDocumentsWarningDialog.vue'
import { combineFilesIntoPDF, downloadPDF } from '@/utils/pdfUtils'

const creditAssessmentStore = useCreditAssessmentStore()
const showWarningDialog = ref(false)

const steps = [
  { id: MenuId.CARNET_IDENTIDAD, title: MenuTitle.CARNET_IDENTIDAD, icon: 'mdi-card-account-details', documentType: DocumentType.CARNET_IDENTIDAD },
  { id: MenuId.IPS, title: MenuTitle.IPS, icon: 'mdi-hospital-box', documentType: DocumentType.IPS },
  { id: MenuId.ACLARACION_DEUDA, title: MenuTitle.ACLARACION_DEUDA, icon: 'mdi-file-check', documentType: DocumentType.ACLARACION_DEUDA },
  { id: MenuId.CERTIFICADO_DEUDA, title: MenuTitle.CERTIFICADO_DEUDA, icon: 'mdi-file-document-check', documentType: DocumentType.CERTIFICADO_DEUDA },
  { id: MenuId.INFORMES_COMERCIALES, title: MenuTitle.INFORMES_COMERCIALES, icon: 'mdi-chart-box', documentType: DocumentType.INFORMES_COMERCIALES },
  { id: MenuId.LEY_REEMPENDIMIENTO, title: MenuTitle.LEY_REEMPENDIMIENTO, icon: 'mdi-gavel', documentType: DocumentType.LEY_REEMPENDIMIENTO },
  { id: MenuId.REGISTRO_DEUDORES, title: MenuTitle.REGISTRO_DEUDORES, icon: 'mdi-account-alert', documentType: DocumentType.REGISTRO_DEUDORES },
  { id: MenuId.PREEVALUACION_CREDITO, title: MenuTitle.PREEVALUACION_CREDITO, icon: 'mdi-file-document-edit', documentType: DocumentType.PREEVALUACION_CREDITO },
  { id: MenuId.VIGENCIA_CEDULA, title: MenuTitle.VIGENCIA_CEDULA, icon: 'mdi-card-account-details-outline', documentType: DocumentType.VIGENCIA_CEDULA },
  { id: MenuId.NEITCOM, title: MenuTitle.NEITCOM, icon: 'mdi-database-search', documentType: DocumentType.NEITCOM },
  { id: MenuId.VALIDACION_PREVISION, title: MenuTitle.VALIDACION_PREVISION, icon: 'mdi-shield-check', documentType: DocumentType.VALIDACION_PREVISION }
]

// Computed properties para la funcionalidad de descarga
const hasAnyDocuments = computed(() => {
  return steps.some(step => creditAssessmentStore.getDocument(step.documentType))
})

const missingDocuments = computed(() => {
  return steps
    .filter(step => !creditAssessmentStore.getDocument(step.documentType))
    .map(step => ({
      id: step.id,
      title: step.title,
      icon: step.icon
    }))
})

// Funciones para la descarga de documentos
const showDownloadDialog = () => {
  if (missingDocuments.value.length > 0) {
    showWarningDialog.value = true
  } else {
    downloadDocuments()
  }
}

const downloadDocuments = async () => {
  showWarningDialog.value = false

  try {
    // Obtener los documentos disponibles
    const availableDocs = steps
      .filter(step => {
        const document = creditAssessmentStore.getDocument(step.documentType)
        return document !== undefined && document !== null
      })
      .map(step => ({
        title: step.title,
        file: creditAssessmentStore.getDocument(step.documentType) as File
      }))

    if (availableDocs.length === 0) {
      throw new Error('No hay documentos disponibles para descargar')
    }

    // Combinar los documentos en un solo PDF
    const combinedPDF = await combineFilesIntoPDF(availableDocs)

    // Descargar el PDF combinado
    downloadPDF(combinedPDF, 'documentos-evaluacion-credito.pdf')
  } catch (error) {
    console.error('Error al descargar los documentos:', error)
    // TODO: Mostrar un mensaje de error al usuario
  }
}
</script>

<style scoped>
.download-actions {
  padding: 1rem;
  background-color: transparent;
  border-bottom: 1px solid rgba(var(--v-border-color), 0.12);
}

.download-btn {
  text-transform: none;
  letter-spacing: normal;
  font-weight: 500;
}
</style>
