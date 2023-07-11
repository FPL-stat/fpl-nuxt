<script setup lang="ts">
  const { data: resData } = await useFetch('/api/store')


</script>

<template>
  <div>
    <div>Get Data: {{ resData }}</div>
  </div>
</template>
