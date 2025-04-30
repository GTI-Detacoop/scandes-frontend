<template>
  <div class="credit-assessment-stepper">
    <!-- Stepper Header con múltiples líneas -->
    <v-card class="stepper-header mb-4">
      <v-row class="pa-2">
        <v-col
          v-for="(step, index) in steps"
          :key="step.id"
          cols="12"
          sm="6"
          md="3"
          class="pa-1"
        >
          <v-card
            class="stepper-item"
            :class="{
              'active-step': currentStep === index + 1,
              'completed-step': isStepCompleted(index + 1)
            }"
            @click="goToStep(index + 1)"
            variant="outlined"
          >
            <v-card-item class="pa-2">
              <div class="d-flex align-center">
                <v-icon
                  :icon="step.icon"
                  :color="getIconColor(index + 1)"
                  size="small"
                  class="mr-2"
                />
                <v-card-title class="text-subtitle-2 pa-0">
                  {{ step.title }}
                </v-card-title>
              </div>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <!-- Contenido del stepper -->
    <v-window v-model="currentStep" class="stepper-window">
      <v-window-item
        v-for="(step, index) in steps"
        :key="step.id"
        :value="index + 1"
      >
        <v-card class="step-content" elevation="2">
          <component :is="step.component" />
        </v-card>
      </v-window-item>
    </v-window>

    <!-- Botones de navegación -->
    <v-card-actions class="navigation-actions">
      <v-btn
        v-if="currentStep > 1"
        variant="text"
        @click="goToPreviousStep"
        class="navigation-btn"
      >
        <v-icon start>mdi-arrow-left</v-icon>
        Anterior
      </v-btn>
      <v-spacer v-else />

      <v-btn
        v-if="currentStep < steps.length"
        color="primary"
        @click="goToNextStep"
        class="navigation-btn"
      >
        Siguiente
        <v-icon end>mdi-arrow-right</v-icon>
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDashboardStore } from '@/stores/dashboardStore'
import CarnetIdentidadComponent from './CarnetIdentidadComponent.vue'
import IPSComponent from './IPSComponent.vue'
import AclaracionDeudaComponent from './AclaracionDeudaComponent.vue'
import CertificadoDeudaComponent from './CertificadoDeudaComponent.vue'
import InformesComercialesComponent from './InformesComercialesComponent.vue'
import VigenciaCedulaComponent from './VigenciaCedulaComponent.vue'
import PreevaluacionCreditoComponent from './PreevaluacionCreditoComponent.vue'
import LeyReemprendimientoComponent from './LeyReemprendimientoComponent.vue'
import RegistroDeudoresComponent from './RegistroDeudoresComponent.vue'
import ValidacionPrevisionComponent from './ValidacionPrevisionComponent.vue'
import NeitcomComponent from './NeitcomComponent.vue'
import type { MenuId } from '@/types/menu'

const dashboardStore = useDashboardStore()
const currentStep = ref(1)

// Definir los pasos del stepper
const steps = [
  { id: 'evaluacion-credito-id', title: 'Carnet de Identidad', icon: 'mdi-card-account-details', component: CarnetIdentidadComponent },
  { id: 'evaluacion-credito-ips', title: 'IPS', icon: 'mdi-hospital-box', component: IPSComponent },
  { id: 'aclaracion-deuda', title: 'Aclaración de Deuda', icon: 'mdi-file-check', component: AclaracionDeudaComponent },
  { id: 'certificado-deuda', title: 'Certificado de Deuda', icon: 'mdi-file-document-check', component: CertificadoDeudaComponent },
  { id: 'informes-comerciales', title: 'Informes Comerciales', icon: 'mdi-chart-box', component: InformesComercialesComponent },
  { id: 'ley-reemprendimiento', title: 'Ley Reemprendimiento', icon: 'mdi-gavel', component: LeyReemprendimientoComponent },
  { id: 'registro-deudores', title: 'Registro de Deudores', icon: 'mdi-account-alert', component: RegistroDeudoresComponent },
  { id: 'preevaluacion-credito', title: 'Pre-evaluación', icon: 'mdi-file-document-edit', component: PreevaluacionCreditoComponent },
  { id: 'vigencia-cedula', title: 'Vigencia Cédula', icon: 'mdi-card-account-details-outline', component: VigenciaCedulaComponent },
  { id: 'neitcom', title: 'NEITCOM', icon: 'mdi-database-search', component: NeitcomComponent },
  { id: 'validacion-prevision', title: 'Validación Previsión', icon: 'mdi-shield-check', component: ValidacionPrevisionComponent }
]

// Función para verificar si un paso está completado
const isStepCompleted = (step: number) => {
  return step < currentStep.value
}

// Función para obtener el color del icono
const getIconColor = (step: number) => {
  if (step === currentStep.value) return 'primary'
  if (step < currentStep.value) return 'success'
  return undefined
}

// Función para ir a un paso específico
const goToStep = (step: number) => {
  if (step >= 1 && step <= steps.length) {
    currentStep.value = step
  }
}

// Función para ir al paso anterior
const goToPreviousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

// Función para ir al siguiente paso
const goToNextStep = () => {
  if (currentStep.value < steps.length) {
    currentStep.value++
  }
}

// Sincronizar con la selección del subitem
watch(() => dashboardStore.selectedSubItem, (newSubItem) => {
  const stepIndex = steps.findIndex(step => step.id === newSubItem)
  if (stepIndex !== -1) {
    currentStep.value = stepIndex + 1
  }
})

// Actualizar el subitem seleccionado cuando cambia el paso
watch(currentStep, (newStep) => {
  const step = steps[newStep - 1]
  if (step) {
    dashboardStore.setSubItem(step.id as MenuId)
  }
})
</script>

<style scoped>
.credit-assessment-stepper {
  background-color: transparent;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stepper-header {
  background-color: transparent !important;
  box-shadow: none !important;
}

.stepper-item {
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  height: 100%;
  border: 1px solid rgba(var(--v-border-color), 0.12);
}

.stepper-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.1);
}

.active-step {
  background-color: rgba(var(--v-theme-primary), 0.1);
  border-left: 4px solid rgb(var(--v-theme-primary));
}

.completed-step {
  background-color: rgba(var(--v-theme-success), 0.1);
  border-left: 4px solid rgb(var(--v-theme-success));
}

.stepper-window {
  background-color: transparent !important;
  box-shadow: none !important;
}

.step-content {
  border-radius: 8px;
  overflow: hidden;
}

.navigation-actions {
  padding: 1rem;
  background-color: transparent;
}

.navigation-btn {
  text-transform: none;
  letter-spacing: normal;
  font-weight: 500;
}
</style>
