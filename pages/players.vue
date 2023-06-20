<script setup lang='ts'>

interface ITeam {
  code: number,
  draw: number,
  form: string,
  loss: number,
  name: string,
  played: number,
  points: number,
  position: number,
  pulse_id: number,
  short_name: string,
  strength: number,
  strength_attack_away: number,
  strength_attack_home: number,
  strength_defence_away: number,
  strength_defence_home: number,
  strength_overall_away: number,
  strength_overall_home: number,
  team_division: string,
  unavailable: boolean,
  updated_time: {
    $date: Date
  },
  win: number,
}

const teams = ref<ITeam[]>([])
const { data, pending, error, refresh } = await useFetch<ITeam[]>('/api/teams')

const tableFilter = ref('')
const page = ref(1)
const pageCount = 5

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'short_name', label: 'Symbol' },
  { key: 'strength', label: 'Strength', sortable: true },
  { key: 'played', label: 'Played' },
  { key: 'win', label: 'Wins', sortable: true },
  { key: 'draw', label: 'Draws', sortable: true },
  { key: 'loss', label: 'Losses', sortable: true },
]


const filteredRows = computed(() => {
  if (!tableFilter.value) {
    return teams.value
  }
  return teams.value.filter((team) => {
    return Object.values(team).some((value) => {
      return String(value).toLowerCase().includes(tableFilter.value.toLowerCase())
    })
  })
})

const rows = computed(() => {
  // return teams.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
  return filteredRows.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

onMounted(() => {
  // console.log('data: ', data.value)
  if (data.value) {
    teams.value = data.value
  }
  // console.log('teams: ', teams.value)
})
</script>

<template>
  <section class='p-8'>

    <div class='w-60'>
      <UInput v-model='tableFilter' placeholder='search...' icon="i-heroicons-magnifying-glass-20-solid" />
    </div>

    <UTable :columns='columns' :rows='rows' />

    <UPagination v-show='tableFilter.length === 0' v-model="page" :page-count="pageCount" :total="teams.length" />

  </section>
</template>
