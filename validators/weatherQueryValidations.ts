import { check, validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";

export const weatherQueryValidations = [
  check("lat")
    .notEmpty()
    .withMessage("Latitude must not be empty.")
    .bail()
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be a valid number between -90 and 90."),
  check("lon")
    .notEmpty()
    .withMessage("Longitude must not be empty.")
    .bail()
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be a valid number between -180 and 180."),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({
        errors: errors.array().map(error => error.msg),
      });
    next();
  },
];
