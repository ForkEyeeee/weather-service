import { getWeather } from "../controllers/indexController";
import express from "express";

const router = express.Router();

router.get("/", getWeather);

module.exports = router;
