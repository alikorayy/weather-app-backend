import rateLimit from "express-rate-limit";

export const weatherSearchRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each user to 5 requests per windowMs
  keyGenerator: (req) => {
    return req.user?.userId ?? req.ip ?? "unknown";
  },
  handler: (req, res) => {
    return res.status(429).json({
      message: "Too many weather search requests. Please try again later.",
    });
  },
  standardHeaders: true, // RateLimit-* headers
  legacyHeaders: false,  // X-RateLimit-* headers
});