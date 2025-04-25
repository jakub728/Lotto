import { useEffect, useContext } from "react";
import { DataContext } from "../context/Context";

export default function Results() {
  const { data, setData, lastResults, setLastResults } =
    useContext(DataContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://lotto-backend-pfhh.onrender.com/api/lottery-results"
        );
        if (!response.ok) {
          throw new Error(`Could not fetch data: ${response.status}`);
        }
        const result = await response.json();

        setData(result);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [setData]);

  useEffect(() => {
    if (!data || !data[1]) return;

    let newDate = `${data[1].drawDate.slice(8, 10)}.${data[1].drawDate.slice(
      5,
      7
    )}.${data[1].drawDate.slice(0, 4)}`;

    let id = data[1].drawSystemId;

    const isExisting = lastResults.some((result) => result.dateId === id);

    if (!isExisting) {
      setLastResults((prev) => [
        ...prev,
        {
          date: newDate,
          dateId: id,
          five: data[1].results[0].resultsJson,
          two: data[1].results[0].specialResults,
        },
      ]);
    }
  }, [data]);

  const lastFiveSorted = [...lastResults]
    .sort((a, b) => b.dateId - a.dateId)
    .slice(0, 5);

  return (
    <div className="results">
      <img
        className="logo"
        src="/eurojackpot-logo-vector-removebg-preview.png"
        alt="lotto"
      />

      {lastFiveSorted.map((element) => (
        <div key={element.dateId} className="results-div">
          <p style={{ color: "black" }}></p>
          <p>{element.date}</p>

          {element.five.map((e, index) => (
            <div key={index}>{e}</div>
          ))}
          {element.two.map((e, index) => (
            <div key={index}>{e}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

// FpOf7GpFJIXoDpIuMsuUnTztmYC3QHVG4dLi5FOF+wo=
