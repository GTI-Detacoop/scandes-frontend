<template>
  <DashboardContentBase
    title="Evaluación de Crédito"
    description="Panel principal de evaluación de crédito"
  >
    <CreditAssessmentStepper />
  </DashboardContentBase>
</template>

<script setup lang="ts">
import DashboardContentBase from './DashboardContentBase.vue'
import CreditAssessmentStepper from './credit-assessment/CreditAssessmentStepper.vue'
</script>
