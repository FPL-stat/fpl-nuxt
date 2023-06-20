import mongoose from 'mongoose'

const playerSchema = new mongoose.Schema(
	{
		code: Number,
		element_type: Number,
		first_name: String,
		second_name: String,
		squad_number: Number,
		team: Number,
		team_code: Number,
		web_name: String,
	},
	{ timestamps: true, strict: true }
)

export default mongoose.model('Player', playerSchema, "elements")
