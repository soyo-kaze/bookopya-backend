import { Router } from "express";
import userModel from "../models/user.model.js";

let userRouter = new Router();

userRouter.route("/sign-up").post(async (request, response) => {
  try {
    let { userName, password, mobileNo } = request.body;
    let isUser = await userModel.find({ userName });
    console.log(isUser);
    if (isUser.length) {
      response
        .status(203)
        .send({ success: false, message: "User already Exists!!" });
    } else {
      let newUserDoc = new userModel({ userName, password, mobileNo });
      await newUserDoc.save();
      response
        .status(200)
        .send({ success: true, message: "User added successfully!!" });
    }
  } catch (e) {
    response.status(500).send(`Error occurred ${e}`);
  }
});

export default userRouter;
