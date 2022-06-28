import { Router } from "express";
import bookModel from "../models/book.model.js";

let bookRouter = new Router();

bookRouter.route("/add-book").post(async (request, response) => {
  try {
    let { userName, author, bookName, mobileNo, isbn } = request.body; // stuff from here 👇
    let newBookDoc = new bookModel({
      userName,
      author,
      bookName,
      mobileNo,
      isbn,
    }); // stuff add here
    await newBookDoc.save();
    response
      .status(200)
      .send({ success: true, message: "Book added successfully!!" });
  } catch (e) {
    response.status(500).send(`Error occurred ${e}`);
  }
});

/**
 * @todo: Make search functionality according to what user provides like
 * - author
 * - title
 * @todo: Implement get endpoint to get all data of books from books collection
 */

bookRouter.route("/search-book").post(async (request, response) => {
  try {
    let { isbn } = request.body; // takes in isbn to search books
    let bookData = await bookModel.find({ isbn });
    if (bookData.length) {
      response.status(200).send({ success: true, data: bookData });
    } else {
      response.status(200).send({ success: false, data: null });
    }
  } catch (e) {
    response
      .status(500)
      .send({ success: false, message: `Error occurred ${e}` });
  }
});

bookRouter.route("/get-books").get(async (request, response) => {
  try {
    let booksData = await bookModel.find({});
    if (booksData.length) {
      response.status(200).send({ success: true, data: booksData });
    } else {
      response.status(200).send({ success: false, data: null });
    }
  } catch (e) {
    response
      .status(500)
      .send({ success: false, message: `Error occurred ${e}` });
  }
});

export default bookRouter;
