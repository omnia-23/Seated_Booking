import { Router } from "express";
import {
  addVehicles,
  deleteVehicles,
  getVehicle,
  getVehicles,
  updateVehicles,
} from "../middlewares/vehicles.middleware.js";
import { Validation } from "../utils/validation.js";
import {
  addVehiclesSchema,
  updateVehiclesSchema,
} from "../validations/vehicles.validation.js";

const vehiclesRouter = Router();

vehiclesRouter
  .get("/", getVehicles)
  .get("/:id",getVehicle)
  .post("/", Validation(addVehiclesSchema), addVehicles)
  .put("/:id", Validation(updateVehiclesSchema), updateVehicles)
  .delete("/:id", deleteVehicles);

export default vehiclesRouter;
