<script setup lang="ts">
  
  const { data: resData } = await useFetch('/api/store')
  
  </script>

<template>
  <ClientOnly>
    <div>Get Data: {{ resData?.updated }}</div>
    <div>Time now: {{ new Date().toLocaleString() }}</div>
  </ClientOnly>
</template>
