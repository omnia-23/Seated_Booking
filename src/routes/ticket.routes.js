import { Router } from "express";
import { Validation } from "../utils/validation.js";

import {
  addTicket,
  deleteTicket,
  getTicket,
  getTickets,
  updateTicket,
} from "../middlewares/ticket.middleware.js";
import { addTicketSchema, updateTicketSchema } from "../validations/ticket.validate.js";

const seatsRouter = Router();

seatsRouter
  .get("/", getTickets)
  .get("/:id", getTicket)
  .post("/", Validation(addTicketSchema), addTicket)
  .put("/:id", Validation(updateTicketSchema), updateTicket)
  .delete("/:id", deleteTicket);

export default seatsRouter;
