import Author from "../database/model/authors.schema.js";  
import { ErrorWithStatus } from "../exception/error-with-status-exception.js";

const getAllAuthors = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    const authors = await Author.find().skip(skip).limit(limit).lean(); // Using lean() for better performance
    const total = await Author.countDocuments();
    const meta = { 
      page,
      limit,
      total,
    };

    return { data: authors, meta };
  } catch (err) {
    throw new ErrorWithStatus("Authors not found", 404);
  }
};

// Author.service.js

const getAuthorById = async (AuthorId) => {
  try {
    const Author = await Author.findById(AuthorId);

    if (!Author) {
      throw new Error("Author not found");
    }
    return Author; // Return the retrieved Author object
  } catch (err) {
    throw err; // Throw the error to be caught by the controller
  }
};

const addAuthor = async (AuthorData) => {
  try {
    const newAuthor = new Author(AuthorData);
    const savedAuthor = await newAuthor.save();

    return savedAuthor; // Return the newly created Author object
  } catch (err) {
    throw new ErrorWithStatus("Failed to add Author", 400);
  }
};

const updateAuthor = async (AuthorId, updateData) => {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(AuthorId, updateData, { new: true });

    if (!updatedAuthor) {
      throw new Error("Author not found");
    }

    return updatedAuthor; // Return the updated Author object
  } catch (err) {
    throw new ErrorWithStatus("Failed to update Author", 400);
  }
};
const deleteAuthor = async (AuthorId) => {
  try {
    const result = await Author.deleteOne({ _id: AuthorId });

    if (result.deletedCount === 0) {
      throw new Error("Author not found");
    }

    return result; // Return the deletion result (deletedCount)
  } catch (err) {
    throw new ErrorWithStatus("Failed to delete Author", 400);
  }
};


export {
  getAllAuthors, getAuthorById, addAuthor, updateAuthor, deleteAuthor
} 
