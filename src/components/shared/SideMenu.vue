<template>
  <!-- products listing -->
  <div class="pt-4 pl-5 overflow-auto w-1/6 h-screen flex flex-col left-0 top-0 items-start justify-between fixed bg-slate-100 text-slate-200">
    <div class="flex flex-col w-full">
      <RouterLink to="/" class="mb-20 text-black text-2xl">LOGO (tm)</RouterLink>
      <SideMenuItem
        v-for="item in topMenuItems"
        :key="item.name"
        :name="item.name"
        :icon="item.icon"
        :path="item.path"
      />
    </div>

    <div class="flex flex-col w-full">
    <SideMenuItem
        v-for="item in bottomMenuItems"
        :key="item.name"
        :name="item.name"
        :icon="item.icon"
        :path="item.path"
      />
    </div>
  </div>
</template>

<script setup>
import SideMenuItem from './SideMenuItem.vue';

const topMenuItems = [
  { name: 'Dashboard', icon: 'mdi:home-outline', path: '/' },
  { name: 'Inventory', icon: 'mdi:archive-outline', path: '/inventory' },
  { name: 'Point of Sale', icon: 'mdi:cash-register', path: '/point-of-sale' },
  { name: 'Reports', icon: 'mdi:chart-box-outline', path: '/reports' },
];

const bottomMenuItems = [
  { name: 'Settings', icon: 'mdi:cog-outline', path: '/settings' },
  { name: 'Help', icon: 'mdi:help-circle-outline', path: '/help' },
  { name: 'Logout', icon: 'mdi:logout', path: '/' },
];
</script>

<style>

</style>