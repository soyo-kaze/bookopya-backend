import { Router } from "express";
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";

let userRouter = new Router();

userRouter.route("/sign-up").post(async (request, response) => {
  try {
    let { userName, password, mobileNo } = request.body;
    let isUser = await userModel.find({ userName });
    if (isUser.length) {
      response
        .status(203)
        .send({ success: false, message: "User already Exists!!" });
    } else {
      let pass = await bcrypt.hash(password, 10);
      let newUserDoc = new userModel({ userName, password: pass, mobileNo });
      await newUserDoc.save();
      response
        .status(200)
        .send({ success: true, message: "User added successfully!!" });
    }
  } catch (e) {
    response.status(500).send(`Error occurred ${e}`);
  }
});

userRouter.route("/login").post(async (request, response) => {
  try {
    let { userName, password } = request.body;
    let userData = await userModel.find({ userName });
    if (userData.length) {
      let isPass = await bcrypt.compare(password, userData[0].password);
      response
        .status(200)
        .send(
          isPass
            ? { success: true, message: "User logged-in successfully!!" }
            : { success: false, message: "Incorrect Password" }
        );
    } else {
      response
        .status(404)
        .send({ success: false, message: "User doesn't Exits" });
    }
  } catch (e) {
    response
      .status(500)
      .send({ success: false, message: `Error occurred ${e}` });
  }
});

export default userRouter;
