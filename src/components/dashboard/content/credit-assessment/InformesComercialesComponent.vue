<template>
  <DashboardContentBase
    title="Informes Comerciales"
    description="Evaluación de crédito por Informes Comerciales"
  >
    <v-card-text>
      <p class="text-body-1 mb-6">
        Esta sección permite verificar los informes comerciales del cliente.
      </p>

      <v-form @submit.prevent="handleSubmit">
        <v-row>
          <v-col cols="12">
            <div class="text-subtitle-1 mb-2">Documento de Informes Comerciales</div>
            <DropzoneComponent
              :model-value="creditAssessmentStore.informesComerciales"
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
              :disabled="!creditAssessmentStore.informesComerciales"
              class="mr-2"
            >
              Verificar
            </v-btn>
            <DownloadComponent
              :file="creditAssessmentStore.informesComerciales"
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
import { useCreditAssessmentStore } from '@/stores/creditAssessmentStore'
import DropzoneComponent from '@/components/common/DropzoneComponent.vue'
import DownloadComponent from '@/components/common/DownloadComponent.vue'
import { DocumentType } from '@/types/creditAssessment'

const creditAssessmentStore = useCreditAssessmentStore()
const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  try {
    // Simular una petición al backend
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Documento enviado:', creditAssessmentStore.informesComerciales)
  } catch (error) {
    console.error('Error al enviar el documento:', error)
  } finally {
    isSubmitting.value = false
  }
}

const handleFileUpdate = (file: File | undefined) => {
  creditAssessmentStore.setDocument(DocumentType.INFORMES_COMERCIALES, file)
}
</script>
