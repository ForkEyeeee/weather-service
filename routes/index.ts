import { weatherController } from "../controllers/weatherController";
import express from "express";

const router = express.Router();

router.get("/", weatherController);

export default router;
