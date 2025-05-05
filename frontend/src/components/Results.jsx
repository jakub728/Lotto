import { useEffect, useContext, useState } from "react";
import { DataContext } from "../context/Context";

export default function Results() {
  const { data, setData } = useContext(DataContext);

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://lotto-backend-pfhh.onrender.com/api/results"
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
    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, [setData]);

  return (
    <div className="results">
      <img
        className="logo"
        src="/eurojackpot-logo-vector-removebg-preview.png"
        alt="lotto"
      />
      {data ? (
        toggle ? (
          data.reverse().map((element) => (
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
        ) : (
          data
            .slice(-5)
            .reverse()
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
        )
      ) : (
        <img src="7471270.png" className="spinner" />
      )}

      <button
        style={{ display: "block", margin: "auto", marginBottom: "1rem" }}
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        {toggle ? "LESS" : "MORE"}
      </button>
    </div>
  );
}

// FpOf7GpFJIXoDpIuMsuUnTztmYC3QHVG4dLi5FOF+wo=
