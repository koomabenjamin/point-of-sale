<script lang="ts" setup>
import { ref, watch } from 'vue';
const props = defineProps<{
  fields: number;
}>();

const data = ref<any>([]);
const firstInputEl = ref<any>(null);
const emit = defineEmits(['update:modelValue']);

watch(
  () => data,
  (newVal) => {
    if (
      newVal.value != '' &&
      newVal.value.length === props.fields &&
      !newVal.value.includes('')
    ) {
      emit('update:modelValue', Number(newVal.value.join('')));
    } else {
      emit('update:modelValue', null);
    }
  },
  { deep: true }
);

const handleOtpInput = (e: any) => {
  if (e.data && e.target.nextElementSibling) {
    e.target.nextElementSibling.focus();
  } else if (e.data == null && e.target.previousElementSibling) {
    e.target.previousElementSibling.focus();
  }
};

const handlePaste = (e: any) => {
  const pasteData = e.clipboardData.getData('text');
  let nextEl = firstInputEl.value[0]?.nextElementSibling;
  for (let i = 1; i < pasteData.length; i++) {
    if (nextEl) {
      data.value[i] = pasteData[i];
      nextEl = nextEl.nextElementSibling;
    }
  }
};

// 123456
</script>

<template>
  <div class="otp w-full flex justify-around" @input="handleOtpInput">
    <template v-for="field in fields" :key="field">
      <input
        v-model="data[field - 1]"
        ref="firstInputEl"
        type="text"
        maxlength="1"
        class="border w-[60px] rounded text-center h-16 bg-slate-100 focus:border-blue-600 text-xl font-semibold"
        @paste="field === 1 && handlePaste($event)"
      />
    </template>
  </div>
</template>