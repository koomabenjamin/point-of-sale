<template>
<MasterPage>
  <div class="fixed left-1/6 top-16 w-5/6 bottom-0 px-1 pt-1 bg-white text-black overflow-auto">
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
    <!-- <DataTable
      :rows="users"
      :columns="['name', 'email', 'role']"
      :actions="true"
      :customSlots="['role']"
      dataGroupName="User"
      height="max-h-96"
    >
      <template #role="{ data }">
        <span :class="data === 'Admin' ? 'text-red-600 font-bold' : 'text-gray-700'">
          {{ data }}
        </span>
      </template>

      <template #actions="{ row }">
        <button @click="edit(row)" class="text-blue-500 hover:underline">Edit</button>
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
    </DataTable> -->

    <DataTable :rows="products" :columns="headers" dataGroupName="products" actions :custom-slots="['status']" height="h-[500px]">
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

const headers = ['majorName', 'minorName', 'productCode', 'minorUnitOfMeasure', 'majorUnitOfMeasure', 'status', 'quantity'];

const products = reactive([
  { id: 1, majorName: 'Product A', minorName:'product', productCode:'3343', minorUnitOfMeasure:'kg', majorUnitOfMeasure:'lb', status:true, quantity: 10 },
  { id: 2, majorName: 'Product B', minorName:'product', productCode:'3343', minorUnitOfMeasure:'kg', majorUnitOfMeasure:'lb', status:true, quantity: 5 },
  { id: 3, majorName: 'Product C', minorName:'product', productCode:'3343', minorUnitOfMeasure:'kg', majorUnitOfMeasure:'lb', status:false, quantity: 20 },
  { id: 1, majorName: 'Product A', minorName:'product', productCode:'3343', minorUnitOfMeasure:'kg', majorUnitOfMeasure:'lb', status:true, quantity: 10 },
  { id: 2, majorName: 'Product B', minorName:'product', productCode:'3343', minorUnitOfMeasure:'kg', majorUnitOfMeasure:'lb', status:false, quantity: 5 },
  { id: 3, majorName: 'Product C', minorName:'product', productCode:'3343', minorUnitOfMeasure:'kg', majorUnitOfMeasure:'lb', status:false, quantity: 20 },
  { id: 1, majorName: 'Product A', minorName:'product', productCode:'3343', minorUnitOfMeasure:'kg', majorUnitOfMeasure:'lb', status:true, quantity: 10 },
  { id: 2, majorName: 'Product B', minorName:'product', productCode:'3343', minorUnitOfMeasure:'kg', majorUnitOfMeasure:'lb', status:true, quantity: 5 },
  { id: 3, majorName: 'Product C', minorName:'product', productCode:'3343', minorUnitOfMeasure:'kg', majorUnitOfMeasure:'lb', status:false, quantity: 20 },
  { id: 1, majorName: 'Product A', minorName:'product', productCode:'3343', minorUnitOfMeasure:'kg', majorUnitOfMeasure:'lb', status:true, quantity: 10 },
  { id: 2, majorName: 'Product B', minorName:'product', productCode:'3343', minorUnitOfMeasure:'kg', majorUnitOfMeasure:'lb', status:false, quantity: 5 },
  { id: 3, majorName: 'Product C', minorName:'product', productCode:'3343', minorUnitOfMeasure:'kg', majorUnitOfMeasure:'lb', status:false, quantity: 20 },
]);
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>