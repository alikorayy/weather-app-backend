import { RequestHandler, NextFunction } from "express";
import responseHandler from "../utils/responseHandler";
import appConstants from "../constants/appConstants";

export const authorizeAdmin: RequestHandler = (
  req,
  res,
  next: NextFunction
) => {
  if (!req.user) {
    return responseHandler.PREPARE_ERROR_HANDLER(
      res,
      appConstants.RESPONSE_STATUS.UNAUTHORIZED,
      appConstants.ERRORS.LOGIN_FIRST
    );
  }
  const userRole = req.user.role;
  if (userRole !== "ADMIN") {
    return responseHandler.PREPARE_ERROR_HANDLER(
      res,
      appConstants.RESPONSE_STATUS.FORBIDDEN,
      appConstants.ERRORS.ADMIN_ONLY
    );
  }
  next();

};
