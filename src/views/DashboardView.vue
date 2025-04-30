<template>
  <div class="dashboard-container">
    <v-layout class="rounded rounded-md">
      <DashboardNavbar />

      <DashboardSidebar
        v-model:expanded="dashboardStore.sidebarExpanded"
      />

      <v-main class="main-background">
        <v-container fluid class="pa-6">
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
import DashboardNavbar from '@/components/dashboard/DashboardNavbar.vue'
import DashboardContent from '@/components/dashboard/DashboardContent.vue'
import { MenuId } from '@/types/menu'

const dashboardStore = useDashboardStore()

onMounted(() => {
  if (!dashboardStore.currentSubItem) {
    dashboardStore.setMainItem(MenuId.DESCUENTO_PLANILLA)
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
