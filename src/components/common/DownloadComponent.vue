<template>
  <v-btn
    :color="color"
    :loading="isDownloading"
    :disabled="!file"
    @click="handleDownload"
  >
    <v-icon start>mdi-download</v-icon>
    {{ label }}
  </v-btn>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  file: {
    type: File,
    default: undefined
  },
  label: {
    type: String,
    default: 'Descargar'
  },
  color: {
    type: String,
    default: 'primary'
  }
})

const isDownloading = ref(false)

const handleDownload = async () => {
  if (!props.file) return

  isDownloading.value = true
  try {
    // Convertir el archivo a PDF si es una imagen
    if (props.file.type.startsWith('image/')) {
      const image = await createImageBitmap(props.file)
      const canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(image, 0, 0)

      // Convertir canvas a blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob)
        }, 'application/pdf')
      })

      // Crear URL y descargar
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${props.file.name.split('.')[0]}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } else {
      // Si ya es PDF, descargar directamente
      const url = URL.createObjectURL(props.file)
      const a = document.createElement('a')
      a.href = url
      a.download = props.file.name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  } catch (error) {
    console.error('Error al descargar el archivo:', error)
  } finally {
    isDownloading.value = false
  }
}
</script>
