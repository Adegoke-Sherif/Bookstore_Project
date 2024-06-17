import mongoose from "mongoose";

//define a schema
const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: false
  },
  year: {
    type: Number,
    required: true,
    max: [2022, "Year must be less than or equal to 2024"]
  },
  isbn: {
    type: String,
    required: true,
    unique: [true, "ISBN must be unique"]
  },
  price: {
    type: Number,
    required: true,
    min: [0, "price must be greater than or equal to 0"]
  }

  },{
  timestamps: true

})

//create a model
const Book = mongoose.model("Book", bookSchema);

export default Book;

