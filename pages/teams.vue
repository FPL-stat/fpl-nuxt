<script setup lang="ts">
import { useStatsStore } from "~/stores/data-store";
import type { ITeam } from "../types";

const stats = useStatsStore()

const teams = ref<ITeam[]>();

const columns = reactive({
  value: [
    { field: "name", },
    { field: "short_name",  },
    { field: "strength",  },
    { field: "played",  },
    { field: "win",  },
    { field: "draw", },
    { field: "loss", },
  ],
});

const defaultColDef = {
  sortable: true,
  filter: true,
  flex: 1,
  minWidth: 140,
};

onMounted(async () => {
  await stats.fetchData()
  teams.value = stats.getTeams
  //console.log('teams: ', teams.value)
});
</script>

<template>
  <DataTable
    :defaultColDef="defaultColDef"
    :colDefs="columns.value"
    :rowData="teams"
  />
</template>
