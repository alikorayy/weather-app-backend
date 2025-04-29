import { RequestHandler } from "express";
import appConstants from "../../constants/appConstants";
import { loginSchema, registerSchema } from "../../validators/zodValidators";
import { zodErrorFormatter } from "../../utils/zodUtils";
import responseHandler from "../../utils/responseHandler";
import * as authService from "../services/authService";

export const register : RequestHandler = async (req, res) => {
    try {
        console.log("Registering new user...");
        const parsed = registerSchema.safeParse(req.body);
        if (!parsed.success) {
            const formattedErrors = zodErrorFormatter(parsed);
            return responseHandler.PREPARE_ERROR_HANDLER(
              res,
              appConstants.RESPONSE_STATUS.BAD_REQUEST,
              formattedErrors
            );
        }

        const { email, password } = parsed.data;
        const newUser = await authService.registerUser(email, password);
        responseHandler.FORMATTED_RESPONSE_HANDLER(
          res,
          appConstants.RESPONSE_STATUS.CREATED,
          newUser
        );
        } catch (error: any) {
          console.error("Error during registration:", error.message);
          if (error.message === appConstants.ERRORS.USER_ALREADY_EXISTS) {
            return responseHandler.PREPARE_ERROR_HANDLER(
              res,
              appConstants.RESPONSE_STATUS.CONFLICT,
              error.message
            );
          }
          return responseHandler.PREPARE_ERROR_HANDLER(
            res,
            appConstants.RESPONSE_STATUS.SERVER_ERROR,
            error.message
          );
      }
}

export const login: RequestHandler = async (req, res) => {
    try {
        console.log("Logging in user...");
        const parsed = loginSchema.safeParse(req.body);
        if (!parsed.success) {
          const formattedErrors = zodErrorFormatter(parsed);
          return responseHandler.PREPARE_ERROR_HANDLER(
            res,
            appConstants.RESPONSE_STATUS.BAD_REQUEST,
            formattedErrors
          );
      }
      const { email, password } = parsed.data;
      const result = await authService.loginUser(email, password);

      responseHandler.FORMATTED_RESPONSE_HANDLER(
        res,
        appConstants.RESPONSE_STATUS.OK,
        result
      );

      } catch (error: any) {
        console.error("Error during login:", error.message);
        if (error.message === appConstants.ERRORS.INVALID_CREDENTIALS) {
          return responseHandler.PREPARE_ERROR_HANDLER(
            res,
            appConstants.RESPONSE_STATUS.UNAUTHORIZED,
            error.message
          );
        }
        return responseHandler.PREPARE_ERROR_HANDLER(
          res,
          appConstants.RESPONSE_STATUS.SERVER_ERROR,
          error.message
        );
      }
}