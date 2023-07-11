<script setup lang="ts">
import type { IPlayer } from "~/types";

const route = useRoute();
const player = ref<IPlayer | null>();
console.log("route: ", route.params.code);

const { data, pending, error, refresh } = useLazyFetch<IPlayer>(
  `/api/players/${route.params.code}`
);

watch(data, (newVal) => {
  player.value = newVal;
});

onMounted(() => {
  if (data.value) player.value = data.value;
});
</script>

<template>
  <UContainer class="py-4">
    <UCard class="shadow-lg">
      <template #header>
        <div v-if="!player" class="flex items-center space-x-4">
          <USkeleton class="w-12 h-12 rounded-full" />
          <div class="space-y-2">
            <USkeleton class="h-4 w-[250px]" />
            <USkeleton class="h-4 w-[200px]" />
          </div>
        </div>

        <div class="flex gap-2">
          <h4 v-if="player" class="text-lg">
            {{ player.first_name }} {{ player.second_name }}
          </h4>
          <UBadge color="primary">position</UBadge>
        </div>
      </template>

      <div v-if="!player" class="space-y-2">
        <USkeleton class="h-4 w-[250px]" />
        <USkeleton class="h-4 w-[250px]" />
        <USkeleton class="h-4 w-[250px]" />
        <USkeleton class="h-4 w-[250px]" />
        <USkeleton class="h-4 w-[250px]" />
      </div>

      <div v-if="player" class="flex justify-center w-aut px-4 overflow-x-auto shadow-lg">
        <div class="flex flex-col min-w-max w-24 p-2 px-4 justify-center items-center border-x">
          <div class="text-sm">{{ player.now_cost/10 }}</div>
          <div class="text-xs font-bold">Cost</div>
        </div>
        <div class="flex flex-col min-w-max w-24 p-2 px-4 justify-center items-center border-x">
          <div class="text-sm">{{ player.selected_by_percent }}%</div>
          <div class="text-xs font-bold">Selected</div>
        </div>
        <div class="flex flex-col min-w-max w-24 p-2 px-4 justify-center items-center border-x">
          <div class="text-sm">{{ player.points_per_game }}</div>
          <div class="text-xs font-bold">Pts/game</div>
        </div>
        <div class="flex flex-col min-w-max w-24 p-2 px-4 justify-center items-center border-x">
          <div class="text-sm">{{ player.total_points }}</div>
          <div class="text-xs font-bold">Total Pts</div>
        </div>
        <div class="flex flex-col min-w-max w-24 p-2 px-4 justify-center items-center border-x">
          <div class="text-sm">{{ player.bonus }}</div>
          <div class="text-xs font-bold">Bonus Pts</div>
        </div>
        <div class="flex flex-col min-w-max w-24 p-2 px-4 justify-center items-center border-x">
          <div class="text-sm">{{ player.expected_goals_per_90 }}</div>
          <div class="text-xs font-bold">XG (90)</div>
        </div>
        <div class="flex flex-col min-w-max w-24 p-2 px-4 justify-center items-center border-x">
          <div class="text-sm">{{ player.expected_assists_per_90 }}</div>
          <div class="text-xs font-bold">XA (90)</div>
        </div>
      </div>

      <div class="flex justify-evenly mt-2 mb-10">
        <div class="flex flex-col">
          <h5 class="text-md font-semibold">Form</h5>
        </div>
        <div class="flex flex-col">
          <h5 class="text-md font-semibold">Fixtures</h5>
        </div>
      </div>
  
      <hr>

      <ul>
        <li v-for="(stat, key) in player" :key="key">{{ key }}: {{ stat }}</li>
      </ul>

      <template #footer />
    </UCard>
  </UContainer>
</template>
