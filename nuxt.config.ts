// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxthq/ui', '@pinia/nuxt'],
  nitro: {
    plugins: ['~/server/mongo-atlas.ts']
  },
  runtimeConfig: {
    mongoUrl: process.env.MONGO_URL,
  },
})
