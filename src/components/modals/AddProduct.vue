<template>
  <SlideIn title="Add Product" :isModalOpen="false" description="Create a new product for the store/warehouse...">
    <template #header>
      <h2 class="text-lg font-medium">Add New Product</h2>
    </template>
    <template #body>
      <form>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1" for="productName">Product Name</label>
          <input id="productName" type="text" class="w-full border rounded px-3 py-2" />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1" for="productPrice">Price</label>
          <input id="productPrice" type="number" class="w-full border rounded px-3 py-2" />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1" for="productDescription">Description</label>
          <textarea id="productDescription" class="w-full border rounded px-3 py-2"></textarea>
        </div>
      </form>
    </template>
    <template #footer>
      <button class="bg-blue-500 text-white px-4 py-2 rounded mr-2">Add Product</button>
      <button class="bg-gray-300 text-black px-4 py-2 rounded">Cancel</button>
    </template>
  </SlideIn>
</template>

<script setup>
import SlideIn from "../shared/modals/SlideIn.vue"
</script>

<style scoped></style>