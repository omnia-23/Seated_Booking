import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
  User_ID: {
    type: Number,
    required: true,
  },
  Username: {
    type: String,
    required: true,
  },
  Booking_ID: {
    type: Number,
    required: true,
    unique: true,
  },
  PNR: {
    type: Number,
    unique: true,
    required: true,
  },
  Seat_Number: {
    type: Number,
    unique: true,
    required: true,
  },
  Seat_Price: {
    type: mongoose.Decimal128,
    required: true,
  },
  Passenger_Name: {
    type: String,
    required: true,
  },
  Passenger_Mobile_Number: {
    type: String,
    required: true,
  },
  Passenger_National_ID: {
    type: Number,
    required: true,
  },
  Trip_ID: {
    type: Number,
    required: true,
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
  Vehicle_ID: {
    type: Number,
    required: true,
  },
  Vehicle_Name: {
    type: String,
    required: true,
  },
  //* ask about Array type
  Vehicle_Class: {
    type: [String],
    required: true,
  },
  //*  ask about Array type
  Vehicle_Type: {
    type: [String],
    required: true,
  },
  Trip_Notes: {
    type: String,
    required: true,
  },
});

export const ticketModel = mongoose.model("Ticket", ticketSchema);
