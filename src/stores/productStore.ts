import { defineStore } from 'pinia'
import { type Product, type SubProduct } from '@/types/product'
import { ref } from 'vue'
import { products as productsList } from '@/constants/products'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>(productsList)


  const selectedProduct = ref<Product>(products.value[0])
  const selectedSubProduct = ref<SubProduct>(products.value[0].subProducts[0])

  function setSelectedProduct(product: Product) {
    selectedProduct.value = product
    _updateSubProduct()
  }

  function setSelectedSubProduct(subProduct: SubProduct) {
    selectedSubProduct.value = subProduct
  }

  function getSelectedProduct() {
    return selectedProduct.value
  }

  function getSelectedSubProduct() {
    return selectedSubProduct.value
  }

  function getProducts() {
    return products.value
  }

  function getSubProducts() {
    return selectedProduct.value?.subProducts
  }

  function getDocumentsNeeded() {
    return selectedSubProduct.value?.documentsNeeded
  }

  function _updateSubProduct() {
    const potentialSubProduct = selectedProduct.value?.subProducts.find(subProduct => subProduct.name === selectedSubProduct.value?.name)
    if (potentialSubProduct) {
      selectedSubProduct.value = potentialSubProduct
    } else {
      selectedSubProduct.value = selectedProduct.value?.subProducts[0]
    }
  }

  return {
    products,
    selectedProduct,
    selectedSubProduct,

    setSelectedProduct,
    setSelectedSubProduct,
    getSelectedProduct,
    getSelectedSubProduct,
    getProducts,
    getSubProducts,
    getDocumentsNeeded,
  }
})

