<template>
  <div>
    <!-- <NavBar /> -->
    <Header />
    <NuxtLoadingIndicator />

    <SideBar class="hidden sm:flex" />
    <main class="sm:ml-56 mt-12">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
const route = useRoute();

console.log(route.name);
</script>
