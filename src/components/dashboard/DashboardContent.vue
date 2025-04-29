<template>
  <div class="pa-4">
    <component :is="currentComponent" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboardStore'
import CarnetIdentidadComponent from './content/credit-assessment/CarnetIdentidadComponent.vue'
import IPSComponent from './content/credit-assessment/IPSComponent.vue'
import ObtenerIPSComponent from './content/ObtenerIPSComponent.vue'
import HistorialComponent from './content/HistorialComponent.vue'
import OtroProductoComponent from './content/OtroProductoComponent.vue'
import EvaluacionCreditoComponent from './content/EvaluacionCreditoComponent.vue'
import type { Component } from 'vue'
import AclaracionDeudaComponent from './content/credit-assessment/AclaracionDeudaComponent.vue'
import InformesComercialesComponent from './content/credit-assessment/InformesComercialesComponent.vue'
import VigenciaCedulaComponent from './content/credit-assessment/VigenciaCedulaComponent.vue'
import PreevaluacionCreditoComponent from './content/credit-assessment/PreevaluacionCreditoComponent.vue'
import LeyReemprendimientoComponent from './content/credit-assessment/LeyReemprendimientoComponent.vue'
import RegistroDeudoresComponent from './content/credit-assessment/RegistroDeudoresComponent.vue'
import ValidacionPrevisionComponent from './content/credit-assessment/ValidacionPrevisionComponent.vue'
import CertificadoDeudaComponent from './content/credit-assessment/CertificadoDeudaComponent.vue'
import NeitcomComponent from './content/credit-assessment/NeitcomComponent.vue'

const dashboardStore = useDashboardStore()

const componentMap: Record<string, Component> = {
  'CarnetIdentidadComponent': CarnetIdentidadComponent,
  'IPSComponent': IPSComponent,
  'ObtenerIPSComponent': ObtenerIPSComponent,
  'HistorialComponent': HistorialComponent,
  'OtroProductoComponent': OtroProductoComponent,
  'EvaluacionCreditoComponent': EvaluacionCreditoComponent,
  'AclaracionDeudaComponent': AclaracionDeudaComponent,
  'CertificadoDeudaComponent': CertificadoDeudaComponent,
  'InformesComercialesComponent': InformesComercialesComponent,
  'VigenciaCedulaComponent': VigenciaCedulaComponent,
  'PreevaluacionCreditoComponent': PreevaluacionCreditoComponent,
  'LeyReemprendimientoComponent': LeyReemprendimientoComponent,
  'RegistroDeudoresComponent': RegistroDeudoresComponent,
  'NeitcomComponent': NeitcomComponent,
  'ValidacionPrevisionComponent': ValidacionPrevisionComponent
}

const currentComponent = computed(() => {
  if (dashboardStore.currentComponent) {
    return componentMap[dashboardStore.currentComponent] || null
  }
  return null
})
</script>
