import React, { useEffect, useState } from "react";
import "../App.css";
import "../style/Generate.css";
import Chance from "chance";

const chance = new Chance();

export default function Generate() {
  const [numbers, setNumbers] = useState([]);

  function generatingArrays() {
    const generated5from50 = chance.unique(chance.integer, 5, {
      min: 1,
      max: 50,
    });
    console.log(generated5from50.sort((a, b) => a - b));
    const generated2from12 = chance.unique(chance.integer, 2, {
      min: 1,
      max: 12,
    });
    console.log(generated2from12.sort((a, b) => a - b));

    setNumbers((prev) => [
      ...prev,
      {
        five: generated5from50.sort((a, b) => a - b),
        two: generated2from12.sort((a, b) => a - b),
      },
    ]);
  }

  return (
    <div className="generate">
      <form action="">
        <h2>OPTIONS</h2>
        <input type="checkbox" />
        <label htmlFor="">
          Without last numbers from (n) number of result
          <p>(bez ostatnich cyfr z (n) liczby losowań)</p>
        </label>
        <hr />
        <input type="checkbox" />
        <label htmlFor="">
          Without (n) numbers, one after another: 1,2,3 / (n)=3
          <p>(bez liczb występujących jedna po drugiej (n) to ilość cyfr)</p>
        </label>

        <button
          onClick={(e) => {
            e.preventDefault();
            generatingArrays();
          }}
        >
          Generate EuroJackpot numbers
        </button>
      </form>
      <div className="generate-1">
        {numbers
          ? numbers.map((element, index) => (
              <div key={index} className="generate-2">
                <p>{index + 1}.</p>
                {element.five.map((e, index) => (
                  <div key={index}>{e}</div>
                ))}
                {element.two.map((e, index) => (
                  <div key={index}>{e}</div>
                ))}
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

{
  /* <>
element.five.map((element) => <p>{element}</p>
element.two.map((element) => <p>{element}</p>) 
</> */
}
