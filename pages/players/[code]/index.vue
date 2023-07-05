<script setup lang="ts">
import type { IPlayer } from "~/types";

const route = useRoute();
const player = ref<IPlayer | null>();
console.log("route: ", route.params.code);

const { data, pending, error, refresh } = useLazyFetch<IPlayer>(
  `/api/players/${route.params.code}`
);

watch(pending, (newVal) => {
  console.log("pending: ", pending);
  console.log("data: ", data.value);
  console.log("newVal: ", newVal);
  player.value = data.value;
  console.log("player: ", player.value);
});

onMounted(() => {
  if (data.value) {
    player.value = data.value;
  }
});
</script>

<template>
  <UContainer class="py-4">
    <UCard v-if="player">
      <template #header>
        <h2 class="text-2xl">
          {{ player.first_name }} {{ player.second_name }}
        </h2>
      </template>
      <ul>
        <li v-for="(stat, key) in player" :key="key">{{ key }}: {{ stat }}</li>
      </ul>

      <template #footer />
    </UCard>
  </UContainer>
</template>
