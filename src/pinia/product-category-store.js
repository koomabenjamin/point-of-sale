import { defineStore } from 'pinia';

export const useProductCategoryStore = defineStore('productCategoryStore', {
  state: () => ({
    categories: [],
  }),
  actions: {
    addCategory(category) {
      this.categories.push(category);
    },
    removeCategory(categoryId) {
      this.categories = this.categories.filter(category => category.id !== categoryId);
    },
    fetchCategories() {
      // Fetch categories from an API or other source
      // Example: this.categories = await fetch('/api/categories').then(res => res.json());
    },
  },
});