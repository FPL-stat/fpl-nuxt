<script setup lang='ts'>
import type { IPlayer } from '../types'

const { data, pending, error, refresh } = await useLazyFetch<IPlayer[]>('/api/players', { server: false })

const players = ref<IPlayer[]>([])
const tableFilter = ref('')
const page = ref(1)
const pageCount = 9

const columns = [
  { key: 'second_name', label: 'Second Name', sortable: true },
  { key: 'first_name', label: 'First Name', sortable: true },
  { key: 'total_points', label: 'Total Points', sortable: true },
  { key: 'starts', label: 'Starts', sortable: true },
  { key: 'value_season', label: 'Value (Season)', sortable: true },
  { key: 'selected_by_percent', label: 'Selected By (%)', sortable: true },
]

const filteredRows = computed(() => {
  if (!tableFilter.value) {
    return players.value
  }
  return players.value.filter((player) => {
    return Object.values(player).some((value) => {
      return String(value).toLowerCase().includes(tableFilter.value.toLowerCase())
    })
  })
})

const rows = computed(() => {
  // return teams.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
  return filteredRows.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

watch(data, newData => {
  if (newData) players.value = newData
})

onMounted(() => {
  if (data.value) {
    players.value = data.value
  }
})

</script>

<template>
  <section class='p-8'>
  
    <div class='w-60'>
      <UInput v-model='tableFilter' placeholder='search...' icon="i-heroicons-magnifying-glass-20-solid" />
    </div>

    <UTable class='overflow-auto' :loading='pending' :columns='columns' :rows='rows' />

    <UPagination v-show='tableFilter.length === 0' v-model="page" :page-count="pageCount" :total="players.length" />


  </section>
</template>
