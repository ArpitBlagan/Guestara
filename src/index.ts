import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { router } from "./route";
import { RateLimiterRedis } from "rate-limiter-flexible";
import Redis from "ioredis";
dotenv.config();
// Configure Redis client
const redisClient = new Redis({
  host: "localhost", // Replace with the Redis container's hostname if using Docker Compose networks
  port: 6379, // Default Redis port
});

// Configure rate limiter
const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "middleware", // Prefix for Redis keys
  points: 10, // 10 requests
  duration: 60, // Per 60 seconds by IP
});

const app = express();
const rateLimitMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //@ts-ignore
    await rateLimiter.consume(req.ip); // Consume 1 point for each request
    next(); // Proceed if within rate limit
  } catch (err) {
    res.status(429).send("Too many requests, please try again later.");
  }
};

app.use(cors());
app.use(cookieParser());
app.use(rateLimitMiddleware);
app.use(router);
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
