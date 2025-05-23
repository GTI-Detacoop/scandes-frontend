<template>
  <v-row class="product-selector">
    <v-col cols="6">
      <v-select
        v-model="selectedProduct"
        :items="products"
        item-title="name"
        label="Seleccionar Producto"
        return-object
        @update:model-value="handleProductChange"
      />
    </v-col>
    <v-col cols="6">
      <v-select
        v-model="selectedSubProduct"
        :items="subProducts"
        item-title="name"
        label="Seleccionar Sub-Producto"
        return-object
        :disabled="!selectedProduct"
        @update:model-value="handleSubProductChange"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useProductStore } from '@/stores/productStore'
import type { Product, SubProduct } from '@/types/product'

const productStore = useProductStore()
const selectedProduct = ref<Product>(productStore.getSelectedProduct())
const selectedSubProduct = ref<SubProduct>(productStore.getSelectedSubProduct())
const products = productStore.getProducts()

const subProducts = computed(() => {
  if (!selectedProduct.value) return []
  return productStore.getSubProducts()
})

const handleProductChange = () => {
  if (selectedProduct.value) {
    productStore.setSelectedProduct(selectedProduct.value)
    selectedSubProduct.value = productStore.getSelectedSubProduct()
  }
}

const handleSubProductChange = () => {
  if (selectedSubProduct.value) {
    productStore.setSelectedSubProduct(selectedSubProduct.value)
  }
}
</script>

<style scoped>
.product-selector {
  padding-top: 2rem;
  background-color: transparent;
}
</style>
