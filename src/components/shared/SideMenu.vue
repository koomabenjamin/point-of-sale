<template>
  <!-- products listing -->
  <div class="pt-4 pl-5 overflow-auto w-1/6 h-screen flex flex-col items-start justify-between fixed bg-black text-slate-200">
    <div class="flex flex-col">
      <RouterLink to="/" class="mb-20">LOGO (tm)</RouterLink>
      <RouterLink to="/">Dashboard</RouterLink>
      <RouterLink to="/inventory">Inventory</RouterLink>
      <RouterLink to="/point-of-sale">Point of Sale</RouterLink>
      <!-- <RouterLink>Manage Products</RouterLink> -->
      <!-- <RouterLink>Manage Categories</RouterLink> -->
      <RouterLink to="/reports">Reports</RouterLink>
    </div>

    <div class="flex flex-col">
      <RouterLink to="/help-center">Help Center</RouterLink>
      <RouterLink to="/settings">Settings</RouterLink>
      <RouterLink to="/">Logout</RouterLink>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>