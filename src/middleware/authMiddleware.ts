import { RequestHandler, NextFunction } from "express";
import jwt from "jsonwebtoken";
import appConstants from "../constants/appConstants";
import responseHandler from "../utils/responseHandler";
import { JwtPayload } from "../api/interfaces/auth.interface";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

// Extend Express Request type to include user
declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload;
  }
}

export const authenticateJwt: RequestHandler = (
  req,
  res,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("No token provided in authorization header");
      return responseHandler.PREPARE_ERROR_HANDLER(
        res,
        appConstants.RESPONSE_STATUS.UNAUTHORIZED,
        appConstants.ERRORS.UNAUTHORIZED
      );
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    if (error instanceof jwt.TokenExpiredError) {
      return responseHandler.PREPARE_ERROR_HANDLER(
        res,
        appConstants.RESPONSE_STATUS.UNAUTHORIZED,
        appConstants.ERRORS.TOKEN_EXPIRED
      );
    }
    return responseHandler.PREPARE_ERROR_HANDLER(
      res,
      appConstants.RESPONSE_STATUS.FORBIDDEN,
      appConstants.ERRORS.UNAUTHORIZED
    );
  }
};
