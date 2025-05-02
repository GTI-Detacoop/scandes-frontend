<template>
  <v-card-actions class="download-actions">
    <v-spacer />
    <v-btn
      color="primary"
      @click="showDownloadDialog"
      class="download-btn"
      :disabled="!creditAssessmentStore.hasAnyDocuments"
    >
      <v-icon start>mdi-download</v-icon>
      Descargar Set de Credito
    </v-btn>
  </v-card-actions>

  <DownloadDocumentsWarningDialog
    v-model="showWarningDialog"
    :missing-documents="creditAssessmentStore.missingDocuments"
    @confirm="downloadDocuments"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCreditAssessmentStore } from '@/stores/creditAssessmentStore'
import DownloadDocumentsWarningDialog from './DownloadDocumentsWarningDialog.vue'
import { combineFilesIntoPDF, downloadPDF } from '@/utils/pdfUtils'

const creditAssessmentStore = useCreditAssessmentStore()
const showWarningDialog = ref(false)

const availableDocs = creditAssessmentStore.availableDocs


const showDownloadDialog = () => {
  if (creditAssessmentStore.missingDocuments.length > 0) {
    showWarningDialog.value = true
  } else {
    downloadDocuments()
  }
}

const downloadDocuments = async () => {
  showWarningDialog.value = false

  try {

    if (availableDocs.length === 0) {
      throw new Error('No hay documentos disponibles para descargar')
    }

    const combinedPDF = await combineFilesIntoPDF(availableDocs)

    downloadPDF(combinedPDF, 'documentos-evaluacion-credito.pdf')
  } catch (error) {
    console.error('Error al descargar los documentos:', error)
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
