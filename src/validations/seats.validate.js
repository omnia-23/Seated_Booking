import Joi from "joi";
import mongoose from "mongoose";

const isObjectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("must be mongoDb Id invalid");
  }
  return value;
};

export const addSeatSchema = Joi.object({
  Vehicle_ID: Joi.string().custom(isObjectId, "ObjectId validation").required(),
  Seat_Number: Joi.string().required(),
  Seat_description: Joi.string().optional(),
  Seat_Price: Joi.number().required(),
  Active_Seat: Joi.boolean(),
});

export const updateSeatSchema = Joi.object({
  Vehicle_ID: Joi.string().custom(isObjectId, "ObjectId validation"),
  Seat_Number: Joi.string(),
  Seat_description: Joi.string(),
  Seat_Price: Joi.number(),
  Active_Seat: Joi.boolean(),
});
