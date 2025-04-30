import { RequestHandler } from "express";
import { weatherSearchSchema } from "../../validators/zodValidators";
import appConstants from "../../constants/appConstants";
import { zodErrorFormatter } from "../../utils/zodUtils";
import responseHandler from "../../utils/responseHandler";
import utils from "../../utils/utils";
import * as weatherService from "../services/weatherService";

export const searchWeatherHandler: RequestHandler = async (req, res) => {
  try {
    console.log("fetching weather data...");
    const parsed = weatherSearchSchema.safeParse(req.body);
    if (!parsed.success) {
      const formattedErrors = zodErrorFormatter(parsed);
      return responseHandler.PREPARE_ERROR_HANDLER(
        res,
        appConstants.RESPONSE_STATUS.BAD_REQUEST,
        formattedErrors
      );
    }

    const { city } = parsed.data;
    const userId = req.user!.userId;

    const weatherData = await weatherService.searchWeatherService(city, userId);

    responseHandler.FORMATTED_RESPONSE_HANDLER(
      res,
      appConstants.RESPONSE_STATUS.CREATED,
      weatherData
    );
  } catch (error: any) {
    console.error("Error during weather search:", error.message);
    /*   if (error.message === appConstants.ERRORS.USER_NOT_FOUND) {
            return responseHandler.PREPARE_ERROR_HANDLER(
                res,
                appConstants.RESPONSE_STATUS.NOT_FOUND,
                error.message
            );
        } */
    return responseHandler.PREPARE_ERROR_HANDLER(
      res,
      appConstants.RESPONSE_STATUS.SERVER_ERROR,
      error.message
    );
  }
};

export const getUserWeatherQueriesHandler: RequestHandler = async (
  req,
  res
) => {
  try {
    console.log("Fetching user weather queries...");
    const userId = req.user!.userId;
    const weatherQueries = await weatherService.getUserWeatherQueriesService(
      userId
    );
    responseHandler.FORMATTED_RESPONSE_HANDLER(
      res,
      appConstants.RESPONSE_STATUS.OK,
      weatherQueries
    );
  } catch (error: any) {
    console.error("Error fetching user weather queries:", error.message);
    return responseHandler.PREPARE_ERROR_HANDLER(
      res,
      appConstants.RESPONSE_STATUS.SERVER_ERROR,
      error.message
    );
  }
};

export const getAllWeatherQueriesHandler: RequestHandler = async (
  req,
  res
) => {
  try {
    console.log("Fetching all weather queries...");
    const weatherQueries = await weatherService.getAllWeatherQueriesService();
    console.log("Weather queries:", JSON.stringify(weatherQueries, null, 2));
    const formattedWeatherQueries = utils.ResponseFormatter(weatherQueries);
    responseHandler.FORMATTED_RESPONSE_HANDLER(
      res,
      appConstants.RESPONSE_STATUS.OK,
      formattedWeatherQueries
    );
  } catch (error: any) {
    console.error("Error fetching all weather queries:", error.message);
    return responseHandler.PREPARE_ERROR_HANDLER(
      res,
      appConstants.RESPONSE_STATUS.SERVER_ERROR,
      error.message
    );
  }
};

