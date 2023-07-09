import { player } from "../../models";

export default defineEventHandler(async (event) => {
  console.log("GET /api/test/");

  try {
    const result = await player.aggregate([
      {
        $lookup: {
          from: "teams",
          localField: "team",
          foreignField: "_id",
          as: "team_info",
        },
      },
    ]);

    return result;
  } catch (error) {
    console.dir(error);
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Error while retrieving player",
    };
  }
});
