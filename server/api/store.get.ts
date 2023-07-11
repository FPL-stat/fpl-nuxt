import { cachedPlayers } from "../utils/getPlayers"

export default defineEventHandler(async (event) => {
  const data = await cachedPlayers().catch(() => 0) 
  return data
})
