import mongoose from "mongoose";

const vehiclesSchema = mongoose.Schema({
  Organization_ID: {
    type: Number,
    required: true,
  },
  Organization_Name: {
    type: String,
    required: true,
  },
  Vehicle_ID: {
    type: Number,
    required: true,
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
    type: [{ type: String }],
    required: true,
  },
  Vehicle_Class: {
    type: [{ type: String }],
    required: true,
  },
  Active_Vehicle: {
    type: Boolean,
    default: false,
  },
});

export const vehiclesModel = mongoose.model("Vehicles", vehiclesSchema);
