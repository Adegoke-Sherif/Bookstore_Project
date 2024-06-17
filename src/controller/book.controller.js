import * as bookService from "../service/book.service.js";

const getAllBooks = async (req, res) => {
  try {
    //pagination
    let page = Number(req.query.page) || 1;
    page = page < 1 ? 1 : page;
    let limit = Number(req.query.limit) || 10;
    limit = limit < 1 ? 1 : limit;
    const { data, meta } = await bookService.getAllBooks(page, limit);
    res.status(200).json({ success: "All Books", data, meta });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, error: err.message });
  }
};

// Get single movie by ID
const getBookById = async (req, res) => {
  try {
    const bookId = await bookService.getBookById(req.params.id);
    res.status(200).json({ success: true, data: bookId });
  } catch (err) {
    res.status(404).json({ success: false, error: err.message });
  }
};


// Add a new movie
const addBook = async (req, res) => {
  try {
    const book = await bookService.addBook(req.body);
    res.status(201).json({ success: "Book is added successfully", data: book });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, error: err.message });
  }
};

// Update a movie
const updateBook = async (req, res) => {
  try {
    const updatedBook = await bookService.updateBook(req.params.id, req.body);
    res.status(200).json({ success: "Book is updated successfully", data: updatedBook });
  } catch (err) {
    res.status(404).json({ success: false, error: err.message });
  }
};

// Delete a Book
const deleteBook = async (req, res) => {
  try {
    const result = await bookService.deleteBook(req.params.id);
    res.status(200).json({ message: `${result.deletedCount} book deleted successfully`, data: {} });
  } catch (err) {
    res.status(404).json({ success: false, error: err.message });
  }
};

export { getAllBooks, getBookById, addBook, updateBook, deleteBook };
