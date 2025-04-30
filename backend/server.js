import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import fs from "fs";
import path from "path";
const resultsPath = path.join(path.resolve(), "data", "lastResults.json");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// app.get("/api/results", (req, res) => {
//   fs.readFile(resultsPath, "utf8", (err, data) => {
//     if (err) return res.status(500).json({ error: "Failed to read results" });
//     res.json(JSON.parse(data));
//   });
// });

// // POST new result
// app.post("/api/results", (req, res) => {
//   const newResult = req.body;

//   fs.readFile(resultsPath, "utf8", (err, data) => {
//     if (err) return res.status(500).json({ error: "Read error" });

//     let results = JSON.parse(data);
//     const exists = results.some((r) => r.dateId === newResult.dateId);

//     if (exists) {
//       return res.status(409).json({ message: "Result already exists" });
//     }

//     results.push(newResult);

//     fs.writeFile(resultsPath, JSON.stringify(results, null, 2), (err) => {
//       if (err) return res.status(500).json({ error: "Write error" });
//       res.status(201).json({ message: "Result saved" });
//     });
//   });
// });

// app.get("/api/lottery-results", async (req, res) => {
//   const options = {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       secret: "FpOf7GpFJIXoDpIuMsuUnTztmYC3QHVG4dLi5FOF+wo=",
//     },
//   };

//   const gameType = "EuroJackpot";
//   const url = new URL(
//     "https://developers.lotto.pl/api/open/v1/lotteries/draw-results/last-results/"
//   );
//   url.searchParams.append("gameType", gameType);

//   try {
//     const response = await fetch(url, options);
//     if (!response.ok) {
//       throw new Error(`Could not fetch data: ${response.status}`);
//     }
//     const result = await response.json();
//     res.json(result); // Przekazujemy dane z zewnętrznego API do klienta (frontend)
//   } catch (error) {
//     console.error("Fetch error:", error);
//     res.status(500).json({ error: "Failed to fetch lottery data" });
//   }
// });

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
    )}.${draw.drawDate.slice(0, 4)}`;
    const newFive = [...draw.results[0].resultsJson].sort((a, b) => a - b);
    const newTwo = [...draw.results[0].specialResults].sort((a, b) => a - b);

    // Czytaj plik
    fs.readFile(resultsPath, "utf8", (err, data) => {
      if (err) return res.status(500).json({ error: "Read error" });

      let results = JSON.parse(data);
      const exists = results.some((r) => r.dateId === id);

      if (!exists) {
        results.push({
          date: newDate,
          dateId: id,
          five: newFive,
          two: newTwo,
        });

        fs.writeFile(resultsPath, JSON.stringify(results, null, 2), (err) => {
          if (err) return res.status(500).json({ error: "Write error" });
          return res.json(results);
        });
      } else {
        return res.json(results);
      }
    });
  } catch (error) {
    console.error("Backend error:", error);
    res.status(500).json({ error: "Failed to process results" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
