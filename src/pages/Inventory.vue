<template>
<MasterPage>
  <div class="fixed left-1/6 top-16 w-5/6 bottom-0 px-4 bg-white text-black pt-20 overflow-auto">
    <DataTable :rows="products" :columns="headers" dataGroupName="products" actions>
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

const action = () => alert('Action clicked!');

const headers = ['majorName', 'minorName', 'productCode', 'minorUnitOfMeasure', 'majorUnitOfMeasure', 'status', 'quantity'];

const products = reactive([
  { id: 1, majorName: 'Product A', minorName:'product', productCode:'3343', minorUnitOfMeasure:'kg', majorUnitOfMeasure:'lb', status:false, quantity: 10 },
  { id: 2, majorName: 'Product B', minorName:'product', productCode:'3343', minorUnitOfMeasure:'kg', majorUnitOfMeasure:'lb', status:false, quantity: 5 },
  { id: 3, majorName: 'Product C', minorName:'product', productCode:'3343', minorUnitOfMeasure:'kg', majorUnitOfMeasure:'lb', status:false, quantity: 20 },
  { id: 1, majorName: 'Product A', minorName:'product', productCode:'3343', minorUnitOfMeasure:'kg', majorUnitOfMeasure:'lb', status:false, quantity: 10 },
  { id: 2, majorName: 'Product B', minorName:'product', productCode:'3343', minorUnitOfMeasure:'kg', majorUnitOfMeasure:'lb', status:false, quantity: 5 },
  { id: 3, majorName: 'Product C', minorName:'product', productCode:'3343', minorUnitOfMeasure:'kg', majorUnitOfMeasure:'lb', status:false, quantity: 20 },
]);
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>