import { defineStore } from 'pinia'

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [
      { id: 1, majorName: 'Product A', minorName: 'product', productCode: '3343', minorUnitOfMeasure: 'kg', majorUnitOfMeasure: 'lb', status: true, quantity: 10, productCategory: 'Category 1', produceLabel: 'Label A', creator: 'Admin', creationTime: '2024-06-01' },
      { id: 2, majorName: 'Product B', minorName: 'product', productCode: '3343', minorUnitOfMeasure: 'kg', majorUnitOfMeasure: 'lb', status: true, quantity: 5, productCategory: 'Category 2', produceLabel: 'Label B', creator: 'Admin', creationTime: '2024-06-01' },
      { id: 3, majorName: 'Product C', minorName: 'product', productCode: '3343', minorUnitOfMeasure: 'kg', majorUnitOfMeasure: 'lb', status: false, quantity: 20, productCategory: 'Category 1', produceLabel: 'Label C', creator: 'Admin', creationTime: '2024-06-01' },
    ],        // array of product objects
    loading: false,
    error: null,
  }),

  getters: {
    productCount: (state) => state.items.length,
    byId: (state) => (id) => state.items.find(p => p.id === id) || null,
    available: (state) => state.items.filter(p => (p.stock ?? 0) > 0),
  },

  actions: {
    setLoading(value) {
      this.loading = value
    },

    clearError() {
      this.error = null
    },

    async fetchProducts(endpoint = '/api/products') {
      this.setLoading(true)
      this.clearError()
      try {
        const res = await fetch(endpoint)
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
        const data = await res.json()
        this.items = Array.isArray(data) ? data : []
        return this.items
      } catch (err) {
        this.error = err?.message || String(err)
        throw err
      } finally {
        this.setLoading(false)
      }
    },

    addProduct(product) {
      // expects product to already contain an id (or generate one before)
      this.items.push(product)
    },

    updateProduct(id, patch) {
      const i = this.items.findIndex(p => p.id === id)
      if (i === -1) return null
      this.items[i] = { ...this.items[i], ...patch }
      return this.items[i]
    },

    removeProduct(id) {
      this.items = this.items.filter(p => p.id !== id)
    },

    // Persist to backend (POST for create, PUT for update). Returns saved product.
    async saveProduct(product, endpoint = '/api/products') {
      this.setLoading(true)
      this.clearError()
      try {
        const isUpdate = !!product.id
        const url = isUpdate ? `${endpoint}/${product.id}` : endpoint
        const res = await fetch(url, {
          method: isUpdate ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product),
        })
        if (!res.ok) throw new Error(`Save failed: ${res.status}`)
        const saved = await res.json()
        if (isUpdate) {
          this.updateProduct(saved.id ?? product.id, saved)
        } else {
          this.addProduct(saved)
        }
        return saved
      } catch (err) {
        this.error = err?.message || String(err)
        throw err
      } finally {
        this.setLoading(false)
      }
    },
  },
})