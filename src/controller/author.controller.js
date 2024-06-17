import * as authorService from "../service/author.service.js";

const getAllAuthors = async (req, res) => {
  try {
    //pagination
    let page = Number(req.query.page) || 1;
    page = page < 1 ? 1 : page;
    let limit = Number(req.query.limit) || 10;
    limit = limit < 1 ? 1 : limit;
    const { data, meta } = await authorService.getAllAuthors(page, limit);
    res.status(200).json({ success: "All Authors", data, meta });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, error: err.message });
  }
};

// Get single movie by ID
const getAuthorById = async (req, res) => {
  try {
    const authorId = await authorService.getAuthorById(req.params.id);
    res.status(200).json({ success: true, data: authorId });
  } catch (err) {
    res.status(404).json({ success: false, error: err.message });
  }
};


// Add a new movie
const addAuthor = async (req, res) => {
  try {
    const book = await authorService.addAuthor(req.body);
    res.status(201).json({ success: "Author is added successfully", data: book });
  } catch (err) {
    res.status(err.status || 500).json({ message: "cannot add author", error: err.message });
  }
};

// Update a movie
const updateAuthor = async (req, res) => {
  try {
    const updatedBook = await authorService.updateAuthor(req.params.id, req.body);
    res.status(200).json({ success: "Author is updated successfully", data: updatedBook });
  } catch (err) {
    res.status(404).json({ success: false, error: err.message });
  }
};

// Delete a Book
const deleteAuthor = async (req, res) => {
  try {
    const result = await authorService.deleteAuthor(req.params.id);
    res.status(200).json({ message: `${result.deletedCount} Author deleted successfully`, data: {} });
  } catch (err) {
    res.status(404).json({ success: false, error: err.message });
  }
};

export { getAllAuthors, getAuthorById, addAuthor, updateAuthor, deleteAuthor };
