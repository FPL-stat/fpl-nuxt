<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3";
import GridLoadingOverlay from "./GridLoadingOverlay.vue";
import type {
  GridApi,
  GridReadyEvent,
  IRowNode,
  SelectionChangedEvent,
} from "ag-grid-community";

withDefaults(
  defineProps<{
    defaultColDef: {};
    rowData?: any[] | null;
    colDefs: {};
    rowSelection?: string;
  }>(),
  {
    rowSelection: "single",
  }
);

const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

const tableFilter = ref("");
const selectedRows = ref<IRowNode[]>([]);

const showSettings = ref(false);

const gridApi = ref<GridApi | null>(null);

const onGridReady = (params: GridReadyEvent) => {
  gridApi.value = params.api;
};

function onTableFilterChange() {
  if (gridApi.value) {
    gridApi.value.setQuickFilter(tableFilter.value);
    if (tableFilter.value === "") gridApi.value.resetQuickFilter();
  }
}

function onSelectionChanged(event: SelectionChangedEvent) {
  selectedRows.value = event.api.getSelectedRows();
  if (selectedRows.value.length > 2) {
    // event.api.deselectAll()
    const selectedNodes = event.api.getSelectedNodes().slice(0, 1)!;
    event.api.setNodesSelected({ nodes: selectedNodes, newValue: false });
  }
}
</script>

<template>
  <ClientOnly>
    <UContainer class="py-4">
      <UCard>
        <div class="flex gap-2 justify-between items-center pb-2">
          <div class="w-54">
            <UInput
              id="table-quick-filter"
              @input="onTableFilterChange"
              v-model="tableFilter"
              placeholder="search..."
              icon="i-heroicons-magnifying-glass-20-solid"
            />
          </div>
          <div class="flex gap-2">
            <UButton
              size="xs"
              v-show="selectedRows.length === 2"
              variant="solid"
              >Compare</UButton
            >
            <UButton
              size="sm"
              square
              icon="i-heroicons-cog-8-tooth"
              variant="ghost"
              @click="showSettings = !showSettings"
            />
          </div>
        </div>

        <AgGridVue
          :class="{
            'ag-theme-alpine-dark': isDark,
            'ag-theme-alpine': !isDark,
          }"
          style="height: 480px"
          :defaultColDef="defaultColDef"
          :columnDefs="colDefs"
          :rowData="rowData"
          :rowSelection="rowSelection"
          :loadingOverlayComponent="GridLoadingOverlay"
          animateRows="true"
          @grid-ready="onGridReady"
          @selection-changed="onSelectionChanged"
        />
      </UCard>
    </UContainer>
  </ClientOnly>
  <USlideover v-model="showSettings" :ui="{ width: 'w-screen max-w-xs' }">
    <div class="flex justify-between p-4">
      <h3 class="text-lg">Settings</h3>
      <UButton
        @click="showSettings = false"
        icon="i-heroicons-x-mark"
        variant="ghost"
        square
        size="xs"
        color="gray"
      />
    </div>
  </USlideover>
</template>

<style lang="scss">
@use "../node_modules/ag-grid-community/styles" as ag;

@include ag.grid-styles(
  (
    themes: (
      alpine-dark: (
        borders: none,
        header-background-color: transparent,
        background-color: #171717,
        odd-row-background-color: transparent,
        data-color: #737373,
        row-hover-color: rgb(115, 115, 115, 0.1),
      ),
      alpine: (
        borders: none,
        header-background-color: transparent,
        background-color: #fff,
        odd-row-background-color: transparent,
        data-color: #737373,
        row-hover-color: rgb(59, 130, 246, 0.2),
      ),
    ),
  )
);
</style>
