import { player } from "../../models";

export default defineEventHandler(async (event) => {
  console.log("GET /api/dashboard");
  try {
    const highest_points = await player
      .find()
      .sort({ total_points: -1 })
      .limit(5)
      .select("code second_name total_points");
    
    const expected_goals_90 = await player
      .find()
    .sort({ expected_goals_per_90: -1})
    .limit(5)
    .select('code second_name expected_goals_per_90')

    const expected_assists_90 = await player
      .find()
      .sort({ expected_assists_per_90: -1 })
      .limit(5)
      .select('code second_name expected_assists_per_90')

    return {
      highest_points,
      expected_goals_90,
      expected_assists_90
    };
  } catch (error) {
    console.dir(error);
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Error while retrieving player",
    };
  }
});
