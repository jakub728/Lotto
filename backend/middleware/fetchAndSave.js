import ResultsModel from "../schema/resultsModel.js";


export async function fetchAndSaveResults() {
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

    const add = await ResultsModel.find({ number: addNumber });

    if (add.length === 0) {
      await ResultsModel.create(newResult);
      console.log('New result added:', newResult);
      return newResult;
    } else {
      console.log('Result already exists:', addNumber);
      return null;
    }
  } catch (error) {
    console.error('Fetch and save error:', error.message);
    return null;
  }
}