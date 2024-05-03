import { AppError } from "./errorHandler.js";

export const Validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });
    if (error) throw new AppError(error, 400);
    next();
  };
};
