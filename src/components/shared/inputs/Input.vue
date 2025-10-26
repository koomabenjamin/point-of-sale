<template>
  <div className="w-full flex items-center space-x-2">
    <div v-if="type !== 'date'">
      <Icon :icon="props.icon" :width="props.iconSize" />
    </div>
    <input :id=props.id :disabled="props.disabled" :placeholder="props.label" :type="props.type" autocomplete="off"
      @input="updateValue($event)" :class="`
         peer
         w-full
         p-2
         text-sm
         pt-2 
         font-light 
         bg-white 
         border
         h-10
         rounded-md
         outline-none
         transition
         disabled:opacity-70
         disabled:cursor-not-allowed
         ${props.price ? 'pl-9' : 'pl-4'}
               ${props.errors ? 'border-rose-500' : 'border-neutral-300'}
               ${props.errors ? 'focus:border-rose-500' : 'focus:border-black'}
       `" />
    <!-- <label 
       :class="`
         absolute 
         text-sm
         duration-150
         ${props.price ? 'left-9' : 'left-4'}
         ${props.errors ? 'text-rose-500' : 'text-zinc-400'}
       `"
     >
       {{props.label}}
     </label> -->

  </div>
</template>

<script setup lang="ts">
import { Icon, type IconifyIcon } from "@iconify/vue";

type Error = {
  error: string;
}

export interface InputProps {
  id?: string | undefined;
  name?: string | undefined;
  label?: string | undefined;
  price?: string | undefined;
  hide?: boolean | undefined;
  icon: string | IconifyIcon;
  iconSize?: string | number | undefined;
  type?: string | undefined;
  required?: boolean | undefined;
  disabled?: boolean | undefined;
  readonly?: boolean | undefined;
  modelValue?: string | undefined;
  errors?: Error[] | undefined;
}

const props = defineProps<InputProps>();

const emit = defineEmits(['update:modelValue'])

const updateValue = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
};
</script>

<style></style>