import Joi from "joi";

export const addVehiclesSchema = Joi.object({
  Vehicle_Name: Joi.string().required(),
  Vehicle_Description: Joi.string().required(),
  Vehicle_Type: Joi.string().required(),
  Vehicle_Class: Joi.string().required(),
  Active_Vehicle: Joi.boolean().optional(),
});

export const updateVehiclesSchema = Joi.object({
  Vehicle_Name: Joi.string().optional(),
  Vehicle_Description: Joi.string().optional(),
  Vehicle_Type: Joi.string().optional(),
  Vehicle_Class: Joi.string().optional(),
  Active_Vehicle: Joi.boolean().optional(),
});
