import express from "express";
import ResultsModel from "../schema/resultsModel.js";


const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const allResults = await ResultsModel.find().sort({ number: 1 });
    res.status(200).json(allResults);
  } catch (error) {
    next({ status: 400, message: error.message });
  }
});

router.post("/", async (req, res, next) => {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      secret: process.env.KEY,
    },
  };

  const gameType = "EuroJackpot";
  const url = new URL(
    "https://developers.lotto.pl/api/open/v1/lotteries/draw-results/last-results/"
  );
  url.searchParams.append("gameType", gameType);

  try {
    const response = await fetch(url, options);

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const result = await response.json();

    const draw = result[1];
    const addNumber = draw.drawSystemId;
    const addDate = `${draw.drawDate.slice(8, 10)}.${draw.drawDate.slice(
      5,
      7
    )}.${draw.drawDate.slice(2, 4)}`;
    const addFive = [...draw.results[0].resultsJson].sort((a, b) => a - b);
    const addTwo = [...draw.results[0].specialResults].sort((a, b) => a - b);

    const newResult = {
      number: addNumber,
      date: addDate,
      five: addFive,
      two: addTwo,
    };

    let add = await ResultsModel.find({ number: addNumber });

    if (!add) {
      await ResultsModel.create(newResult);
      res.status(201).json(newResult);
    }
  } catch (error) {
    next({ status: 400, message: error.message });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    await ResultsModel.deleteMany();
    res.status(200).send("done");
  } catch (error) {
    next({ status: 400, message: error.message });
  }
});

export default router;
