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
      {
        $unset: [
          "team",
          "team_code",
          "team_info.draw",
          "team_info.form",
          "team_info.loss",
          "team_info.played",
          "team_info.points",
          "team_info.position",
          "team_info.pulse_id",
          "team_info.strength",
          "team_info.strength_attack_away",
          "team_info.strength_attack_home",
          "team_info.strength_defence_away",
          "team_info.strength_defence_home",
          "team_info.strength_overall_away",
          "team_info.strength_overall_home",
          "team_info.team_division",
          "team_info.unavailable",
          "team_info.updated_time",
          "team_info.win",
        ],
      },
      // {
      //   $project: {
      //     second_name: 1,
      //     first_name: 1,
      //     element_type: 1,
      //     team_name: '$team_info.name',
      //   },
      // }
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
