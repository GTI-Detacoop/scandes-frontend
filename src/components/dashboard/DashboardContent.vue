<template>
  <div class="pa-4">
    <component :is="currentComponent" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboardStore'
import ObtenerIPSComponent from './content/ObtenerIPSComponent.vue'
import HistorialComponent from './content/HistorialComponent.vue'
import OtroProductoComponent from './content/OtroProductoComponent.vue'
import EvaluacionCreditoComponent from './content/EvaluacionCreditoComponent.vue'
import type { Component } from 'vue'

const dashboardStore = useDashboardStore()

const componentMap: Record<string, Component> = {
  'CarnetIdentidadComponent': EvaluacionCreditoComponent,
  'IPSComponent': EvaluacionCreditoComponent,
  'ObtenerIPSComponent': ObtenerIPSComponent,
  'HistorialComponent': HistorialComponent,
  'OtroProductoComponent': OtroProductoComponent,
  'EvaluacionCreditoComponent': EvaluacionCreditoComponent,
  'AclaracionDeudaComponent': EvaluacionCreditoComponent,
  'CertificadoDeudaComponent': EvaluacionCreditoComponent,
  'InformesComercialesComponent': EvaluacionCreditoComponent,
  'VigenciaCedulaComponent': EvaluacionCreditoComponent,
  'PreevaluacionCreditoComponent': EvaluacionCreditoComponent,
  'LeyReemprendimientoComponent': EvaluacionCreditoComponent,
  'RegistroDeudoresComponent': EvaluacionCreditoComponent,
  'NeitcomComponent': EvaluacionCreditoComponent,
  'ValidacionPrevisionComponent': EvaluacionCreditoComponent
}

const currentComponent = computed(() => {
  if (dashboardStore.currentComponent) {
    return componentMap[dashboardStore.currentComponent] || null
  }
  return null
})
</script>
