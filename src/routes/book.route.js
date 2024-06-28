import express from "express";
import * as bookController from "../controller/book.controller.js"
import { addBookValidationMW, updateBookValidationMW } from "../validation/book.validator.js";
import { generateMiddleWare } from "../middleware/route.middleware.js";
import { registerSchema } from "../validation/auth.validation.js";
// import { adminMiddleware } from "../middleware/admin.middleware.js";


const bookRouter = express.Router()

// Routes for movie
bookRouter.get("/", bookController.getAllBooks)
bookRouter.get("/:id", bookController.getBookById)
bookRouter.post("/", generateMiddleWare(registerSchema),addBookValidationMW, bookController.addBook)
bookRouter.put("/:id",updateBookValidationMW, bookController.updateBook)
bookRouter.delete("/:id", bookController.deleteBook);

export default bookRouter;