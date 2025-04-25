import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.get("/api/lottery-results", async (req, res) => {
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
    if (!response.ok) {
      throw new Error(`Could not fetch data: ${response.status}`);
    }
    const result = await response.json();
    res.json(result); // Przekazujemy dane z zewnętrznego API do klienta (frontend)
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch lottery data" });
  }
});

app.get("/api/statistic", async (req, res) => {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      secret: "FpOf7GpFJIXoDpIuMsuUnTztmYC3QHVG4dLi5FOF+wo=",
    },
  };

  const gameType = "EuroJackpot";
  const url = new URL(
    "https://developers.lotto.pl/api/open/v1/lotteries/draw-statistics/numbers-frequency"
  );
  url.searchParams.append("gameType", gameType);

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Could not fetch data: ${response.status}`);
    }
    const result = await response.json();
    res.json(result); // Przekazujemy dane z zewnętrznego API do klienta (frontend)
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch lottery data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
