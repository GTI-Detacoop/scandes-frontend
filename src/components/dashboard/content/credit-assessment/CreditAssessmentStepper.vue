<template>
  <div class="credit-assessment-stepper">
    <v-row>
      <v-col cols="12" md="6">
        <ProductSelector />
      </v-col>
      <v-col cols="12" md="6" class="d-flex justify-end">
        <DownloadDocumentsButton />
      </v-col>
    </v-row>
    <v-divider />

    <v-card class="stepper-header mb-4">
      <v-row class="pa-2">
        <v-col
          v-for="(step, index) in creditAssessmentStore.steps"
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
        v-for="(step, index) in creditAssessmentStore.steps"
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
        v-if="currentStep < creditAssessmentStore.steps.length"
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
import { useCreditAssessmentStore } from '@/stores/creditAssessmentStore'
import DownloadDocumentsButton from './DownloadDocumentsButton.vue'
import ProductSelector from './ProductSelector.vue'
import { MenuId } from '@/types/menu'

const dashboardStore = useDashboardStore()
const creditAssessmentStore = useCreditAssessmentStore()
const currentStep = ref(1)

const isStepCompleted = (step: number) => {
  const stepData = creditAssessmentStore.steps[step - 1]
  if (!stepData) return false
  return !!creditAssessmentStore.getDocument(stepData.documentType)
}

const getIconColor = (step: number) => {
  if (step === currentStep.value) return 'primary'
  if (isStepCompleted(step)) return 'success'
  return undefined
}

const goToStep = (step: number) => {
  if (step >= 1 && step <= creditAssessmentStore.steps.length) {
    currentStep.value = step
  }
}

const goToPreviousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const goToNextStep = () => {
  if (currentStep.value < creditAssessmentStore.steps.length) {
    currentStep.value++
  }
}

watch(() => dashboardStore.selectedSubItem, (newSubItem) => {
  const stepIndex = creditAssessmentStore.steps.findIndex(step => step.id === newSubItem)
  if (stepIndex !== -1) {
    currentStep.value = stepIndex + 1
  }
})

watch(currentStep, (newStep) => {
  const step = creditAssessmentStore.steps[newStep - 1]
  if (step) {
    dashboardStore.setSubItem(step.id as MenuId)
  }
})

// Reset current step when steps change
watch(() => creditAssessmentStore.steps.length, () => {
  if (currentStep.value > creditAssessmentStore.steps.length) {
    currentStep.value = 1
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
