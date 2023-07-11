import { player } from "../models";

export const cachedPlayers = cachedFunction(
  async () => {
    try {
      const data = await player.find();
      const updated = new Date().toISOString()
      return { updated, data };
    } catch (error) {
      console.dir(error);
      event.node.res.statusCode = 500;
      return {
        code: "ERROR",
        message: "Error while retrieving players",
      };
    }
  },
  {
    maxAge: 5 * 60,
    name: "players",
  }
);
