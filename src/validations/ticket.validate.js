import Joi from "joi";
import mongoose from "mongoose";

const isObjectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("must be mongoDb Id invalid");
  }
  return value;
};

export const addTicketSchema = Joi.object({
  PNR: Joi.number().required(),
  Trip_ID: Joi.string().custom(isObjectId, "ObjectId validation").required(),
  Seats_Count: Joi.number().required(),
  Passenger_Name: Joi.string().min(1).required(),
  Passenger_Mobile_Number: Joi.string().required(),
  Passenger_National_ID: Joi.number().required(),
  Trip_Notes: Joi.string(),
});

export const updateTicketSchema = Joi.object({
  PNR: Joi.number(),
  Trip_ID: Joi.string().custom(isObjectId, "ObjectId validation"),
  Seats_Count: Joi.number(),
  Passenger_Name: Joi.string().min(1),
  Passenger_Mobile_Number: Joi.string(),
  Passenger_National_ID: Joi.number(),
  Organization_ID: Joi.string().custom(isObjectId, "ObjectId validation"),
  Trip_Notes: Joi.string(),
});
