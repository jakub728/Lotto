import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
import loginRouter from "./routes/login.js";
import resultsRouter from "./routes/results.js";
import { connectDB } from "./data/utilities/connectDB.js";

const resultsPath = path.join(path.resolve(), "data", "lastResults.json");

const app = express();
const port = process.env.PORT || 5000;
connectDB();
dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/api/results", async (req, res) => {
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
    const id = draw.drawSystemId;
    const newDate = `${draw.drawDate.slice(8, 10)}.${draw.drawDate.slice(
      5,
      7
    )}.${draw.drawDate.slice(2, 4)}`;
    const newFive = [...draw.results[0].resultsJson].sort((a, b) => a - b);
    const newTwo = [...draw.results[0].specialResults].sort((a, b) => a - b);

    let results = JSON.parse(await fs.readFile(resultsPath, "utf-8"));

    if (!results.some((r) => r.dateId === id)) {
      results.push({
        date: newDate,
        dateId: id,
        five: newFive,
        two: newTwo,
      });

      await fs.writeFile(
        resultsPath,
        JSON.stringify(results, null, 2),
        "utf-8"
      );
    } else {
      console.log(`Wynik numer ${id} już zapisany`);
    }

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process results" });
  }
});

app.use("/results", resultsRouter);
app.use("/login", loginRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
