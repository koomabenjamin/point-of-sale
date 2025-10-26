<template>
  <div class="bg-slate-50 shadow h-16 fixed left-1/6 right-0 flex items-center px-4">
    <div class="font-bold text-xl">iGourd POS System</div>
    <div class="flex-1"></div>
    <div class="flex items-center space-x-4">
      <!-- Notification Icon -->
      <Icon icon="mdi:bell-outline" width="30" class="text-gray-600 hover:text-gray-900 cursor-pointer" />
      <!-- User Profile Icon -->
      <Icon icon="mdi:email-outline" width="30" class="text-gray-600 hover:text-gray-900 cursor-pointer" />
      <!-- User Profile Icon -->
      <Icon icon="mdi:account-circle-outline" width="30" class="text-gray-600 hover:text-gray-900 cursor-pointer" />
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
</script>

<style>

</style>