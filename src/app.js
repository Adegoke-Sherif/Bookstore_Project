import express from "express";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import logger from "./logging/logger.js";
import httpLogger from "./logging/httpLogger.js"
import helmet from "helmet";
import cors from "cors"
import { connect } from "../src/database/db.js";
import bookRouter from "./routes/book.route.js";
// import { requiresAuth } from "express-openid-connect";
// import auth0Middleware from "./auth/auth0.js"
// import pkg from "express-openid-connect";
import authRouter from "./routes/auth.route.js";
import { authMiddleware } from "./middleware/auth.middleware.js";
// const { requiresAuth } = pkg;

dotenv.config();
const app = express(); 
const PORT = process.env.PORT || 3300;

app.use(httpLogger)
//MiddleWare
app.use(express.json()); //body-parser
app.use("/api/v1/books", bookRouter)
app.use("/auth", authRouter)
app.use(authMiddleware)
app.set("views", "src/views")
app.set("view engine", "ejs")

// app.use(auth0Middleware)
app.use(cors())

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})

//Apply the rate limiting middleware to all request
app.use(limiter)

// Security middleware
app.use(helmet())

app.get("/", (req, res) => {
  logger.info("Welcome Home")
  res.send("Hello Bookstore")
})
 
// for all routes
app.all("*", (req, res) => {
  res.status(404).jsonp({ message: `Page ${req.originalUrl} not found on the server`});
})

connect().then(() => {
  console.log("Connected to MongoDB")
app.listen(PORT, () => {
  logger.info(`Server is running on PORT ${PORT}`)
})
});



