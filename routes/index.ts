import { getWeather } from "../controllers/indexController";
import express from "express";

const router = express.Router();

router.get("/", getWeather);

export default router;
