import { useState } from "react";
import { useResults } from "../hooks/useResults";

export default function Results() {
  const { data, isLoading, isError, error } = useResults();
  const [toggle, setToggle] = useState(false);

  if (isLoading) {
    return (
      <div className="results">
        <img src="7471270.png" className="spinner" />
      </div>
    );
  }

  if (isError) return <div>Błąd: {error?.message}</div>;

  const safeData = Array.isArray(data) ? data : [];
  const newDataSmallReverse = [...safeData.slice(-5)].reverse();
  const newDataBigReverse = [...safeData];

  return (
    <div className="results">
      <img
        className="logo"
        src="/eurojackpot-logo-vector-removebg-preview.png"
        alt="lotto"
      />
      {safeData.length > 0 &&
        (toggle ? (
          <>
            <button
              style={{ display: "block", margin: "auto", marginBottom: "1rem" }}
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              LESS
            </button>
            {newDataBigReverse.reverse().map((element) => (
              <div key={element.number} className="results-div">
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
          </>
        ) : (
          newDataSmallReverse.map((element) => (
            <div key={element.number} className="results-div">
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
        ))}
      {safeData.length > 0 ? (
        <button
          style={{ display: "block", margin: "auto", marginBottom: "1rem" }}
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          {toggle ? "LESS" : "MORE"}
        </button>
      ) : null}
    </div>
  );
}
