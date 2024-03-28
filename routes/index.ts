import { getWeather } from "../controllers/indexController";
import express from "express";

const router = express.Router();

/* POST weather data. */
router.get("/", getWeather);

module.exports = router;
