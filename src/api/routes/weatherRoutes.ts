import { Router } from "express";
import { authenticateJwt } from "../../middleware/authMiddleware";
import { searchWeatherHandler, getUserWeatherQueriesHandler, getAllWeatherQueriesHandler} from "../controllers/weatherController";
import { authorizeAdmin } from "../../middleware/adminMiddleware";
import { weatherSearchRateLimiter } from "../../middleware/rateLimitMiddeware";

const router = Router();

router.get("/user/my-queries", authenticateJwt, getUserWeatherQueriesHandler);
router.get("/admin/all-queries", authenticateJwt, authorizeAdmin, getAllWeatherQueriesHandler);
router.post("/search", authenticateJwt, weatherSearchRateLimiter, searchWeatherHandler);

export default router;