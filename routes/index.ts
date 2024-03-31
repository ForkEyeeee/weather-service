import { indexRouteHandler } from "../controllers/indexController";
import express from "express";

const router = express.Router();

router.get("/", indexRouteHandler);

export default router;
