export const cachedData = cachedFunction(
  async () => {
    try {
      const data = await $fetch(
        `https://fantasy.premierleague.com/api/bootstrap-static/`
      );
      const updated = new Date();
      return { updated, data };
    } catch (error) {
      throw new Error("Failed to fetch bootstrap-static");
    }
  },
  {
    maxAge: 12 * 60 * 60,
    swr: false,
    name: "allData",
    group: "appData",
  }
);
