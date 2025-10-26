<template>
  <!-- header -->
  <NavBar/>

  <!-- products listing -->
  <SideMenu/>

  <!-- body -->
  <div class="h-screen w-screen bg-slate-950 flex">
    <slot></slot>
  </div>

  <!-- footer -->
</template>

<script setup>
import { ref } from 'vue';
import SideMenu from './SideMenu.vue';
import NavBar from './NavBar.vue';

const message = ref('Welcome to the Dashboard!');

</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>