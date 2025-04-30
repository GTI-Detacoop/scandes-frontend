<template>
  <v-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" max-width="500">
    <v-card>
      <v-card-title class="text-h5">
        Documentos Faltantes
      </v-card-title>

      <v-card-text>
        <p class="text-body-1 mb-4">
          Los siguientes documentos no han sido subidos:
        </p>
        <v-list>
          <v-list-item
            v-for="missingDoc in missingDocuments"
            :key="missingDoc.id"
            :title="missingDoc.title"
            :prepend-icon="missingDoc.icon"
          />
        </v-list>
        <p class="text-body-2 mt-4">
          ¿Desea continuar con la descarga de los documentos disponibles?
        </p>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="secondary"
          variant="text"
          @click="$emit('update:modelValue', false)"
        >
          Cancelar
        </v-btn>
        <v-btn
          color="primary"
          @click="$emit('confirm')"
        >
          Descargar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { MenuId } from '@/types/menu'

interface MissingDocument {
  id: MenuId
  title: string
  icon: string
}

defineProps<{
  modelValue: boolean
  missingDocuments: MissingDocument[]
}>()

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
}>()
</script>
