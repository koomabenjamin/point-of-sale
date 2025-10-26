<template>
  <MasterPage>
  <!-- header -->
  <div class="bg-slate-800 h-16 fixed left-1/6 right-0 border-b flex items-center px-4">
    <input type="text" 
      class="border border-slate-500 rounded-l-full h-12 w-2/3 text-slate-400 p-5 focus:ring-0" placeholder="Search for product...">
    <button class="bg-orange-500 text-white h-12 px-4 font-semibold rounded-r-full cursor-pointer">Search</button>
  </div>

  <!-- body -->
  <div class="h-screen w-5/6 fixed left-1/6 top-16 bg-slate-950 flex">

    <div class="pt-16 px-4 overflow-auto w-2/3 h-auto border-x-[0.5px] border-slate-700 text-slate-300">
      <h2 class="my-2">Order History</h2>
      <div class="w-full px-0 flex item-center overflow-auto space-x-2">
        <div class="h-48 w-72 shrink-0 rounded bg-slate-600 flex items-center justify-center"><span>Order #3433</span></div>
        <div class="h-48 w-72 shrink-0 rounded bg-slate-600 flex items-center justify-center"><span>Order #3440</span></div>
        <div class="h-48 w-72 shrink-0 rounded bg-slate-600 flex items-center justify-center"><span>Order #3450</span></div>
        <div class="h-48 w-72 shrink-0 rounded bg-slate-600 flex items-center justify-center"><span>Order #3451</span></div>
        <div class="h-48 w-72 shrink-0 rounded bg-slate-600 flex items-center justify-center"><span>Order #3445</span></div>
        <div class="h-48 w-72 shrink-0 rounded bg-slate-600 flex items-center justify-center"><span>Order #3490</span></div>
      </div>

      <h2 class="my-2">Products / Item Listing</h2>
      <div class="grid grid-cols-5 gap-2 overflow-auto h-[80vh]">
        <div class="h-36 bg-blue-500 rounded flex items-center justify-center font-bold" v-for="i in 50" :key="i">
          <span>Product {{ i }}</span>
        </div>
      </div>
    </div>

    <div class="pt-20 overflow-auto w-1/3 h-auto text-slate-200 px-2">

      <!-- Customer Information -->

      <h1>Serving: Customer #593499334</h1>
      <h4>Customer: Online / Walking...</h4>

      <!-- Ordered Items -->
      <h1>Ordered Items</h1>
      <ul class="flex flex-col space-y-1 divide-y">
        <li class="h-10 flex items-center justify-between" v-for="i in 10" :key="i">
          <span>Product {{ i }}</span>
          <span>5000ugx</span>
        </li>
      </ul>

      <!-- Payment Summary -->
      <div class="mt-4 border border-slate-800 rounded space-y-4">
        <div class="flex items-center justify-between text-2xl">
          <span>Subtotal:</span>
          <span>50,000ugx</span>
        </div>
        <div class="flex items-center justify-between text-xl">
          <span>Tax Deduction:</span>
          <span>18%</span>
        </div>
        <div class="flex items-center justify-between text-lg">
          <span>Discount:</span>
          <span>5,000ugx</span>
        </div>
        <div class="flex items-center justify-between">
          <span>Loyalty Points:</span>
          <span>500</span>
        </div>
        <div class="flex items-center justify-between text-3xl">
          <span>Total:</span>
          <span>45,600 UGX</span>
        </div>
      </div>

      <!-- Payment Method -->
      <div class="mt-4 grid grid-cols-3 gap-2 w-full h-20">
        <div v-for="(method, index) in ['Pesapal', 'MTN Momo', 'Airtel Money']" :key="index" class="border rounded-xl center">{{ method }}</div>
      </div>

      <!-- Complete Purchase / Order -->
      <div class="mt-4 grid grid-cols-2 gap-2 w-full h-20 font-semibold">
        <div class="bg-green-600 center rounded-xl cursor-pointer">Complete Purchase</div>
        <div class="bg-red-600 center rounded-xl cursor-pointer">Cancel Order</div>
      </div>

    </div>

  </div>

  <!-- footer -->
  </MasterPage>
</template>

<script>
import { ref } from 'vue';
import MasterPage from '../components/shared/MasterPage.vue';

export default {
  setup() {
    const message = ref('Welcome to the Dashboard!');

    return {
      message,
    };
  },
};
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>