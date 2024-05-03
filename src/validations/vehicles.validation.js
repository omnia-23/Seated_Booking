import Joi from "joi";

export const addVehiclesSchema = Joi.object({
  Organization_ID: Joi.number().required(),
  Organization_Name: Joi.string().required(),
  Vehicle_ID: Joi.number().required(),
  Vehicle_Name: Joi.string().required(),
  Vehicle_Description: Joi.string().required(),
  Vehicle_Type: Joi.array().items(Joi.string()).required(),
  Vehicle_Class: Joi.array().items(Joi.string()).required(),
  Active_Vehicle: Joi.boolean().optional(),
});

export const updateVehiclesSchema = Joi.object({
  Organization_ID: Joi.number().optional(),
  Organization_Name: Joi.string().optional(),
  Vehicle_ID: Joi.number().optional(),
  Vehicle_Name: Joi.string().optional(),
  Vehicle_Description: Joi.string().optional(),
  Vehicle_Type: Joi.array().items(Joi.string()).optional(),
  Vehicle_Class: Joi.array().items(Joi.string()).optional(),
  Active_Vehicle: Joi.boolean().optional(),
});
