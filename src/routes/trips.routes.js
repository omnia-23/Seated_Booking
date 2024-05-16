import { Router } from "express";
import {
  addTrips,
  deleteTrips,
  getTrip,
  getTrips,
  searchTrips,
  updateTrips,
} from "../middlewares/trips.middleware.js";
import { Validation } from "../utils/validation.js";
import {
  addTripSchema,
  updateTripSchema,
} from "../validations/trip.validation.js";

const tripsRouter = Router();

tripsRouter
  .get("/", getTrips)
  .get("/:id", getTrip)
  .post("/search", searchTrips)
  .post("/", Validation(addTripSchema), addTrips)
  .put("/:id", Validation(updateTripSchema), updateTrips)
  .delete("/:id", deleteTrips);

export default tripsRouter;
