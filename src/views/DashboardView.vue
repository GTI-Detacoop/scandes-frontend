<template>
  <div class="dashboard-container">
    <v-layout class="rounded rounded-md">
      <DashboardNavbar />

      <DashboardSidebar
        v-model:expanded="dashboardStore.sidebarExpanded"
      />

      <DashboardSubSidebar
        :visible="dashboardStore.sidebarExpanded"
      />

      <v-main class="main-background">
        <v-container fluid class="pa-6">
          <h1 class="text-h4 mb-4 text-dark">{{ dashboardStore.currentTitle}}</h1>
          <DashboardContent />
        </v-container>
      </v-main>
    </v-layout>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useDashboardStore } from '@/stores/dashboardStore'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar.vue'
import DashboardSubSidebar from '@/components/dashboard/DashboardSubSidebar.vue'
import DashboardNavbar from '@/components/dashboard/DashboardNavbar.vue'
import DashboardContent from '@/components/dashboard/DashboardContent.vue'

const dashboardStore = useDashboardStore()

// Inicializar el dashboard
onMounted(() => {
  // Asegurarse de que haya un item seleccionado al inicio
  if (!dashboardStore.currentSubItem) {
    dashboardStore.setMainItem('descuento-planilla')
  }
})
</script>

<style scoped>
.dashboard-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-background {
  background-color: #f0f2f5 !important;
}

.text-dark {
  color: #333 !important;
}
</style>
