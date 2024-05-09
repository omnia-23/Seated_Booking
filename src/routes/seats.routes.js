import { Router } from "express";
import { Validation } from "../utils/validation.js";
import {
  addSeats,
  deleteSeats,
  getSeats,
  updateSeats,
} from "../middlewares/seats.middleware.js";
import {
  addSeatSchema,
  updateSeatSchema,
} from "../validations/seats.validate.js";

const seatsRouter = Router();

seatsRouter
  .get("/", getSeats)
  .post("/", Validation(addSeatSchema), addSeats)
  .put("/:id", Validation(updateSeatSchema), updateSeats)
  .delete("/:id", deleteSeats);

export default seatsRouter;
