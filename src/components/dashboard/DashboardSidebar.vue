<template>
  <v-navigation-drawer
    permanent
    :rail="!expanded"
    width="260"
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
      <template v-for="item in dashboardStore.mainMenuItems" :key="item.id">
        <v-list-group
          v-if="item.subItems.length > 0"
          :value="expanded ? item.id : null"
          class="mb-1 mx-2 sidebar-item"
          active-class="sidebar-item-active"
        >
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :title="expanded ? item.title : ''"
              :prepend-icon="item.icon"
              :active="dashboardStore.selectedMainItem === item.id"
              class="sidebar-item"
              active-class="sidebar-item-active"
            />
          </template>

          <v-list-item
            v-for="subItem in item.subItems"
            :key="subItem.id"
            :title="subItem.title"
            :prepend-icon="subItem.icon"
            :value="subItem.id"
            :active="dashboardStore.selectedSubItem === subItem.id"
            @click="setSubItemWithParent(subItem.id, item.id)"
            class="sidebar-sub-item"
            active-class="sidebar-item-active"
          />
        </v-list-group>

        <v-list-item
          v-else
          :value="item.id"
          :title="expanded ? item.title : ''"
          :prepend-icon="item.icon"
          :active="dashboardStore.selectedMainItem === item.id"
          @click="dashboardStore.setMainItem(item.id)"
          rounded="lg"
          class="mb-1 mx-2 sidebar-item"
          active-class="sidebar-item-active"
        />
      </template>
    </v-list>

  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboardStore'
import type { MenuId } from '@/types/menu'

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

function setSubItemWithParent(subItemId: MenuId, parentId: MenuId) {
  dashboardStore.setMainItem(parentId)
  dashboardStore.setSubItem(subItemId)
}
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

:deep(.v-list-group__items) {
  padding-left: 1px !important;
}

:deep(.v-list-item__prepend) {
  margin-right: 4px !important;
}

:deep(.v-list-item) {
  padding-inline-start: 4px !important;
}

:deep(.sidebar-sub-item) {
  padding-inline-start: 16px !important;
}
</style>
