<template>
<MasterPage>
  <div>
    <h1>Reports</h1>
    <p>{{ message }}</p>
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