import mongoose from "mongoose";

const tripSchema = mongoose.Schema({
  Trip_ID: {
    type: Number,
    required: true,
    unique: true,
  },
  Boarding_Governorate_ID: {
    type: Number,
    required: true,
  },
  Boarding_Governorate_Name: {
    type: String,
    required: true,
  },
  Boarding_City_ID: {
    type: Number,
    required: true,
  },
  Boarding_City_Name: {
    type: String,
    required: true,
  },
  Boarding_Station_ID: {
    type: Number,
    required: true,
  },
  Boarding_Station_Name: {
    type: String,
    required: true,
  },
  Destination_Governorate_ID: {
    type: Number,
    required: true,
  },
  Destination_Governorate_Name: {
    type: String,
    required: true,
  },
  Destination_City_ID: {
    type: Number,
    required: true,
  },
  Destination_City_Name: {
    type: String,
    required: true,
  },
  Destination_Station_ID: {
    type: Number,
    required: true,
  },
  Destination_Station_Name: {
    type: String,
    required: true,
  },
  Organization_ID: {
    type: Number,
    required: true,
  },
  Organization_Name: {
    type: String,
    required: true,
  },
  Trip_Start_Date: {
    type: Date,
    required: true,
  },
  Trip_End_Date: {
    type: Date,
    required: true,
  },
  Vehicle_ID: {
    type: Number,
    required: true,
  },
  Vehicle_Name: {
    type: String,
    required: true,
  },
  Vehicle_Class: {
    type: String,
    required: true,
  },
  Vehicle_Type: {
    type: String,
    required: true,
  },
  Seat_Price: {
    type: mongoose.Decimal128,
    required: true,
  },
  Trip_Notes: {
    type: String,
    required: true,
  },
});

export const tripsModel = mongoose.model("Trips", tripSchema);
