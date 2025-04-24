<template>
  <v-app-bar flat height="64" class="elevation-2" color="dark">
      <v-app-bar-title>
        <router-link to="/dashboard" class="text-decoration-none">
          <img src="@/assets/scandes_white.svg" alt="Scandes Logo" height="40" />
        </router-link>
      </v-app-bar-title>


      <template v-slot:append>
        <v-menu transition="slide-y-transition" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn variant="text" v-bind="props" class="text-white">
              <div class="d-flex align-center">
                <v-avatar color="primary-lighten-1" size="32" class="me-2 elevation-2">
                  <span class="text-white font-weight-medium">{{ authStore.userInitials }}</span>
                </v-avatar>
                <span class="text-body-2 me-2 d-none d-sm-flex">{{ authStore.userName }}</span>
                <v-icon size="small">mdi-chevron-down</v-icon>
              </div>
            </v-btn>
          </template>

          <v-card min-width="200" elevation="4" rounded="lg" class="mt-1">
            <v-list nav>
              <v-list-item
                prepend-icon="mdi-logout"
                title="Cerrar sesión"
                @click="logout"
                class="text-medium-emphasis"
              />
            </v-list>
          </v-card>
        </v-menu>
      </template>

  </v-app-bar>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const logout = async () => {
  try {
    await authStore.logoutRedirect()
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
}
</script>

<style scoped>
</style>
