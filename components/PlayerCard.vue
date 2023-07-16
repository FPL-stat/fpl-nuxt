<script setup lang="ts">
import { IPlayerFull } from "~/types";

defineProps<{
  player: IPlayerFull | null;
}>();
</script>

<template>
  <UCard class="shadow-lg">
    <template #header>
      <div v-if="player">
        <div class="flex justify-between">
          <div class="flex gap-2 items-top">
            <h4 class="text-lg">
              {{ player.first_name }} {{ player.second_name }}
            </h4>
            <div class="self-start">
              <UBadge
                v-if="player.player_type.short_name === 'DEF'"
                color="primary"
                >{{ player.player_type.name }}</UBadge
              >
              <UBadge
                v-else-if="player.player_type.short_name === 'FWD'"
                color="red"
                >{{ player.player_type.name }}</UBadge
              >
              <UBadge
                v-else-if="player.player_type.short_name === 'MID'"
                color="green"
                >{{ player.player_type.name }}</UBadge
              >
              <UBadge
                v-else-if="player.player_type.short_name === 'GKP'"
                color="orange"
                >{{ player.player_type.name }}</UBadge
              >
              <UBadge v-else color="primary">{{
                player.player_type.name
              }}</UBadge>
            </div>
          </div>
          <div>
            <UButton
              @click="$emit('close')"
              icon="i-heroicons-x-mark"
              variant="ghost"
              square
              size="xs"
              color="gray"
            />
          </div>
        </div>
        <h5 class="text-sm font-semibold">{{ player.team.name }}</h5>
      </div>
    </template>

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
</template>
