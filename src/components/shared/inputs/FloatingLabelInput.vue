<template>
   <div
    v-show="!hidden"
    class="w-full relative"
   >
      <input
        :id=props.id
        :disabled="props.disabled"
        placeholder=" "
        :type="props.type"
        autocomplete="off"
        :accept="props.accept"
        @input="updateValue($event)"
        @blur="handleBlur()"
        :value="props.modelValue"
        :class="`
          peer
          w-full
          p-2
          pt-6 
          font-light 
          bg-white 
          border
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${props.price ? 'pl-9' : 'pl-4'}
          ${errorMessage ? 'border-rose-500' : ''}
          ${props.errors ? 'border-rose-500' : ''}
          ${props.errors ? 'focus:border-rose-500' : 'focus:border-black'}
        `"
      />
      <label 
        :class="`
          absolute 
          text-[13px]
          duration-150 
          transform 
          -translate-y-4 
          top-5 
          z-10 
          origin-[0] 
          ${props.price ? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${props.errors ? 'text-rose-500' : 'text-blue-500'}
          ${errorMessage ? 'text-rose-500' : 'text-blue-500'}
        `"
      >
        {{props.label}}
      </label>
      <div class="absolute top-5 right-2" v-if="type !== 'date'">
        <Icon v-if="props.icon" :icon="props.icon" :width="props.iconSize"/>
      </div>
    </div>
    <p class="help-message text-red-600 text-xs" v-show="errorMessage || meta.valid">
      <!-- {{ errorMessage }} - {{ meta }} -->
      {{ errorMessage }}
    </p>
</template>

<script lang="ts" setup>
import { toRef, watch } from 'vue';
import { useField } from 'vee-validate';
import { Icon, type IconifyIcon } from "@iconify/vue";

type Error = {
  error: string;
}

export interface InputProps{
  id?: string | undefined;
  name: string;
  label?: string | undefined;
  price?: string | undefined;
  accept?: string | undefined;
  hidden?: boolean | undefined;
  icon?: string | IconifyIcon;
  iconSize?: string | number | undefined;
  type?: string | undefined;
  required?: boolean | undefined;
  disabled?: boolean | undefined;
  readonly?: boolean | undefined;
  modelValue?: string | number;
  errors?: Error[] | undefined;
}

const props = defineProps<InputProps>();

const name = toRef(props, 'name');

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.modelValue,
});

watch(
  () => props.modelValue,
  (modelValue) => {
    emit('update:modelValue', modelValue);
  }
);

const emit = defineEmits(['update:modelValue'])

const updateValue = (e: Event) => {
  handleChange(e);
  emit('update:modelValue', (e.target as HTMLInputElement).value)
};
</script>

<style>

</style>