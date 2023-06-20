import { team } from "../../models"

export default defineEventHandler(async (event) => {
  console.log("GET /api/teams")

  try {
    console.log('Find all teams')
    const teamList = await team.find()
    return teamList
  } catch (error) {
    console.dir(error)
    event.node.res.statusCode = 500
    return {
      code: "ERROR",
      message: "Error while retrieving teams"
    }
  }
})