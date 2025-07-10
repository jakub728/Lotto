import express from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { UserModel } from "../models/userModel.js";

const router = express.Router();

//! ALL USERS
// http://localhost:5000/login/users/all
router.get("/users/all", async(req, res, next) => {
  try {
    const allUsers = await UserModel.find()
    res.status(200).json(allUsers)    
  } catch (error) {
    console.error("Users error:", error);
    next({status: 400, message: error.message})
  }
});

//! LOGIN USER
// http://localhost:500/login/user/login
router.post("/user/login", async (req, res, next) => {
  try {
    const {email, password} = req.body

    const findUser = await UserModel.findOne({email})
    if (!findUser) {return next({status: 401, message: "Wrong email or password"})}

    const matchedPassword = await bcrypt.compare(password, findUser.password)
    if (!matchedPassword) {return next({status: 401, message: "Wrong email or password"})}

    const token = jwt.sign({userId: findUser._id},process.env.JWT_SECRET,{expiresIn:"24h"})

    
    const cookieOptions = {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24h
      sameSite: "none",
      secure: true
    };



    res.cookie("token", token, cookieOptions);

    res.status(200).send({message: "Successfully logged in"})
  } catch (error) {
    console.error("Login error:", error)
    next({status: 400, message: error.message})
  }
});


export default router;
