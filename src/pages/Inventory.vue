<template>
<MasterPage>
  <div class="fixed left-1/6 top-16 w-5/6 bottom-0 px-1 pt-1 bg-white text-black overflow-auto">
    <div class="bg-blue-100 w-full text-xl rounded-md font-bold px-2 py-4">Product List</div>
    <div class="bg-blue-100 w-full h-20 px-2 rounded-md my-2 grid grid-cols-12 gap-2">
      <div class="flex items-center space-x-2 col-span-3 w-full">
        <FloatingLabelInput
          label="Search Inventory..."
          type="date"
          v-model="searchQuery"
          :dark="false"
        />

        <span class="font-bold">To</span>

        <FloatingLabelInput
          label="Search Inventory..."
          type="date"
          v-model="searchQuery"
          :dark="false"
        />
      </div>
      <div class="flex items-center space-x-2 col-span-5 w-full">
        <FloatingLabelInput
          label="Enter (Purchase Order No./ Vendor Name..)"
          type="text"
          v-model="searchQuery"
          :dark="false"
          icon="meteor-icons:search"
          icon-size="30"
        />
        <Button label="Search" size="md" class="h-[60px]" icon="icons8:search" icon-size="30" />
      </div>
      <div class="col-span-4 flex items-center">
        <FloatingLabelInput
          icon="stash:filter-light"
          icon-size="35"
          label="Clear"
          type="text"
          v-model="searchQuery"
          :dark="false"
        />
        <Button label="Add" size="md" class="h-[60px]" icon="icons8:plus" icon-size="30" />
      </div>
    </div>
    <div class="h-1"></div>
    <DataTable :rows="productList" :columns="productHeaders" dataGroupName="products" actions :custom-slots="['status']" height="h-[30vh]">
      <template #status="{data}">
        <div v-if="data" class="flex items-center space-x-1">
          <div class="h-2 w-2 text-xs bg-green-800 rounded-full"></div>
          <span>On Sale</span>
        </div>
        <div v-else class="flex items-center space-x-1">
          <div class="h-2 w-2 text-xs bg-red-600 rounded-full"></div>
          <span>Off Sale</span>
        </div>
      </template>
      <template #actions>
        <div class="flex space-x-2 items-center text-xs">
          <IconButton 
          @click="action()" class="" size="sm" :icon-size="18" type="edit" :loader="false" icon="material-symbols:ink-pen-outline" />
          <IconButton 
          @click="action()" class="" size="sm" :icon-size="18" type="delete" :loader="false" icon="material-symbols:delete-outline-rounded" />
          <IconButton 
          @click="action()" class="" size="sm" :icon-size="18" type="info" :loader="false" icon="material-symbols:info-outline" />
        </div>
      </template>
      <template #pagination="{ currentPage, totalPages }">
        <div class="flex justify-end space-x-2 items-center mt-2">
          <button
            @click="currentPage > 1 && (currentPage--)"
            :disabled="currentPage === 1"
            class="px-3 py-1 border rounded-md bg-gray-100 disabled:opacity-50"
          >
            Prev
          </button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button
            @click="currentPage < totalPages && (currentPage++)"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 border rounded-md bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </template>
    </DataTable>

    <hr class="my-2 border border-slate-200"/>

    <div class="bg-blue-100 w-full text-xl rounded-md font-bold px-2 py-4 mt-2">SKU List</div>
    <DataTable :rows="skuList" :columns="skuHeaders" dataGroupName="SKU" actions :custom-slots="['status']" height="h-[30vh]">
      <template #status="{data}">
        <div v-if="data" class="flex items-center space-x-1">
          <div class="h-2 w-2 text-xs bg-green-800 rounded-full"></div>
          <span>On Sale</span>
        </div>
        <div v-else class="flex items-center space-x-1">
          <div class="h-2 w-2 text-xs bg-red-600 rounded-full"></div>
          <span>Off Sale</span>
        </div>
      </template>
      <template #actions>
        <div class="flex space-x-2 items-center text-xs">
          <IconButton 
          @click="action()" class="" size="sm" :icon-size="18" type="edit" :loader="false" icon="material-symbols:ink-pen-outline" />
          <IconButton 
          @click="action()" class="" size="sm" :icon-size="18" type="delete" :loader="false" icon="material-symbols:delete-outline-rounded" />
          <IconButton 
          @click="action()" class="" size="sm" :icon-size="18" type="info" :loader="false" icon="material-symbols:info-outline" />
        </div>
      </template>
      <template #pagination="{ currentPage, totalPages }">
        <div class="flex justify-end space-x-2 items-center mt-2">
          <button
            @click="currentPage > 1 && (currentPage--)"
            :disabled="currentPage === 1"
            class="px-3 py-1 border rounded-md bg-gray-100 disabled:opacity-50"
          >
            Prev
          </button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button
            @click="currentPage < totalPages && (currentPage++)"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 border rounded-md bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </template>
    </DataTable>
  </div>
</MasterPage>
</template>

<script setup>
import { reactive, ref } from 'vue';
import MasterPage from '../components/shared/MasterPage.vue';
import DataTable from '../components/shared/DataTable.vue';
import IconButton from '../components/shared/buttons/IconButton.vue';
import Button from '../components/shared/buttons/Button.vue';
import FloatingLabelInput from '../components/shared/inputs/FloatingLabelInput.vue';

const action = () => alert('Action clicked!');

const productHeaders = ['majorName', 'minorName', 'productCode', 'minorUnitOfMeasure', 'majorUnitOfMeasure', 'status', 'quantity', 'productCategory', 'produceLabel', 'creator', 'creationTime'];

const skuHeaders = ['majorName', 'specCode', 'skuBarCode', 'unit', 'costPrice', 'sellingPrice', 'stock', 'monthlySales', 'status', 'creator', 'creationTime'];

const productList = reactive([
  { id: 1, majorName: 'Product A', minorName:'product', productCode:'3343', minorUnitOfMeasure:'kg', majorUnitOfMeasure:'lb', status:true, quantity: 10, productCategory:'Category 1', produceLabel:'Label A', creator:'Admin', creationTime:'2024-06-01' },
  { id: 2, majorName: 'Product B', minorName:'product', productCode:'3343', minorUnitOfMeasure:'kg', majorUnitOfMeasure:'lb', status:true, quantity: 5, productCategory:'Category 2', produceLabel:'Label B', creator:'Admin', creationTime:'2024-06-01' },
  { id: 3, majorName: 'Product C', minorName:'product', productCode:'3343', minorUnitOfMeasure:'kg', majorUnitOfMeasure:'lb', status:false, quantity: 20, productCategory:'Category 1', produceLabel:'Label C', creator:'Admin', creationTime:'2024-06-01' },
]);

const skuList = reactive([
  { id: 1, majorName: 'Product A', specCode:'product', skuBarCode:'3343', unit:'kg', costPrice:'lb', sellingPrice:true, stock: 10, monthlySales: 50, status:true, creator:'Admin', creationTime:'2024-06-01' },
  { id: 2, majorName: 'Product B', specCode:'product', skuBarCode:'3343', unit:'kg', costPrice:'lb', sellingPrice:true, stock: 5, monthlySales: 30, status:true, creator:'Admin', creationTime:'2024-06-01' },
  { id: 3, majorName: 'Product C', specCode:'product', skuBarCode:'3343', unit:'kg', costPrice:'lb', sellingPrice:false, stock: 20, monthlySales: 10, status:false, creator:'Admin', creationTime:'2024-06-01' },
]);
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>