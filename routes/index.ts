import { weatherController } from "../controllers/weatherController";
import { weatherQueryValidations } from "../validators/weatherQueryValidations";
import express from "express";

const router = express.Router();

router.get("/", weatherQueryValidations, weatherController);

export default router;
