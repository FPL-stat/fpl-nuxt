import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    "code": Number,
    "draw": Number,
    "form": String,
    "loss": Number,
    "name": String,
    "played": Number,
    "points": Number,
    "position": Number,
    "pulse_id": Number,
    "short_name": String,
    "strength": Number,
    "strength_attack_away": Number,
    "strength_attack_home": Number,
    "strength_defence_away": Number,
    "strength_defence_home": Number,
    "strength_overall_away": Number,
    "strength_overall_home": Number,
    "team_division": String,
    "unavailable": Boolean,
    "updated_time": {
      "$date": Date
    },
    "win": Number,
  },
  {
    timestamps: true,
    strict: true,
    // strictQuery: true,
  }
)

export default mongoose.model("Team", schema, "teams");
