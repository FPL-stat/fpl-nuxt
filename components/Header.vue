<script setup lang="ts">
import { CubeTransparentIcon } from "@heroicons/vue/24/outline";
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

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
    class="z-50 fixed top-0 flex flex-col w-full py-2 px-8 dark:bg-gray-900/30 bg-white/30 border-b border-gray-200 dark:border-gray-800 backdrop-blur-md"
  >
    <div class="flex justify-between gap-2 sm:justify-start items-center">
      <div class="flex items-center">
        <CubeTransparentIcon class="text-primary-500 h-6 w-6" />
      </div>
      <h2 class="text-2xl font-semibold">FPL-Stat</h2>
      <div class="flex grow justify-end gap-2">
        <ClientOnly>
          <UButton
            :icon="
              isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
            "
            color="gray"
            variant="ghost"
            aria-label="theme"
            @click="isDark = !isDark"
          />
          <template #fallback>
            <div class="w-8 h-8" />
          </template>
        </ClientOnly>

        <UButton
          class="sm:hidden"
          @click="toggleSlideOver"
          icon="i-heroicons-bars-3"
          size="sm"
          color="gray"
          variant="ghost"
          square
        />
      </div>
    </div>

    <UVerticalNavigation
      v-if="isOpen"
      class="mt-4"
      @click="toggleSlideOver"
      :links="links"
    />
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
