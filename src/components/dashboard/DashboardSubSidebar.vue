<template>
  <v-navigation-drawer
    permanent
    :rail="!expanded"
    rail-width="0"
    class="sub-sidebar-custom elevation-1"
  >
    <v-list nav v-show="expanded">
      <v-list-subheader class="text-uppercase text-white">
        {{ dashboardStore.currentMainItem?.title || '' }}
      </v-list-subheader>

      <v-divider class="mb-2 border-opacity-25"></v-divider>

      <template v-for="subItem in dashboardStore.currentSubItems" :key="subItem.id">
        <!-- Item de grupo con subítems anidados -->
        <v-list-group v-if="subItem.isGroup && subItem.nested" :value="subItem.id" class="group-no-padding">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :value="subItem.id"
              :title="subItem.title"
              :prepend-icon="subItem.icon"
              :active="isSubItemActive(subItem.id)"
              @click="dashboardStore.setSubItem(subItem.id)"
              rounded="lg"
              class="mb-1 mx-2 sub-sidebar-item"
              active-class="sub-sidebar-item-active"
            />
          </template>

          <v-list-item
            v-for="nestedItem in subItem.nested"
            :key="nestedItem.id"
            :prepend-icon="nestedItem.icon"
            :title="nestedItem.title"
            :value="nestedItem.id"
            @click="dashboardStore.setSubItem(nestedItem.id)"
            link
            class="ms-2 sub-sidebar-item nested-item"
            :active="dashboardStore.selectedSubItem === nestedItem.id"
            active-class="sub-sidebar-item-active"
          />
        </v-list-group>

        <!-- Item normal -->
        <v-list-item
          v-else
          :value="subItem.id"
          :title="subItem.title"
          :prepend-icon="subItem.icon"
          rounded="lg"
          class="mb-1 mx-2 sub-sidebar-item"
          active-class="sub-sidebar-item-active"
          :active="dashboardStore.selectedSubItem === subItem.id"
          @click="dashboardStore.setSubItem(subItem.id)"
        />
      </template>
    </v-list>

  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboardStore'

const dashboardStore = useDashboardStore()

const props = defineProps({
  visible: {
    type: Boolean,
    default: true
  }
})

// Controlar la expansión
const expanded = computed(() => props.visible)

// Para determinar si un subítem de grupo está activo
const isSubItemActive = (subItemId: string) => {
  // Si el item seleccionado es uno de los ítems anidados, el grupo debe mostrarse como activo
  const parent = dashboardStore.getParentGroup
  if (parent && parent.id === subItemId) {
    return true
  }
  return dashboardStore.selectedSubItem === subItemId
}
</script>

<style scoped>
.sub-sidebar-custom {
  background-color: #064570 !important;
  color: rgba(255, 255, 255, 0.9) !important;
}

.sub-sidebar-item {
  color: rgba(255, 255, 255, 0.8) !important;
}

.sub-sidebar-item-active {
  background-color: rgba(255, 255, 255, 0.15) !important;
  color: white !important;
}

.group-no-padding :deep(.v-list-group__items) {
  padding-left: 8px !important;
}

.nested-item {
  position: relative;
  padding-left: 12px !important;
}

</style>
