<template>
  <DashboardContentBase
    title="Verificación o Certificado de Seguimiento Neitcom"
    description="Evaluación de crédito por Verificación o Certificado de Seguimiento Neitcom"
  >
    <v-card-text>
      <p class="text-body-1 mb-6">
        Esta sección permite verificar el certificado de seguimiento Neitcom del cliente.
      </p>

      <v-form @submit.prevent="handleSubmit">
        <v-row>
          <v-col cols="12">
            <div class="text-subtitle-1 mb-2">Documento de Seguimiento Neitcom</div>
            <DropzoneComponent
              :model-value="creditAssessmentStore.neitcom"
              @update:model-value="handleFileUpdate"
              accept=".pdf,.jpg,.jpeg,.png"
              label="Subir documento"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" class="d-flex gap-4">
            <v-btn
              color="primary"
              type="submit"
              :loading="isSubmitting"
              :disabled="!creditAssessmentStore.neitcom"
              class="mr-2"
            >
              Verificar
            </v-btn>
            <DownloadComponent
              :file="creditAssessmentStore.neitcom"
              label="Descargar PDF"
              color="secondary"
              class="ml-2"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </DashboardContentBase>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DashboardContentBase from '../DashboardContentBase.vue'
import DropzoneComponent from '@/components/common/DropzoneComponent.vue'
import DownloadComponent from '@/components/common/DownloadComponent.vue'
import { useCreditAssessmentStore } from '@/stores/creditAssessmentStore'
import { DocumentType } from '@/types/creditAssessment'

const creditAssessmentStore = useCreditAssessmentStore()
const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.info('Documento enviado:', creditAssessmentStore.neitcom)
  } catch (error) {
    console.error('Error al enviar el documento:', error)
  } finally {
    isSubmitting.value = false
  }
}

const handleFileUpdate = (file: File | undefined) => {
  creditAssessmentStore.setDocument(DocumentType.NEITCOM, file)
}
</script>
