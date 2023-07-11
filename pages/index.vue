<script setup lang="ts">
import { IDashboardData, IPlayer } from "../types";
const { data, pending } = await useLazyFetch<IDashboardData>("/api/dashboard", {
  server: false,
});
const pointsColumns = [
  { key: "second_name", label: "" },
  { key: "total_points", label: "Points" },
];
const expectedGoalsCols = [
  { key: "second_name", label: "" },
  { key: "expected_goals_per_90", label: "Goals" },
];
const expectedAssistsCols = [
  { key: "second_name", label: "" },
  { key: "expected_assists_per_90", label: "Assists" },
];
const highestPoints = ref<IPlayer[]>([]);
const expectedGoals = ref<IPlayer[]>([]);
const expectedAssists = ref<IPlayer[]>([]);

watch(data, (_dataNew) => {
  if (data.value) {
    highestPoints.value = data.value.highest_points;
    expectedGoals.value = data.value.expected_goals_90;
    expectedAssists.value = data.value.expected_assists_90;
  }
});
</script>

<template>
  <UContainer class="py-4 grid md:grid-cols-2 lg:grid-cols-3 lg gap-4">
    
    <UCard class="shadow-lg">
      <template #header>Highest Points</template>
      <UTable
        :loading="pending"
        :rows="highestPoints"
        :columns="pointsColumns"
      />
    </UCard>

    <UCard class="shadow-lg">
      <template #header>Expected Goals per 90</template>
      <UTable
        :loading="pending"
        :rows="expectedGoals"
        :columns="expectedGoalsCols"
      />
    </UCard>

    <UCard class="shadow-lg">
      <template #header>Expected Assists Per 90</template>
      <UTable
        :loading="pending"
        :rows="expectedAssists"
        :columns="expectedAssistsCols"
      />
    </UCard>
  </UContainer>
</template>
