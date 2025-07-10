import express from "express";
import ResultsModel from "../models/resultsModel.js";
import { fetchAndSaveResults } from "../middleware/fetchAndSave.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const allResults = await ResultsModel.find().sort({ number: 1 });
    res.status(200).json(allResults);
  } catch (error) {
    next({ status: 400, message: error.message });
  }
});


router.post("/manual", async (req, res, next) => {
  try {
    const {number, date, five, two} = req.body
    
    
    const newResult = {
      number,
      date,
      five,
      two,
    };
    if (!number || !date || !five || !two) {
      return res.status(400).json({ message: "No data" });
    }

    await ResultsModel.create(newResult)
    res.status(200).send("You added a result")
  } catch (error) {
    next({ status: 400, message: error.message });
  } 
})


router.delete("/", async (req, res, next) => {
  try {
    const {number} = req.body

    await ResultsModel.deleteOne({ number});
    res.status(200).send("done");
  } catch (error) {
    next({ status: 400, message: error.message });
  }
});

export default router;
