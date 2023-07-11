<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3";
import GridLoadingOverlay from "./GridLoadingOverlay.vue";
import type { GridApi, GridReadyEvent } from "ag-grid-community";

defineProps({
  defaultColDef: {},
  rowData: Array,
  colDefs: {},
});

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
</script>

<template>
  <ClientOnly>
    <UContainer class="py-4">
      <UCard>
        <div class="mb-2 w-60">
          <UInput
            id="table-quick-filter"
            @input="onTableFilterChange"
            v-model="tableFilter"
            placeholder="search..."
            icon="i-heroicons-magnifying-glass-20-solid"
          />
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
          :loadingOverlayComponent="GridLoadingOverlay"
          animateRows="true"
          @grid-ready="onGridReady"
        />
      </UCard>
    </UContainer>
  </ClientOnly>
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
