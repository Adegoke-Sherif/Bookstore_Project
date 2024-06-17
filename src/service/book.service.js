import Book from "../database/model/books.schema.js";  
import { ErrorWithStatus } from "../exception/error-with-status-exception.js";

const getAllBooks = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    const books = await Book.find().skip(skip).limit(limit).lean(); // Using lean() for better performance
    const total = await Book.countDocuments();
    const meta = { 
      page,
      limit,
      total,
    };

    return { data: books, meta };
  } catch (err) {
    throw new ErrorWithStatus("Books not found", 404);
  }
};

// book.service.js

const getBookById = async (bookId) => {
  try {
    const book = await Book.findById(bookId);

    if (!book) {
      throw new Error("Book not found");
    }
    return book; // Return the retrieved book object
  } catch (err) {
    throw err; // Throw the error to be caught by the controller
  }
};

const addBook = async (bookData) => {
  try {
    const newBook = new Book(bookData);
    const savedBook = await newBook.save();

    return savedBook; // Return the newly created book object
  } catch (err) {
    throw new ErrorWithStatus("Failed to add book", 400);
  }
};

const updateBook = async (bookId, updateData) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, { new: true });

    if (!updatedBook) {
      throw new Error("Book not found");
    }

    return updatedBook; // Return the updated book object
  } catch (err) {
    throw new ErrorWithStatus("Failed to update book", 400);
  }
};
const deleteBook = async (bookId) => {
  try {
    const result = await Book.deleteOne({ _id: bookId });

    if (result.deletedCount === 0) {
      throw new Error("Book not found");
    }

    return result; // Return the deletion result (deletedCount)
  } catch (err) {
    throw new ErrorWithStatus("Failed to delete book", 400);
  }
};


export {
  getAllBooks, getBookById, addBook, updateBook, deleteBook
} 
