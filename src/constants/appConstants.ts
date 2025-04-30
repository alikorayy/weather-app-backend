
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
  ADMIN_ONLY: "Forbidden. Admins only.",
  WEATHER_API_ERROR: "Failed to fetch weather data"
};

const OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
const CACHE_EXPIRATION_TIME = 900; // 15 minutes in seconds

const appConstants = {
  RESPONSE_STATUS,
  ERRORS,
  OPENWEATHER_BASE_URL,
  CACHE_EXPIRATION_TIME,
};



export default appConstants;
