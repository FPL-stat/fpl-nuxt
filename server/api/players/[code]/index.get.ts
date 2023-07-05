import { player } from "../../../models";

export default defineEventHandler(async (event) => {
  console.log("GET /api/players/[code]")
  const playerCode = event.context.params.code
  console.log('player code: ', playerCode)
  try {
    return await player.findOne({ code: playerCode })
    
  } catch (error) {
    console.dir(error)
    event.node.res.statusCode = 500
    return {
      code: "ERROR",
      message: "Error while retrieving player"
    }
  }
})
