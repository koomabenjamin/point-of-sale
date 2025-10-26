<template>
  <button
    @click="$emit('click')"
    class="border flex items-center justify-center rounded-md transition-all duration-200"
    :class="[processedColor, sizeClass, { 'opacity-50 pointer-events-none': loader }]"
  >
    <div class="flex items-center gap-2">
      <Icon
        v-if="loader"
        icon="svg-spinners:180-ring-with-bg"
        class="text-white"
        :width="iconSize"
      />
      <Icon
        v-else
        :icon="icon"
        :width="iconSize"
      />
      <span
        v-if="label"
        :class="[
          dark ? 'text-white' : 'text-inherit',
          size === 'sm' ? 'text-xs' :
          size === 'md' ? 'text-sm' :
          size === 'lg' ? 'text-base' : 'text-lg'
        ]"
      >
        {{ label }}
      </span>
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon, type IconifyIcon } from "@iconify/vue"

export interface ButtonProps {
  type?: 'success' | 'delete' | 'info' | 'edit' | 'normal'
  size?: 'sm' | 'md' | 'lg' | 'block'
  label?: string | number
  icon: string | IconifyIcon
  iconSize?: string | number
  dark?: boolean
  loader?: boolean
}

const props = defineProps<ButtonProps>()
const emit = defineEmits(['click'])

const processedColor = computed(() => {
  switch (props.type) {
    case 'success': return 'bg-green-500 hover:bg-green-600 text-white'
    case 'delete': return 'bg-rose-500 hover:bg-rose-600 text-white'
    case 'info': return 'bg-indigo-500 hover:bg-indigo-600 text-white'
    case 'edit': return 'bg-yellow-500 hover:bg-yellow-600 text-white'
    case 'normal': return 'bg-blue-500 hover:bg-blue-600 text-white'
    default: return 'bg-blue-500 hover:bg-blue-600 text-white'
  }
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm': return 'h-8 px-3 text-xs'
    case 'md': return 'h-10 px-4 text-sm'
    case 'lg': return 'h-12 px-5 text-base'
    case 'block': return 'w-full h-12 text-lg'
    default: return 'h-10 px-4 text-sm'
  }
})
</script>
