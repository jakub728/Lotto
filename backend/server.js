import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { existsSync, mkdirSync } from "fs";
const resultsPath = path.join(path.resolve(), "data", "lastResults.json");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const users = [
  {
    username: "admin",
    password: "1234",
  },
];

app.get("/api/results", async (req, res) => {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      secret: "FpOf7GpFJIXoDpIuMsuUnTztmYC3QHVG4dLi5FOF+wo=",
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

    let results = [];
    try {
      const fileContent = await fs.readFile(resultsPath, "utf-8");
      results = JSON.parse(fileContent);
    } catch (e) {
      results = [];
    }

    const exists = results.some((r) => r.dateId === id);

    if (!exists) {
      results.push({
        date: newDate,
        dateId: id,
        five: newFive,
        two: newTwo,
      });

      await fs.writeFile(resultsPath, JSON.stringify(results, null, 2), {
        encoding: "utf-8",
      });
    }

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process results" });
  }
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.json({ success: true, message: "Logged in!" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
