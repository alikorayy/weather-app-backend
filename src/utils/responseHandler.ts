import { Response } from "express";

const FORMATTED_RESPONSE_HANDLER = (
  res: Response,
  status: number,
  data: any
) => {
  const responseBody = {
    data: data,
  };
  return res.status(status).json(responseBody);
};

const PREPARE_ERROR_HANDLER = (
    res: Response,
    errorCode: number,
    errorMessage: any
  ) => {
    const errorBody = {
      data: {
        errorDetails: errorMessage,
      },
    };
    res.status(errorCode).json(errorBody);
  };

const responseHandler = {
  FORMATTED_RESPONSE_HANDLER,
  PREPARE_ERROR_HANDLER
};
export default responseHandler;