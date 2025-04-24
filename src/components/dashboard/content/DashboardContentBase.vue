<template>
  <div>
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
