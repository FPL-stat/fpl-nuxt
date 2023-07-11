<script setup lang="ts">
import { useStatsStore } from "../stores/data-store";

const players = ref();

const stats = useStatsStore();

const colDefs = reactive({
  value: [
    {
      headerName: "Second Name",
      field: "second_name",
      resizable: true,
    },
    { headerName: "First Name", field: "first_name", resizable: true },
    { headerName: "Team", field: "team.short_name", resizable: true,  minWidth: 85, width: 90 },
    { headerName: "Total Points", field: "total_points", maxWidth: 130 },
    { headerName: "Selected (%)", field: "selected_by_percent" },
    { headerName: "XG(90)", field: "expected_goals_per_90", maxWidth: 100, minWidth:100 },
    { headerName: "XA(90)", field: "expected_assists_per_90", maxWidth: 100, minWidth:100 },
    { headerName: "Starts", field: "starts", minWidth: 100 },
    { headerName: "Season Value", field: "value_season" },
  ],
});

const defaultColDef = {
  sortable: true,
  filter: true,
  flex: 1,
  minWidth: 140,
};

onMounted(async () => {
  await stats.fetchData();
  players.value = stats.getPlayers;
});
</script>

<template>
  <DataTable
    :defaultColDef="defaultColDef"
    :rowData="players"
    :colDefs="colDefs.value"
  />
</template>
