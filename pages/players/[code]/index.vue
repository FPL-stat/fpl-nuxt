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
  if (data.value) player.value = data.value
})
</script>

<template>
  <UContainer class="py-4">
    <UCard>
      <template #header>
        <div v-if="!player" class="flex items-center space-x-4">
          <USkeleton class="h-12 w-12 rounded-full" />
          <div class="space-y-2">
            <USkeleton class="h-4 w-[250px]" />
            <USkeleton class="h-4 w-[200px]" />
          </div>
        </div>
        <h2 v-if="player" class="text-2xl">
          {{ player.first_name }} {{ player.second_name }}
        </h2>
      </template>
      <div v-if="!player" class="space-y-2">
            <USkeleton class="h-4 w-[250px]" />
            <USkeleton class="h-4 w-[250px]" />
            <USkeleton class="h-4 w-[250px]" />
            <USkeleton class="h-4 w-[250px]" />
            <USkeleton class="h-4 w-[250px]" />
          </div>

      <ul>
        <li v-for="(stat, key) in player" :key="key">{{ key }}: {{ stat }}</li>
      </ul>

      <template #footer />
    </UCard>
  </UContainer>
</template>
