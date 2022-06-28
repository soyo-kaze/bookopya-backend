import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bookRouter from "./routes/book.route.mjs";
import userRouter from "./routes/user.route.mjs";

dotenv.config();

const DB_SRV = process.env.BOOKOPYA_DB_SRV;
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/user", userRouter);
app.use("/books", bookRouter);

app.get("/", (request, response) => {
  response.send({ name: "Sam", message: "Hello World" });
});

mongoose
  .connect(DB_SRV)
  .then(() => {
    app.listen(PORT, () => {
      console.log("listening on port", PORT);
    });
  })
  .catch((error) => {
    console.log(`Failed to launch server. Reason: ${error}`);
  });

/**
 * make schemas => Export as models => Instance of models are new docs => the collection of doc would be the name of model.
 */
