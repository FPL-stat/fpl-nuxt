import { defineStore } from "pinia";
import { IAppData } from "~/types";


export const useStatsStore = defineStore('stats', () => {
  const data = ref<IAppData|null>()
  
  const getData = computed(() => data.value)

  const getPlayers = computed(() => {
    return data.value?.data.elements.map(player => {
      const team = data.value?.data.teams.find(team => team.id === player.team)
      return { ...player, team: {name: team?.name, short_name: team?.short_name} }
    })
  })

  async function fetchData() {
    data.value = await $fetch<IAppData>('/api/store')
  }

  return { data, fetchData, getData, getPlayers }
})
