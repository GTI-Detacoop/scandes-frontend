<template>
  <v-app>
    <v-main class="bg-primary">
      <v-container fluid class="fill-height">
        <v-row align="center" justify="center" class="fill-height">
          <v-col cols="12" sm="10" md="8" lg="6" xl="4">
            <v-card
              class="mx-auto pa-6 pa-sm-8 card-animate"
              elevation="8"
              rounded="lg"
              max-width="500"
            >
              <v-card-item>
                <div class="d-flex justify-center mb-4">
                  <img src="@/assets/scandes.svg" alt="Scandes Logo" height="100" />
                </div>

                <v-card-title class="text-h5 text-primary text-center font-weight-bold pb-1">
                  Bienvenido a Scandes
                </v-card-title>

                <v-card-subtitle class="text-center pb-0 mb-6">
                  Sistema integral de gestión financiera
                </v-card-subtitle>
              </v-card-item>

              <v-divider class="mb-6"></v-divider>

              <v-card-text class="pa-2">

                <ActiveDirectoryLoginButton />

                <div class="text-center">
                  <p class="text-caption text-medium-emphasis">
                    © {{ currentYear }} Scandes. Todos los derechos reservados.
                  </p>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ActiveDirectoryLoginButton from '@/components/ActiveDirectoryLoginButton.vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.card-animate {
  background-color: rgba(255, 255, 255, 0.98);
  transition: all 0.3s ease;
}

.card-animate:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2) !important;
}

.btn-animate {
  transition: all 0.2s ease;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.btn-animate:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(4, 60, 92, 0.3) !important;
}
</style>
