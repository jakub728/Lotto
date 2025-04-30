import { useEffect, useContext, useState } from "react";
import { DataContext } from "../context/Context";

export default function Results() {
  const { data, setData, lastResults, setLastResults } =
    useContext(DataContext);

  const [loading, setLoading] = useState(true);
  const [isClearing, setIsClearing] = useState(false);
  const [toggle, setToggle] = useState(false);

  // useEffect(() => {
  //   const storedResults = localStorage.getItem("lastResults");
  //   if (storedResults) {
  //     setLastResults(JSON.parse(storedResults));
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem("lastResults", JSON.stringify(lastResults));
  }, [lastResults]);

  const clearLastResults = () => {
    setIsClearing(true);
    setLastResults([]);
    localStorage.removeItem("lastResults");
    setTimeout(() => setIsClearing(false), 100);
  };

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
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, [setData]);

  useEffect(() => {
    if (loading || !data || !data[1] || isClearing) return;

    const draw = data[1];
    const id = draw.drawSystemId;
    const newDate = `${draw.drawDate.slice(8, 10)}.${draw.drawDate.slice(
      5,
      7
    )}.${draw.drawDate.slice(0, 4)}`;
    const newFive = [...draw.results[0].resultsJson].sort((a, b) => a - b);
    const newTwo = [...draw.results[0].specialResults].sort((a, b) => a - b);

    const isExisting = lastResults.some((result) => result.dateId === id);
    if (!isExisting) {
      const updatedResults = [
        ...lastResults,
        {
          date: newDate,
          dateId: id,
          five: newFive,
          two: newTwo,
        },
      ];
      setLastResults(updatedResults);
    }
  }, [data, loading, lastResults, isClearing]);

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
      {toggle
        ? lastResults
            .sort((a, b) => b.dateId - a.dateId)
            .map((element) => (
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
            ))
        : lastFiveSorted.map((element) => (
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

      <button
        style={{ display: "block", margin: "auto", marginBottom: "1rem" }}
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        {toggle ? "LESS" : "MORE"}
      </button>
      <button onClick={clearLastResults}>Clear History</button>
    </div>
  );
}

// FpOf7GpFJIXoDpIuMsuUnTztmYC3QHVG4dLi5FOF+wo=
