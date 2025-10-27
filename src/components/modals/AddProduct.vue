<template>
  <SlideIn 
    title="Add Product" 
    :isModalOpen="isModalOpen" 
    description="Create a new product for the store/warehouse..." @close="closeModal()">
    <template #body>
      <form @submit.prevent="actionToPerform()" class="space-y-4">
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1" for="majorName">Major Name</label>
              <input id="majorName" name="majorName" required v-model="form.majorName" type="text" class="w-full border rounded px-3 py-2" />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1" for="minorName">Minor Name</label>
              <input id="minorName" name="minorName" required v-model="form.minorName" type="text" class="w-full border rounded px-3 py-2" />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1" for="productCode">Product Code</label>
              <input id="productCode" name="productCode" required v-model="form.productCode" type="text" class="w-full border rounded px-3 py-2" />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1" for="productCategory">Product Category</label>
              <select id="productCategory" name="productCategory" required v-model="form.productCategory" class="w-full border rounded px-3 py-2">
                <option value="">Select category</option>
                <option>Food</option>
                <option>Beverage</option>
                <option>Electronics</option>
                <option>Household</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1" for="majorUnitOfMeasure">Major Unit of Measure</label>
              <input id="majorUnitOfMeasure" name="majorUnitOfMeasure" required v-model="form.majorUnitOfMeasure" type="text" class="w-full border rounded px-3 py-2" />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1" for="minorUnitOfMeasure">Minor Unit of Measure</label>
              <input id="minorUnitOfMeasure" name="minorUnitOfMeasure" required v-model="form.minorUnitOfMeasure" type="text" class="w-full border rounded px-3 py-2" />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1" for="quantity">Quantity</label>
              <input id="quantity" name="quantity" v-model.number="form.quantity" type="number" min="0" step="1" class="w-full border rounded px-3 py-2" />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1" for="status">Status</label>
              <select id="status" name="status" required v-model="form.status" class="w-full border rounded px-3 py-2">
                <option value="">Select status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1" for="produceLabel">Produce Label</label>
              <input id="produceLabel" name="produceLabel" required v-model="form.produceLabel" type="text" class="w-full border rounded px-3 py-2" placeholder="Label to print on produce" />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1" for="creator">Creator</label>
              <input id="creator" name="creator" required v-model="form.creator" type="text" class="w-full border rounded px-3 py-2" />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium mb-1" for="creationTime">Creation Time</label>
              <input id="creationTime" name="creationTime" required v-model="form.creationTime" type="datetime-local" class="w-full border rounded px-3 py-2" />
            </div>
          </div>
          <input type="hidden" name="meta" :value="JSON.stringify({ createdBy: form.creator, createdAt: form.creationTime })" />
        </div>
        <div class="mt-4 flex items-center">
          <Button v-if="action === 'add'" icon="" class="bg-blue-500 text-white px-4 py-2 rounded mr-2" label="Add Product"></Button>
          <Button v-if="action === 'edit'" icon="" class="bg-yellow-500 text-white px-4 py-2 rounded mr-2" label="Update Product"></Button>
          <Button icon="" class="bg-gray-300 text-black px-4 py-2 rounded" label="Cancel"></Button>
        </div>
      </form>
    </template>
  </SlideIn>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { useProductStore } from '../../pinia/product-store'
import SlideIn from "../shared/modals/SlideIn.vue"
import Button from "../shared/buttons/Button.vue"

const props = defineProps({
  action: {
    type: String,
    default: 'add' // or 'edit'
  },
  productToEdit: {
    type: Object,
    default: null,
    required: false
  },
  isModalOpen: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: 'Add Product'
  },
  description: {
    type: String,
    default: 'Create a new product for the store/warehouse...'
  }
});

const emit = defineEmits(['close'])

const closeModal = () => emit('close');

const productStore = useProductStore()

const actionToPerform = () => {
  if (props.action === 'add') {
    productStore.addProduct(form);
  } else if (props.action === 'edit') {
    productStore.updateProduct(form);
  }
  closeModal();
};

const form = reactive({
  majorName: '',
  minorName: '',
  productCode: '',
  productCategory: '',
  majorUnitOfMeasure: '',
  minorUnitOfMeasure: '',
  quantity: 0,
  status: '',
  produceLabel: '',
  creator: '',
  creationTime: ''
});

watch(() => props.productToEdit, (newVal) => {
  form.majorName = newVal?.majorName ?? '';
  form.minorName = newVal?.minorName ?? '';
  form.productCode = newVal?.productCode ?? '';
  form.productCategory = newVal?.productCategory ?? '';
  form.majorUnitOfMeasure = newVal?.majorUnitOfMeasure ?? '';
  form.minorUnitOfMeasure = newVal?.minorUnitOfMeasure ?? '';
  form.quantity = newVal?.quantity ?? 0;
  form.status = newVal?.status ?? '';
  form.produceLabel = newVal?.produceLabel ?? '';
  form.creator = newVal?.creator ?? '';
  form.creationTime = newVal?.creationTime ?? '';
});
</script>

<style scoped></style>