<template>
  <div>
    <h2 class="text-h5 mb-4">{{ title }}</h2>
    <v-card class="pa-4">
      <slot>
        <v-card-text>{{ description }}</v-card-text>
      </slot>
    </v-card>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: 'Contenido del panel de control'
  }
})
</script>
