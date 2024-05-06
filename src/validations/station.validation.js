import Joi from "joi";

export const addStationsSchema = Joi.object({
  Governorate_Name: Joi.string().required(),
  City_Name: Joi.string().required(),
  Station_Name: Joi.string().required(),
  Station_Location: Joi.object({
    long: Joi.string().required(),
    lat: Joi.string().required(),
  }),
  Active_Station: Joi.boolean().optional(),
});

export const updateStationsSchema = Joi.object({
  Governorate_Name: Joi.string().optional(),
  City_Name: Joi.string().optional(),
  Station_Name: Joi.string().optional(),
  Station_Location: Joi.object({
    long: Joi.string().optional(),
    lat: Joi.string().optional(),
  }),
  Active_Station: Joi.boolean().optional(),
});
