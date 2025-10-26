<template>
  <TransitionRoot appear :show="props.isModalOpen" as="template">
    <Dialog as="div" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-opacity-25" />
      </TransitionChild>

      <div class="fixed right-0 inset-0 bg-black bg-opacity-50 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-end text-center"
        >
          <TransitionChild
            as="template"
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enter-from="translate-x-full"
            enter-to="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leave-from="translate-x-0"
            leave-to="translate-x-full"
          >
            <DialogPanel
              class="
                lg:w-1/2
                max-w-2xl
                h-screen
                transform
                overflow-auto
                rounded-none
                bg-white
                p-3
                pb-20
                text-left
                align-middle
                shadow-xl
                transition-all
              "
            >
            <DialogTitle
                as="h3"
                class="
                  text-lg
                  mb-5
                  font-medium
                  leading-6
                  text-gray-900
                  flex
                  w-full
                  items-center
                  justify-between
                "
              >
                <div class="flex flex-col">
                  <span>{{ title }}</span>
                  <span class="text-xs text-gray-500"
                    >{{ description }}</span
                  >
                </div>
                <XCircleIcon
                  class="
                    text-rose-600
                    h-8
                    cursor-pointer
                    hover:text-white hover:bg-rose-600
                    hover:shadow-lg
                    hover:shadow-rose-500/50
                    hover:scale-110
                    transition-all
                    duration-300
                    ease-in-out
                    rounded-full
                    p-1
                    hover:rounded-full
                  "
                  @click="closeModal()"
                />
              </DialogTitle>
              <slot name="header"></slot>
              <slot name="body"></slot>
              <slot name="footer"></slot>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogTitle,
  DialogPanel
} from "@headlessui/vue";
import {
  XCircleIcon,
} from "@heroicons/vue/24/outline";

export interface SlideInModalProps{
  title?: string | undefined;
  description?: string | undefined;
  isModalOpen: boolean | undefined;
}

const props = defineProps<SlideInModalProps>();

const emit = defineEmits(['close'])

const closeModal = () => emit('close');

</script>

<style>
</style>