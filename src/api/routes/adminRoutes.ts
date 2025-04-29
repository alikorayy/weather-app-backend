import { Router } from "express";
import { authenticateJwt } from "../../middleware/authMiddleware";
import { authorizeAdmin } from "../../middleware/adminMiddleware";
import * as adminController from "../controllers/adminController";

const router = Router();

// Example: Admin creates a new user
router.post("/create-user", authenticateJwt, authorizeAdmin, adminController.createUserHandler);

export default router;