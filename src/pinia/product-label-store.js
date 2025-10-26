import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

// Pinia store for product labels
// File: /Users/benjaminkooma/Desktop/apps/iGourd/pos/src/pinia/product-label-store.js

const API_BASE = '/api/product-labels'; // adjust to your backend endpoint

export const useProductLabelStore = defineStore('productLabel', () => {
  // state
  const labels = ref([]);
  const selected = ref(null);
  const loading = ref(false);
  const error = ref(null);

  // getters
  const all = computed(() => labels.value);
  const count = computed(() => labels.value.length);

  // actions
  async function fetchAll() {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      labels.value = await res.json();
      return labels.value;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function fetchById(id) {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch(`${API_BASE}/${encodeURIComponent(id)}`);
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      const data = await res.json();
      // keep selected in sync
      selected.value = data;
      // update local cache
      const idx = labels.value.findIndex((l) => l.id === data.id);
      if (idx >= 0) labels.value[idx] = data;
      else labels.value.push(data);
      return data;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function createLabel(payload) {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Create failed: ${res.status}`);
      const data = await res.json();
      labels.value.push(data);
      return data;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateLabel(id, patch) {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch(`${API_BASE}/${encodeURIComponent(id)}`, {
        method: 'PUT', // or PATCH depending on backend
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error(`Update failed: ${res.status}`);
      const data = await res.json();
      const idx = labels.value.findIndex((l) => l.id === data.id);
      if (idx >= 0) labels.value.splice(idx, 1, data);
      if (selected.value && selected.value.id === data.id) selected.value = data;
      return data;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deleteLabel(id) {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch(`${API_BASE}/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
      labels.value = labels.value.filter((l) => l.id !== id);
      if (selected.value && selected.value.id === id) selected.value = null;
      return true;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function setSelected(label) {
    selected.value = label;
  }

  function clear() {
    labels.value = [];
    selected.value = null;
    loading.value = false;
    error.value = null;
  }

  return {
    // state
    labels,
    selected,
    loading,
    error,
    // getters
    all,
    count,
    // actions
    fetchAll,
    fetchById,
    createLabel,
    updateLabel,
    deleteLabel,
    setSelected,
    clear,
  };
});

export default useProductLabelStore;