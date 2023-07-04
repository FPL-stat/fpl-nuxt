<script setup lang="ts">
import { CubeTransparentIcon } from "@heroicons/vue/24/outline";
const isOpen = ref(false);

function toggleSlideOver() {
  isOpen.value = !isOpen.value;
}
const links = [
  {
    label: "Dashboard",
    to: "/",
  },
  {
    label: "Players",
    to: "/players",
  },
  {
    label: "Teams",
    to: "/teams",
  },
  {
    label: "Fixtures",
    to: "/fixtures",
  },
];
</script>

<template>
  <div
    class="z-50 fixed top-0 flex flex-col w-full py-2 px-8 dark:bg-gray-900/30 bg-white/30 border-b border-gray-700 backdrop-blur-md"
  >
    <!-- <div><UIcon name="i-heroicons-cube-transparent" /></div> -->
    <div class="flex justify-between gap-2 sm:justify-start items-center">
      <div class="flex items-center">
        <CubeTransparentIcon class="h-6 w-6" />
      </div>
      <h2 class="text-2xl font-semibold">FPL-Stat</h2>
      <div class="sm:hidden">
        <UButton
          @click="toggleSlideOver"
          icon="i-heroicons-bars-3"
          size="sm"
          color="gray"
          variant="ghost"
          square
        />
      </div>
    </div>

  <div><UVerticalNavigation v-if="isOpen" @click="toggleSlideOver" :links="links" /></div>
  </div>
  <!-- <USlideover -->
  <!--   v-model="isOpen" -->
  <!--   @close="toggleSlideOver" -->
  <!--   side="right" -->
  <!--   :overlay=false -->
  <!--   :ui="{ wrapper: 'fixed inset-0 flex z-49' }" -->
  <!-- > -->
  <!-- </USlideover> -->
</template>
