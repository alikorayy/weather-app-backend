import { INVALID } from "zod";

const RESPONSE_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};

const ERRORS = {
  USER_ALREADY_EXISTS: "User already exists",
  INVALID_CREDENTIALS: "Invalid credentials",
  UNAUTHORIZED: "No valid token provided.",
  TOKEN_EXPIRED: "Token expired. Please login again.",
  LOGIN_FIRST: "Unauthorized. Please login first.",
  ADMIN_ONLY: "Forbidden. Admins only."
};

const appConstants = {
  RESPONSE_STATUS,
  ERRORS,
};

export default appConstants;
