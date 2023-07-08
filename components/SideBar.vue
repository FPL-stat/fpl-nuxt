<script setup lang="ts">
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
    class="fixed top-0 mt-12 pt-4 pb-10 px-8 flex flex-col justify-between shadow-lg overflow-auto dark:bg-gray-900/30 h-screen w-40"
  >
    <UVerticalNavigation
      :links="links"
      :ui="{
        wrapper: 'border-s border-gray-200 dark:border-gray-800 space-y-2',
        base: 'group block border-s -ms-px lg:leading-6',
        padding: 'ps-4 py-2',
        rounded: '',
        font: '',
        ring: '',
        active:
          'text-primary-500 dark:text-primary-400 border-current font-semibold',
        inactive:
          'border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300',
      }"
    />

  
  </div>
</template>
