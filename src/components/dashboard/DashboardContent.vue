<template>
  <div class="pa-4">
    <component :is="currentComponent" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboardStore'
import CarnetIdentidadComponent from './content/CarnetIdentidadComponent.vue'
import IPSComponent from './content/IPSComponent.vue'
import ObtenerIPSComponent from './content/ObtenerIPSComponent.vue'
import HistorialComponent from './content/HistorialComponent.vue'
import OtroProductoComponent from './content/OtroProductoComponent.vue'
import EvaluacionCreditoComponent from './content/EvaluacionCreditoComponent.vue'
import type { Component } from 'vue'

const dashboardStore = useDashboardStore()

const componentMap: Record<string, Component> = {
  'CarnetIdentidadComponent': CarnetIdentidadComponent,
  'IPSComponent': IPSComponent,
  'ObtenerIPSComponent': ObtenerIPSComponent,
  'HistorialComponent': HistorialComponent,
  'OtroProductoComponent': OtroProductoComponent,
  'EvaluacionCreditoComponent': EvaluacionCreditoComponent
}

const currentComponent = computed(() => {
  if (dashboardStore.currentComponent) {
    return componentMap[dashboardStore.currentComponent] || null
  }
  return null
})
</script>
