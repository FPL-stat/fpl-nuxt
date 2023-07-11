// import { cachedPlayers } from "../utils/getPlayers"
import { cachedData } from "../utils/getAllData"

export default defineEventHandler(async (event) => {
  const data = await cachedData().catch(() => 0) 
  return data
})
