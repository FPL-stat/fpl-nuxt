<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3";

import { reactive } from "vue";

import { IPlayer } from "~/types";

const colorMode = useColorMode();
console.log(colorMode);
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

const { data, pending } = useAsyncData<IPlayer[]>("players", () =>
  $fetch("/api/players")
);
const gridApi = ref(null);

const onGridReady = (params) => {
  gridApi.value = params.api;
};

const rowData = reactive({ rows: <IPlayer[]>[] });
const columnDefs = reactive({
  value: [
    { headerName: "Second Name", field: "second_name", minWidth: 150 },
    { field: "first_name" },
    { field: "total_points" },
    { field: "starts" },
    { field: "value_season" },
    { field: "selected_by_percent" },
  ],
});
const defaultColDef = {
  sortable: true,
  filter: true,
  flex: 1,
  minWidth: 150,
};
watch(data, (newData) => {
  if (newData) rowData.rows = newData;
});

onMounted(async () => {
  if (data.value) {
    rowData.rows = data.value;
  }
  console.log(colorMode);
});
</script>

<template>
  <ClientOnly>
    <div class="py-4 px-4 overflow-auto">
      <AgGridVue
        :class="{ 'ag-theme-dark': isDark, 'ag-theme-alpine': !isDark }"
        style="height: 500px"
        :columnDefs="columnDefs.value"
        :rowData="rowData.rows"
        :defaultColDef="defaultColDef"
        animateRows="true"
        @grid-ready="onGridReady"
      />
    </div>
  </ClientOnly>
</template>

<style lang="postcss">
@use "../../node_modules/ag-grid-community/styles" as ag;

@include ag.grid-styles(
  (
    theme: dark,
    extend-theme: alpine-dark,
    borders: none,
    header-background-color: transparent,
    background-color: transparent,
    odd-row-background-color: transparent,
    data-color: #737373,
    row-hover-color: rgb(115, 115, 115, 0.1)
  )
);
</style>
