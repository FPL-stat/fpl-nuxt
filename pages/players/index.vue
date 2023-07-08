<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3";
import type { GridApi, GridReadyEvent, ICellRendererParams } from "ag-grid-community";
import { reactive } from "vue";

import { IPlayer } from "~/types";

const router = useRouter()

const colorMode = useColorMode();
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

function linkRenderer (params: ICellRendererParams<IPlayer>) {
	const route = {
		name: 'players-code',
		params: { code: params.data.code }
	}
	const link = document.createElement("a")
	link.href = router.resolve(route).href
	link.innerText = params.value
	link.addEventListener('click', e => {
		e.preventDefault()
		router.push(route)
	})
	return link
}


const tableFilter = ref('')

const gridApi = ref<GridApi|null>(null);
const onGridReady = (params: GridReadyEvent) => {
  gridApi.value = params.api;
};

const rowData = reactive({ rows: <IPlayer[]>[] });
const columnDefs = reactive({
  value: [
    { headerName: "Second Name", field: "second_name", resizable: true, cellRenderer: linkRenderer },
    { headerName: "First Name", field: "first_name" },
    { headerName: "Total Points", field: "total_points" },
    { headerName: "Starts", field: "starts", minWidth: 100 },
    { headerName: "Season Value", field: "value_season" },
    { headerName: "Selected (%)", field: "selected_by_percent" },
  ],
});
const defaultColDef = {
  sortable: true,
  filter: true,
  flex: 1,
  minWidth: 140,
};

function onTableFilterChange() {
  if (gridApi.value) gridApi.value.setQuickFilter(tableFilter.value)
}




watch(data, (newData) => {
  if (newData) rowData.rows = newData;
});

onMounted(async () => {
  if (data.value) {
    rowData.rows = data.value;
  }
  console.log(data.value);
});
</script>

<template>
  <ClientOnly>
    <!-- <div class="py-4 px-4 overflow-auto"> -->
    <UContainer class="py-4">
      <UCard class="shadow-lg">
        <div class="w-60">
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
          style="height: 500px"
          :columnDefs="columnDefs.value"
          :rowData="rowData.rows"
          :defaultColDef="defaultColDef"
          animateRows="true"
          @grid-ready="onGridReady"
        />
      </UCard>
    </UContainer>
    <!-- </div> -->
  </ClientOnly>
</template>

<style lang="scss">
@use "../../node_modules/ag-grid-community/styles" as ag;

@include ag.grid-styles(
  (
    themes: (
      alpine-dark: (
        borders: none,
        header-background-color: transparent,
        background-color: transparent,
        odd-row-background-color: transparent,
        data-color: #737373,
        row-hover-color: rgb(115, 115, 115, 0.1)
      ),
      alpine: (
        borders: none,
        header-background-color: transparent,
        background-color: transparent,
        odd-row-background-color: transparent,
        data-color: #737373,
        row-hover-color: rgb(59, 130, 246, 0.2)
      )
    )
  )
);
</style>
