import express from "express";
import * as authorController from "../controller/author.controller.js"
import { addAuthorValidationMW, updateAuthorValidationMW } from "../validation/author.validator.js";


const authorRouter = express.Router()

// Routes for movie
authorRouter.get("/", authorController.getAllAuthors)
authorRouter.get("/:id", authorController.getAuthorById)
authorRouter.post("/", addAuthorValidationMW, authorController.addAuthor)
authorRouter.put("/:id",updateAuthorValidationMW, authorController.updateAuthor)
authorRouter.delete("/:id", authorController.deleteAuthor);

export default authorRouter;