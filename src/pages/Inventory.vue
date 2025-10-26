<template>
<MasterPage>
  <div class="fixed left-1/6 top-16 w-5/6 bottom-0 px-4 bg-white text-black pt-20 overflow-auto">
    <DataTable :rows="[{name:'ben'}, {name:'sandra'}, {name:'sandra'}, {name:'sandra'}, {name:'sandra'}, {name:'sandra'}, {name:'sandra'}, {name:'sandra'}, {name:'sandra'}, {name:'sandra'}, {name:'sandra'}, {name:'sandra'}, {name:'sandra'}, {name:'sandra'}, {name:'sandra'}, {name:'sandra'}, {name:'sandra'}]" :columns="['name']" dataGroupName="products"></DataTable>
  </div>
</MasterPage>
</template>

<script setup>
import { ref } from 'vue';
import MasterPage from '../components/shared/MasterPage.vue';
import DataTable from '../components/shared/DataTable.vue';

const message = ref('Welcome to the Dashboard!');
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>