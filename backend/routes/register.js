import express from "express";
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"
import { UserModel } from "../models/userModel.js";
import { Verification } from "../models/verificationModel.js";
import { validatUser } from "../middleware/validateUser.js";
import sendVerificationEmail from "../utilities/verificationEmail.js";

const router = express.Router();



// http://localhost:5000/register/verify/:token
router.get("/verify/:token", async (req, res, next) => {
    try {
        const {token} = req.params

        const findToken = await Verification.findOne({token})
        if (!findToken) {return next({status:404, message: "Invalid expired token!"})}

        const findUser = await UserModel.findById(findToken.user)
        if (!findUser) {return next({status:404, message: "User doesn't exist!"})}

        findUser.verified = true
        await findUser.save()
        res.status(200).send({message: "You are successfully verified!"})
    } catch (error) {
        next({status: 400, message: error.message})
    }
})



// http://localhost:5000/register/user
router.post("/user", validatUser, async(req,res,next) => {
    
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        req.body.password = hashedPassword

        const newUser = await UserModel.create(req.body)
        const token = uuid()

        const verificationData = {
            user: newUser._id,
            token
        }

        const verificationLink = `https://lotto-j6xo.onrender.com/login`;

        await Verification.create(verificationData)

        await sendVerificationEmail(newUser.email, verificationLink)

        res.status(201).send({message: "User is successfully registered!"})
    } catch (error) {
        next({status: 400, message: error.message})
    }
})


export default router;