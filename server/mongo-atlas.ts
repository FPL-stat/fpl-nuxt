import mongoose from 'mongoose'

const config = useRuntimeConfig()

export default async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(config.mongoUrl)
    console.log('Connected to MongoDB Atlas successfully')
  } catch (error) {
    return createError({ statusCode: 500, statusMessage: `Something went wrong - ${error}` })
  }
}