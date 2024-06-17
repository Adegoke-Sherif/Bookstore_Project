import express from "express";
import * as bookController from "../controller/book.controller.js"
import BookValidationMW from "../validation/book.validator.js"


const bookRouter = express.Router()

// Routes for movie
bookRouter.get("/", bookController.getAllBooks)
bookRouter.get("/:id", bookController.getBookById)
bookRouter.post("/", BookValidationMW, bookController.addBook)
bookRouter.put("/:id", bookController.updateBook)
bookRouter.delete("/:id", bookController.deleteBook);

export default bookRouter;