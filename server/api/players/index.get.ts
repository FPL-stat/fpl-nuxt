import { player } from "../../models";

export default defineEventHandler(async (event) => {
  console.log("GET /api/player")
  try {
    return await player.find()
    
  } catch (error) {
    console.dir(error)
    event.node.res.statusCode = 500
    return {
      code: "ERROR",
      message: "Error while retrieving players"
    }
  }
})