<template>
<MasterPage>
  <div class="h-screen w-5/6 fixed left-1/6 top-16 bg-slate-100 flex flex-col px-4 text-black">
    <h1 class="text-lg font-bold">Dashboard</h1>
    <p class="font-bold">{{ message }}</p>
  </div>
</MasterPage>
</template>

<script setup>
import { ref } from 'vue';
import MasterPage from '../components/shared/MasterPage.vue';

const message = ref('Welcome to the Dashboard!');
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>