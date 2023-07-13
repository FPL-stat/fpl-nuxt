import { defineStore } from "pinia";
import { IAppData, IPlayer } from "~/types";

export const useStatsStore = defineStore("stats", () => {
  const data = ref<IAppData | null>();

  const getData = computed(() => data.value);

  const getPlayers = computed(() => {
    if (data.value) {
      const players = data.value.data.elements;
      const teams = data.value.data.teams;
      const playerTypes = data.value.data.element_types

      return players.map((player) => {
        const team = teams.find(
          (team) => team.id === player.team
        )!;
        const player_type = playerTypes.find(
          (type) => type.id === player.element_type
        )!;
        return {
          ...player,
          team: { name: team.name, short_name: team.short_name },
          player_type: {
            name: player_type.singular_name,
            short_name: player_type.singular_name_short,
          },
        };
      });
    } else {
      return null;
    }
  });

  const getPlayerByCode = computed(() => {
    return (code: string) => {
      if (data.value) {
        const players = data.value.data.elements;
        const teams = data.value.data.teams;
        const playerTypes = data.value.data.element_types;

        const player = players.find((player) => player.code == parseInt(code));
        if (!player) return null;

        const team = teams.find((team) => team.id === player.team)!;
        const player_type = playerTypes.find(
          (type) => type.id === player.element_type
        )!;
        return {
          ...player,
          team: { name: team.name, short_name: team.short_name },
          player_type: {
            name: player_type.singular_name,
            short_name: player_type.singular_name_short,
          },
        };
      } else {
        return null;
      }
    };
  });

  const getTeams = computed(() => {
    return data.value?.data.teams;
  });

  async function fetchData() {
    data.value = await $fetch<IAppData>("/api/store");
  }

  return { data, fetchData, getData, getPlayers, getPlayerByCode, getTeams };
});
