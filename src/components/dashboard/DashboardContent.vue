<template>
  <div class="pa-4">
    <component :is="dashboardStore.currentComponent" />
  </div>
</template>

<script setup lang="ts">
import { useDashboardStore } from '@/stores/dashboardStore'

const dashboardStore = useDashboardStore()

</script>
