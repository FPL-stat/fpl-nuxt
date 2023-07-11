import { defineStore } from "pinia";
import { IAppData } from "~/types";

export const useStatsStore = defineStore("stats", () => {
  const data = ref<IAppData | null>();

  const getData = computed(() => data.value);

  const getPlayers = computed(() => {
    return data.value?.data.elements.map((player) => {
      const team = data.value?.data.teams.find(
        (team) => team.id === player.team
      );
      const player_type = data.value?.data.element_types.find(
        (type) => type.id === player.element_type
      );
      return {
        ...player,
        team: { name: team?.name, short_name: team?.short_name },
        player_type: { name: player_type?.singular_name, short_name: player_type?.singular_name_short },
      };
    });
  });

  const getTeams = computed(() => {
    return data.value?.data.teams;
  });

  async function fetchData() {
    data.value = await $fetch<IAppData>("/api/store");
  }

  return { data, fetchData, getData, getPlayers, getTeams };
});
