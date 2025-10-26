<template>
  <!-- ===== WRAPPER ===== -->
  <div class="w-full mt-2">
    <!-- Scrollable area -->
    <div :class="`overflow-auto ${props.height || ''}`">
      <table class="w-full">
        <!-- ===== TABLE HEADER ===== -->
        <thead>
          <tr class="bg-blue-200 h-10">
            <th class="text-left pl-2">#</th>
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

        <!-- ===== TABLE BODY ===== -->
        <tbody>
          <tr
            v-for="(row, index) in paginatedRows"
            :key="`${index}-${currentPage}`"
            :class="index % 2 === 0 ? 'bg-white' : 'bg-blue-100'"
          >
            <td class="text-sm pl-2">{{ startIndex + index + 1 }}.</td>

            <td
              v-for="column in columns"
              :key="`${index}-${column}`"
              class="text-sm pl-2 pr-2 py-4"
            >
              <template v-if="!customSlots.includes(column)">
                {{ row[column] ?? '—' }}
              </template>
              <slot
                v-else
                :name="column"
                :data="row[column]"
                :row="row"
              >
                {{ row[column] ?? '—' }}
              </slot>
            </td>

            <td v-if="actions" class="pl-2">
              <slot name="actions" :row="row" />
            </td>
          </tr>

          <!-- ===== EMPTY STATE ===== -->
          <tr v-if="rows.length === 0">
            <td
              :colspan="columns.length + (actions ? 1 : 0) + 1"
              class="h-40 text-center text-gray-500 italic"
            >
              <slot name="empty">
                No {{ dataGroupName }} data found.
              </slot>
            </td>
          </tr>
        </tbody>

        <!-- ===== TABLE FOOTER ===== -->
        <tfoot v-if="rows.length > 10">
          <tr class="bg-blue-50">
            <th class="text-left pl-2">#</th>
            <th
              v-for="column in columns"
              :key="column"
              class="capitalize text-sm text-left h-10 pl-2"
            >
              {{ removeSpecialCharacter(column) }}
            </th>
            <th v-if="actions" class="capitalize text-left text-sm h-10 pl-2">
              Actions
            </th>
          </tr>
        </tfoot>
      </table>
    </div>

    <!-- ===== PAGINATION CONTROLS ===== -->
    <div v-if="rows.length > rowsPerPageOptions[0]" class="flex items-center justify-between mt-3 text-sm">
      <!-- Rows per page -->
      <div class="flex items-center space-x-2">
        <span>Rows per page:</span>
        <select
          v-model.number="rowsPerPage"
          class="border border-gray-300 rounded-md p-1 text-sm"
        >
          <option v-for="option in rowsPerPageOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>

      <!-- Default pagination (can be overridden) -->
      <slot name="pagination" :current-page="currentPage" :total-pages="totalPages">
        <div class="flex items-center space-x-2">
          <button
            @click="previousPage"
            :disabled="currentPage === 1"
            class="px-2 py-1 border rounded-md bg-gray-100 disabled:opacity-50"
          >
            Prev
          </button>

          <span>Page {{ currentPage }} of {{ totalPages }}</span>

          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-2 py-1 border rounded-md bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

interface DataTableProps {
  rows?: Record<string, any>[];
  columns?: string[];
  actions?: boolean;
  dataGroupName?: string;
  customSlots?: string[];
  height?: string;
  defaultRowsPerPage?: number;
}

const props = withDefaults(defineProps<DataTableProps>(), {
  rows: () => [],
  columns: () => [],
  actions: false,
  dataGroupName: 'Data',
  customSlots: () => [],
  defaultRowsPerPage: 10,
});

const currentPage = ref(1);
const rowsPerPageOptions = [5, 10, 20, 50];
const rowsPerPage = ref(props.defaultRowsPerPage);

const totalPages = computed(() =>
  Math.ceil(props.rows.length / rowsPerPage.value) || 1
);

const startIndex = computed(() =>
  (currentPage.value - 1) * rowsPerPage.value
);

const endIndex = computed(() =>
  startIndex.value + rowsPerPage.value
);

const paginatedRows = computed(() =>
  props.rows.slice(startIndex.value, endIndex.value)
);

const removeSpecialCharacter = (name: string): string =>
  name.replace(/_/g, ' ');

// Navigation
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

// Watch rowsPerPage → reset to first page
watch(rowsPerPage, () => (currentPage.value = 1));
</script>
