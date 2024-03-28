import { getWeather } from "../controllers/indexController";
import express from "express";

const router = express.Router();

/* GET home page. */
router.get("/", getWeather);

module.exports = router;
