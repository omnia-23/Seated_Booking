import { Router } from "express";
import {
  addTrips,
  deleteTrips,
  getTrips,
  searchTrips,
  updateTrips,
} from "../middlewares/trips.middleware.js";

const tripsRouter = Router();

tripsRouter
  .get("/", getTrips)
  .post("/search", searchTrips)
  .post("/", addTrips)
  .put("/:id", updateTrips)
  .delete("/:id", deleteTrips);

export default tripsRouter;
