import { defineStore } from 'pinia'

export const useSKUStore = defineStore('skuStore', {
  state: () => ({
    skus: [
      { id: 1, majorName: 'Product A', specCode: 'product', skuBarCode: '3343', unit: 'kg', costPrice: 'lb', sellingPrice: true, stock: 10, monthlySales: 50, status: true, creator: 'Admin', creationTime: '2024-06-01' },
      { id: 2, majorName: 'Product B', specCode: 'product', skuBarCode: '3343', unit: 'kg', costPrice: 'lb', sellingPrice: true, stock: 5, monthlySales: 30, status: true, creator: 'Admin', creationTime: '2024-06-01' },
      { id: 3, majorName: 'Product C', specCode: 'product', skuBarCode: '3343', unit: 'kg', costPrice: 'lb', sellingPrice: false, stock: 20, monthlySales: 10, status: false, creator: 'Admin', creationTime: '2024-06-01' },
    ],
    selectedSku: null,
    loading: false,
    error: null
  }),

  getters: {
    getSkuById: (state) => (id) => {
      return state.skus.find(sku => sku.id === id)
    },
    totalSkus: (state) => state.skus.length
  },

  actions: {
    async fetchSkus() {
      this.loading = true
      try {
        // Replace with your API call
        const response = await fetch('/api/skus')
        const data = await response.json()
        this.skus = data
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    setSku(sku) {
      this.selectedSku = sku
    },

    addSku(sku) {
      this.skus.push(sku)
    },

    updateSku(updatedSku) {
      const index = this.skus.findIndex(sku => sku.id === updatedSku.id)
      if (index !== -1) {
        this.skus[index] = updatedSku
      }
    },

    deleteSku(skuId) {
      this.skus = this.skus.filter(sku => sku.id !== skuId)
    }
  }
})