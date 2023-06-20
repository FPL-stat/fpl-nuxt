<template>
  <div>
    <NavBar />
    <NuxtPage />
  </div>
</template>

<script setup>
const route = useRoute()

console.log(route.name)

</script>