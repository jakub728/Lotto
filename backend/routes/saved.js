import express from "express"
import { SavedNumbersModel } from "../models/savedNumbersModel.js";
import { checkToken } from "../middleware/checkToken.js";

const router = express.Router();

// http://localhost:5000/saved/user/savedNumbers
router.get("/user/savedNumbers", checkToken, async (req, res, next) => {
    try {
        const userId = req.userId
        
        const allSavedNumbers = await SavedNumbersModel.find({user: userId})

        
        res.status(200).json(allSavedNumbers)
    } catch (error) {
        next({status: 400, message: error.message})
    }
})

// http://localhost:5000/saved/user/saveNumbers
router.post("/user/saveNumbers", checkToken, async (req, res, next) => {
    try {
        const userId = req.userId
        const {number, date, five, two} = req.body

        const newSavedNumbers = new SavedNumbersModel({
            user: userId,
            number,
            date,
            five,
            two
        })

        await newSavedNumbers.save()

        res.status(201).json({message: "Numbers saved successfullly"})
    } catch (error) {
        next({status: 400, message: error.message})
    }
})

// http://localhost:5000/saved/user/savedNumbers/:id
router.delete("/user/savedNumbers/:id", checkToken, async (req, res, next) => {
    try {
        const userId = req.userId
        const {id} = req.params

        const deleted = await SavedNumbersModel.findByIdAndDelete({_id: id, user: userId})
        
        if (!deleted) {return next({message: "Saved numbers not found or not authorized"})}


        res.status(200).json({message: "Numbers deleted successfully"})
    } catch (error) {
        next({status: 400, message: error.message})
    }
})

export default router