<script setup>
</script>

<template>
  <div>
    <!-- <NavBar /> -->
    <Header />
    <NuxtLoadingIndicator />

    <SideBar class="hidden sm:flex" />
    <main class="sm:ml-40 mt-12">
      <NuxtPage />
    </main>
  </div>
</template>

<style>

</style>
