const mongoose = require("mongoose");
const { Schema } = mongoose;

let bookSchema = new Schema({
  userName: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    required: true,
  },
  bookName: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: false,
  },
});

let bookModel = new mongoose.model("Books", bookSchema);

module.exports = bookModel;
