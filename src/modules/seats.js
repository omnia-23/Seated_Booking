import mongoose from "mongoose";

const seatsSchema = mongoose.Schema({
  Vehicle_ID: {
    type: Number,
    required: true,
  },
  Vehicle_Name: {
    type: String,
    required: true,
  },
  Seat_Number: {
    type: String,
    required: true,
    unique: true,
  },
  Seat_description: {
    type: String,
    required: true,
  },
  Seat_Price: {
    type: mongoose.Decimal128,
    required: true,
  },
  Active_Seat: {
    type: Boolean,
    default: false,
  },
});

export const seatsModel = mongoose.model("Seats", seatsSchema);
