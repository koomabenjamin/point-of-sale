<template>
  <SlideIn 
    title="Add Product" 
    :isModalOpen="isModalOpen" 
    description="Create a new product for the store/warehouse..."
    @close="closeModal()">
    <template #body>
      <!-- <form class="space-y-4"> -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Major Name</label>
            <input type="text" required v-model="formData.majorName" class="w-full border rounded px-3 py-2">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Spec Code</label>
            <!-- <input type="text" required v-model="formData.specCode" class="w-full border rounded px-3 py-2"> -->
             <v-select :options="specGroups" v-model="formData.specCode" label="optionsText"></v-select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">SKU Barcode</label>
            <input type="text" required v-model="formData.skuBarCode" class="w-full border rounded px-3 py-2">
            <button class="" @click.prevent="generatesKU()">Generate SKU</button>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Unit</label>
            <v-select :options="unitGroups" v-model="formData.unit" label="optionsText"></v-select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Cost Price</label>
            <input type="number" required v-model="formData.costPrice" class="w-full border rounded px-3 py-2">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Selling Price</label>
            <input type="number" required v-model="formData.sellingPrice" class="w-full border rounded px-3 py-2">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Stock</label>
            <input type="number" required v-model="formData.stock" class="w-full border rounded px-3 py-2">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Monthly Sales</label>
            <input type="number" required v-model="formData.monthlySales" class="w-full border rounded px-3 py-2">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Status</label>
            <select required v-model="formData.status" class="w-full border rounded px-3 py-2">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Creator</label>
            <input type="text" required v-model="formData.creator" class="w-full border rounded px-3 py-2">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Creation Time</label>
            <input type="datetime-local" required v-model="formData.creationTime" class="w-full border rounded px-3 py-2">
          </div>
        </div>
      <!-- </form> -->
    </template>
    <template #footer>
      <div class="mt-4 flex items-center">
        <Button class="bg-blue-500 text-white px-4 py-2 rounded mr-2" label="Add SKU"></Button>
        <Button class="bg-gray-300 text-black px-4 py-2 rounded" label="Cancel"></Button>
      </div>
    </template>
  </SlideIn>
</template>

<script setup>
import { ref, reactive } from "vue"
import SlideIn from "../shared/modals/SlideIn.vue"
import Button from "../shared/buttons/Button.vue"
import { generateSKUs } from '../../utils/cartesian.js';

const formData = reactive({
  majorName: '',
  specCode: '',
  skuBarCode: '',
  unit: '',
  costPrice: 0,
  sellingPrice: 0,
  stock: 0,
  monthlySales: 0,
  status: 'active',
  creator: '',
  creationTime: ''
});

const props = defineProps({
  isModalOpen: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: 'Add SKU'
  },
  description: {
    type: String,
    default: 'Create a new SKU for the store/warehouse...'
  }
});

const emit = defineEmits(['close'])

const closeModal = () => emit('close');

const specGroups = ref([{ name: 'Color', optionsText: 'Red,Blue', options: ['Red','Blue'] }]);
const unitGroups = ref([{ name: 'Unit', optionsText: 'kg,box', options: ['kg', 'box'] }]);

const generatesKU = () => {
  formData.skuBarCode = generateSKUs(formData.specCode, formData.unit, { price: formData.price, stock: formData.stock, skuPrefix: 'PRD' });
}
</script>

<style scoped></style>