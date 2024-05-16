import Joi from "joi";
import mongoose from "mongoose";

const isObjectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("must be mongoDb Id invalid");
  }
  return value;
};

export const addTripSchema = Joi.object({
  Boarding_Station: Joi.string()
    .custom(isObjectId, "ObjectId validation")
    .required(),
  Destination_Station: Joi.string()
    .custom(isObjectId, "ObjectId validation")
    .required(),
  Trip_Start_Date: Joi.string().required(),
  Trip_End_Date: Joi.string().required(),
  Vehicle_ID: Joi.string().custom(isObjectId, "ObjectId validation").required(),
  Seat_Price: Joi.number().required(),
  Trip_Notes: Joi.string().required(),
});

export const updateTripSchema = Joi.object({
  Boarding_Station: Joi.string().custom(isObjectId, "ObjectId validation"),
  Destination_Station: Joi.string().custom(isObjectId, "ObjectId validation"),
  Trip_Start_Date: Joi.string(),
  Trip_End_Date: Joi.string(),
  Vehicle_ID: Joi.string().custom(isObjectId, "ObjectId validation"),
  Seat_Price: Joi.number(),
  Trip_Notes: Joi.string(),
});
