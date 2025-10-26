<template>
  <table :class="`w-full mt-2 overflow-auto ${props.height ? props.height : ''}`">
    <thead>
      <tr class="bg-blue-200 h-10">
        <th>#</th>
        <th
          v-for="column in columns"
          :key="column"
          class="capitalize text-left text-sm whitespace-nowrap pl-2"
        >
          {{ removeSpecialCharacter(column) }}
        </th>
        <th v-if="actions" class="capitalize text-left text-sm pl-2">Actions</th>
      </tr>
    </thead>

    <tbody>
      <!-- <div v-if="rows.length > 0"> -->
        <tr
          v-for="(value, index) in rows"
          :key="index"
          :class="`${index % 2 === 0 ? 'bg-white' : 'bg-blue-100'}`"
        >
          <td class="text-sm pl-2">{{ index + 1 }}.</td>
          <td
            v-for="column in columns"
            :key="column"
            class="text-sm pl-2 pr-2 py-4"
          >
            <div v-if="!customSlots.includes(column)">
              {{ value[column] ?? '—' }}
            </div>
            <slot v-else :name="column" :data="value[column]">
              <!-- Default fallback if no slot content -->
              {{ value[column] ?? '—' }}
            </slot>
          </td>
          <td v-if="actions" class="pl-2">
            <slot name="actions" :row="value" />
          </td>
        </tr>
      <!-- </div> -->

      <tr v-if="rows.length === 0">
        <td :colspan="columns.length + (actions ? 2 : 1)" class="h-96">
          No {{ dataGroupName }} data found.
        </td>
      </tr>
    </tbody>

    <tfoot v-if="rows.length > 10">
      <tr>
        <th></th>
        <th
          v-for="column in columns"
          :key="column"
          class="capitalize text-sm text-left h-10"
        >
          {{ removeSpecialCharacter(column) }}
        </th>
        <th v-if="actions" class="capitalize text-left text-sm h-10">
          Actions
        </th>
      </tr>
    </tfoot>
  </table>
</template>

<script setup lang="ts">

interface DataTableProps {
  rows?: Record<string, any>[];
  columns?: string[];
  actions?: boolean;
  dataGroupName?: string;
  customSlots?: string[];
  height?: string;
}

const props = withDefaults(defineProps<DataTableProps>(), {
  rows: () => [],
  columns: () => [],
  actions: false,
  dataGroupName: 'Data',
  customSlots: () => [],
});

const removeSpecialCharacter = (name: string): string =>
  name.replace(/_/g, ' ');
</script>
