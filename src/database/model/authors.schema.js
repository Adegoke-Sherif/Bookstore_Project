import mongoose from "mongoose";

//define a schema
const authorSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
  },
  country: {
    type: String,
    required: false
  },
  books: {
    type: Array,
    default: []
  }
  },{
  timestamps: true

})

//create a model
const Author = mongoose.model("Author", authorSchema);

export default Author;

