import { RequestHandler } from "express";
import appConstants from "../../constants/appConstants";
import { zodErrorFormatter } from "../../utils/zodUtils";
import responseHandler from "../../utils/responseHandler";
import { createUserSchema } from "../../validators/zodValidators";
import * as adminService from "../services/adminService";

export const createUserHandler: RequestHandler = async (req, res) => {
    try {
        console.log("Creating new user...");
        const parsed = createUserSchema.safeParse(req.body);
        if (!parsed.success) {
            const formattedErrors = zodErrorFormatter(parsed);
            return responseHandler.PREPARE_ERROR_HANDLER(
                res,
                appConstants.RESPONSE_STATUS.BAD_REQUEST,
                formattedErrors
            );
        }
        const { email, password, role } = parsed.data;
        const newUser = await adminService.createUserByAdmin(email, password, role);

        responseHandler.FORMATTED_RESPONSE_HANDLER(
            res,
            appConstants.RESPONSE_STATUS.CREATED,
            newUser
        );
    }
    catch (error: any) {
        console.error("Error during user creation:", error.message);
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