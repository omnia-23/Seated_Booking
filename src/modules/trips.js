import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";
const AutoIncrement = mongooseSequence(mongoose);

const tripSchema = mongoose.Schema({
  Trip_ID: {
    type: Number,
    unique: true,
  },
  Boarding_Station: {
    type: mongoose.Types.ObjectId,
    ref: "Stations",
    required: true,
  },
  Destination_Station: {
    type: mongoose.Types.ObjectId,
    ref: "Stations",
    required: true,
  },
  Organization_ID: {
    type: mongoose.Types.ObjectId,
    ref: "Organizations",
    required: true,
  },
  Trip_Start_Date: {
    type: String,
    required: true,
  },
  Trip_End_Date: {
    type: String,
    required: true,
  },
  Vehicle_ID: {
    type: mongoose.Types.ObjectId,
    ref: "Vehicles",
    required: true,
  },
  Trip_Notes: {
    type: String,
    required: true,
  },
});

tripSchema.plugin(AutoIncrement, { inc_field: "Trip_ID" });

export const tripsModel = mongoose.model("Trips", tripSchema);
