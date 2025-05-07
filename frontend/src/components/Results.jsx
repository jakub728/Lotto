import { useEffect, useContext, useState } from "react";
import { DataContext } from "../context/Context";

export default function Results() {
  const { data, setData } = useContext(DataContext);

  const [toggle, setToggle] = useState(false);

  let newDataSmall = structuredClone(data.slice(-5));
  let newDataBig = structuredClone(data);

  let newDataSmallReverse = structuredClone(newDataSmall.reverse());

  console.log(data);

  return (
    <div className="results">
      <img
        className="logo"
        src="/eurojackpot-logo-vector-removebg-preview.png"
        alt="lotto"
      />
      {data.length > 0 ? (
        toggle ? (
          newDataBig.reverse().map((element) => (
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
          newDataSmallReverse.map((element) => (
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
      {data.length > 0 ? (
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

// FpOf7GpFJIXoDpIuMsuUnTztmYC3QHVG4dLi5FOF+wo=
