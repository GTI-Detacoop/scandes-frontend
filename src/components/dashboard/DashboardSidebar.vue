<template>
  <v-navigation-drawer
    permanent
    :rail="!expanded"
    width="240"
    class="sidebar-custom elevation-1"
    @update:rail="$emit('update:expanded', !$event)"
  >
    <v-list nav>
      <v-list-item
        :prepend-icon="expanded ? 'mdi-chevron-left' : 'mdi-chevron-right'"
        title="Productos"
        @click="expanded = !expanded"
        class="text-white"
      />
    </v-list>

    <v-divider class="my-2 border-opacity-25"></v-divider>

    <v-list nav density="compact">
      <v-list-item
        v-for="item in dashboardStore.mainMenuItems"
        :key="item.id"
        :value="item.id"
        :title="expanded ? item.title : ''"
        :prepend-icon="item.icon"
        :active="dashboardStore.selectedMainItem === item.id"
        @click="dashboardStore.setMainItem(item.id)"
        rounded="lg"
        class="mb-1 mx-2 sidebar-item"
        active-class="sidebar-item-active"
      />
    </v-list>

  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboardStore'

const dashboardStore = useDashboardStore()

const props = defineProps({
  expanded: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:expanded'])

const expanded = computed({
  get: () => props.expanded,
  set: (value) => {
    emit('update:expanded', value)
  }
})
</script>

<style scoped>
.sidebar-custom {
  background-color: #05395f !important;
  color: rgba(255, 255, 255, 0.9) !important;
}

.sidebar-item {
  color: rgba(255, 255, 255, 0.8) !important;
}

.sidebar-item-active {
  background-color: rgba(255, 255, 255, 0.15) !important;
  color: white !important;
}
</style>
