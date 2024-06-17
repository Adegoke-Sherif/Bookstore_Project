import express from "express";
import * as bookController from "../controller/book.controller.js"
import { addBookValidationMW, updateBookValidationMW } from "../validation/book.validator.js";


const bookRouter = express.Router()

// Routes for movie
bookRouter.get("/", bookController.getAllBooks)
bookRouter.get("/:id", bookController.getBookById)
bookRouter.post("/", addBookValidationMW, bookController.addBook)
bookRouter.put("/:id",updateBookValidationMW, bookController.updateBook)
bookRouter.delete("/:id", bookController.deleteBook);

export default bookRouter;