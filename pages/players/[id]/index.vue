<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStatsStore } from "~/stores/data-store";
import type { IPlayer } from "~/types";

interface IPlayerFull extends IPlayer {
  team: {
    name: string;
    short_name: string;
  };
  player_type: {
    name: string;
    short_name: string;
  };
}

const route = useRoute();
const { id: playerId } = route.params as { id: string };
const statsStore = useStatsStore();

const player = ref<IPlayerFull | null>();
const badgeColor = ref()

const { getPlayerById } = storeToRefs(statsStore);
enum BadgeColor {
  GKP = 'orange',
  DEF = 'primary',
  MID = 'green',
  FWD = 'red'
}
function setBadgeColor() {
  const playerType = player.value?.player_type.short_name!;
  if (playerType in BadgeColor) {
    badgeColor.value = BadgeColor[playerType as keyof typeof BadgeColor];
  }  
}

onMounted(async () => {
  await statsStore.fetchData();
  player.value = getPlayerById.value(playerId);
  setBadgeColor()
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
        <div v-if="player">
          <div class="flex gap-2">
            <h4 class="text-lg">
              {{ player.first_name }} {{ player.second_name }}
            </h4>
            <UBadge :color="badgeColor">{{ player.player_type.name }}</UBadge>
          </div>
          <h5 class="text-sm font-semibold">{{ player.team.name }}</h5>
        </div>
      </template>

      <div v-if="!player" class="space-y-2">
        <USkeleton class="h-4 w-[250px]" />
        <USkeleton class="h-4 w-[250px]" />
        <USkeleton class="h-4 w-[250px]" />
        <USkeleton class="h-4 w-[250px]" />
        <USkeleton class="h-4 w-[250px]" />
      </div>

      <div
        v-if="player"
        class="flex overflow-x-auto px-4 mx-auto whitespace-nowrap shadow-sm"
      >
        <div
          class="flex flex-col justify-center items-center p-2 px-4 ml-auto w-24 min-w-[20%] border-x"
        >
          <div class="text-sm">{{ player.now_cost / 10 }}</div>
          <div class="text-xs font-bold">Cost</div>
        </div>
        <div
          class="flex flex-col justify-center items-center p-2 px-4 w-24 min-w-max border-x"
        >
          <div class="text-sm">{{ player.selected_by_percent }}%</div>
          <div class="text-xs font-bold">Selected</div>
        </div>
        <div
          class="flex flex-col justify-center items-center p-2 px-4 w-24 min-w-max border-x"
        >
          <div class="text-sm">{{ player.points_per_game }}</div>
          <div class="text-xs font-bold">Pts/game</div>
        </div>
        <div
          class="flex flex-col justify-center items-center p-2 px-4 w-24 min-w-max border-x"
        >
          <div class="text-sm">{{ player.total_points }}</div>
          <div class="text-xs font-bold">Total Pts</div>
        </div>
        <div
          class="flex flex-col justify-center items-center p-2 px-4 w-24 min-w-max border-x"
        >
          <div class="text-sm">{{ player.bonus }}</div>
          <div class="text-xs font-bold">Bonus Pts</div>
        </div>
        <div
          class="flex flex-col justify-center items-center p-2 px-4 w-24 min-w-max border-x"
        >
          <div class="text-sm">{{ player.expected_goals_per_90 }}</div>
          <div class="text-xs font-bold">XG (90)</div>
        </div>
        <div
          class="flex flex-col justify-center items-center p-2 px-4 mr-auto w-24 min-w-max border-x"
        >
          <div class="text-sm">{{ player.expected_assists_per_90 }}</div>
          <div class="text-xs font-bold">XA (90)</div>
        </div>
      </div>

      <div class="flex justify-evenly mt-4 mb-10">
        <div class="flex flex-col">
          <h5 class="font-semibold text-md">Form</h5>
        </div>
        <div class="flex flex-col">
          <h5 class="font-semibold text-md">Fixtures</h5>
        </div>
      </div>

      <template #footer />
    </UCard>
  </UContainer>
</template>
