<template>
  <v-card
    class="dropzone"
    :class="{ 'dropzone-active': isDragging }"
    @dragover.prevent="handleDragOver"
    @dragleave.prevent="handleDragLeave"
    @drop.prevent="handleDrop"
    @click="triggerFileInput"
  >
    <input
      ref="fileInput"
      type="file"
      accept=".jpg,.jpeg,.png,.pdf"
      class="d-none"
      @change="handleFileSelect"
    />

    <v-card-text class="text-center pa-6">
      <v-icon
        :icon="isDragging ? 'mdi-cloud-upload' : 'mdi-cloud-upload-outline'"
        size="64"
        :color="isDragging ? 'primary' : 'grey'"
      />

      <div class="text-h6 mt-4">
        {{ isDragging ? 'Suelta el archivo aquí' : 'Arrastra y suelta o haz clic para seleccionar' }}
      </div>

      <div class="text-body-2 mt-2 text-medium-emphasis">
        Formatos soportados: JPG, PNG, PDF
      </div>

      <v-alert
        v-if="error"
        type="error"
        class="mt-4"
        closable
        @click:close="error = ''"
      >
        {{ error }}
      </v-alert>

      <v-chip
        v-if="selectedFile"
        class="mt-4"
        color="primary"
        closable
        @click:close="clearFile"
      >
        {{ selectedFile.name }}
      </v-chip>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: File,
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const error = ref('')
const selectedFile = ref<File | null>(props.modelValue)

const validFileTypes = ['image/jpeg', 'image/png', 'application/pdf']
const maxFileSize = 5 * 1024 * 1024 // 5MB

const validateFile = (file: File): boolean => {
  if (!validFileTypes.includes(file.type)) {
    error.value = 'Tipo de archivo no soportado. Solo se permiten JPG, PNG y PDF.'
    return false
  }

  if (file.size > maxFileSize) {
    error.value = 'El archivo es demasiado grande. Tamaño máximo: 5MB'
    return false
  }

  return true
}

const handleDragOver = () => {
  isDragging.value = true
}

const handleDragLeave = () => {
  isDragging.value = false
}

const handleDrop = (event: DragEvent) => {
  isDragging.value = false
  const files = event.dataTransfer?.files

  if (files && files.length > 0) {
    const file = files[0]
    if (validateFile(file)) {
      selectedFile.value = file
      emit('update:modelValue', file)
      error.value = ''
    }
  }
}

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  const files = input.files

  if (files && files.length > 0) {
    const file = files[0]
    if (validateFile(file)) {
      selectedFile.value = file
      emit('update:modelValue', file)
      error.value = ''
    }
  }
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const clearFile = () => {
  selectedFile.value = null
  emit('update:modelValue', null)
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>

<style scoped>
.dropzone {
  border: 2px dashed rgba(var(--v-border-color), var(--v-border-opacity));
  transition: all 0.3s ease;
  cursor: pointer;
}

.dropzone-active {
  border-color: rgb(var(--v-theme-primary));
  background-color: rgba(var(--v-theme-primary), 0.05);
}
</style>
