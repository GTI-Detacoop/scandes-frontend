<template>
  <DashboardContentBase
    title="Carnet de Identidad"
    description="Evaluación de crédito por Carnet de Identidad"
  >
    <v-card-text>
      <p class="text-body-1 mb-6">
        Esta sección permite verificar datos del cliente mediante su carnet de identidad.
      </p>

      <v-form @submit.prevent="handleSubmit">
        <v-row>
          <v-col cols="12">
            <div class="text-subtitle-1 mb-2">Documento de Identidad</div>
            <DropzoneComponent
              v-model="carnetStore.document"
              class="mb-4"
              @update:model-value="carnetStore.setDocument"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" class="d-flex gap-4">
            <v-btn
              color="primary"
              type="submit"
              :loading="isSubmitting"
              :disabled="!carnetStore.document"
              class="mr-2"
            >
              Verificar
            </v-btn>
            <DownloadComponent
              :file="carnetStore.document"
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
import DashboardContentBase from './DashboardContentBase.vue'
import DropzoneComponent from '@/components/common/DropzoneComponent.vue'
import DownloadComponent from '@/components/common/DownloadComponent.vue'
import { useCarnetStore } from '@/stores/carnetStore'

const carnetStore = useCarnetStore()
const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  try {
    // Aquí iría la lógica para enviar los datos al backend
    console.log('Datos a enviar:', {
      document: carnetStore.document
    })
    // Simulamos una petición
    await new Promise(resolve => setTimeout(resolve, 1000))
  } finally {
    isSubmitting.value = false
  }
}
</script>
