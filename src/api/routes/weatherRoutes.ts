import { Router } from "express";
import { authenticateJwt } from "../../middleware/authMiddleware";
 import { searchWeatherHandler } from "../controllers/weatherController";

const router = Router();

router.post("/search", authenticateJwt, searchWeatherHandler);

export default router;