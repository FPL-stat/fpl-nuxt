<script setup lang="ts">
import { useStatsStore } from "~/stores/data-store";

//const route = useRoute();

const statStore = useStatsStore();

//console.log("route: ", route);
//console.log("store: ", statStore.comparedPlayers);

const p1 = statStore.comparedPlayers[0];
const p2 = statStore.comparedPlayers[1];

const stats = {
now_cost: "Cost",
 total_points: "Total Points",
 points_per_game: "Points per game",
 expected_goals_per_90: "XG(90)",
 expected_assists_per_90: "XA(90)",
 goals_scored: "Goals",
 assists: "Assists"
}
</script>

<template>
  <UContainer class="flex max-w-2xl w-full justify-center py-4">
    <UCard v-if="p1 && p2"  class="w-full shadow-lg">
      <template #header>
        <div class="flex justify-center mb-2">Head to Head Comparison</div>
        <div class="flex justify-evenly">
          <div class="flex justify-start w-1/3">{{ p1.first_name }} {{ p1.second_name }}</div>
          <div class="flex justify-center w-1/3">vs</div>
          <div class="flex justify-end w-1/3 text-right">{{p2.first_name}} {{ p2.second_name }}</div>
        </div>
      </template>
      <div v-for="key in Object.keys(stats)" class="flex justify-evenly">
        <span class="flex justify-start w-1/3">{{ p1[key] }}</span>
        <span class="flex justify-center min-w-fit w-1/3 font-semibold">{{ stats[key] }}</span>
        <span class="flex justify-end w-1/3">{{ p2[key] }}</span>
      </div>

      <template #footer />
    </UCard>
  </UContainer>
</template>
