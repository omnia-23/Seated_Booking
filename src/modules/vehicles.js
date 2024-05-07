import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";
const AutoIncrement = mongooseSequence(mongoose);

const vehiclesSchema = mongoose.Schema({
  Organization_ID: {
    type: mongoose.Types.ObjectId,
    ref: "Organizations",
    // required: true,
  },
  Vehicle_ID: {
    type: Number,
    unique: true,
  },
  Vehicle_Name: {
    type: String,
    required: true,
  },
  Vehicle_Description: {
    type: String,
    required: true,
  },
  Vehicle_Type: {
    type: String,
    required: true,
  },
  Vehicle_Class: {
    type: String,
    required: true,
  },
  Active_Vehicle: {
    type: Boolean,
    default: true,
  },
});

vehiclesSchema.plugin(AutoIncrement, { inc_field: "Vehicle_ID" });

export const vehiclesModel = mongoose.model("Vehicles", vehiclesSchema);
