import React, { useEffect, useState, useContext } from "react";
import "../App.css";
import "../style/Generate.css";
import Chance from "chance";
import { DataContext } from "../context/Context";

const chance = new Chance();

export default function Generate() {
  const [numbers, setNumbers] = useState([]);
  const { data } = useContext(DataContext);

  // checkbox 1
  const [checkbox1, setCheckbox1] = useState(false);
  const [input1, setInput1] = useState(0);
  const [input2, setInput2] = useState(0);

  // checkbox 2
  const [checkbox2, setCheckbox2] = useState(false);
  const [input3, setInput3] = useState(0);
  const [input4, setInput4] = useState(0);

  function generatingArrays() {
    //! funkcja bez ostatnich losowan 5 z 50
    function withoutLastResults5(input1) {
      const last = resultArr.slice(input1);

      const allFives = new Set();

      last.forEach((draw) => {
        draw.five.forEach((num) => allFives.add(num));
      });

      return {
        uniqueFive: Array.from(allFives).sort((a, b) => a - b),
      };
    }
    //! funkcja bez ostatnich losowan 1 z 12
    function withoutLastResults2(input2) {
      const last = numbers.slice(input2);

      const allTwos = new Set();

      last.forEach((draw) => {
        draw.two.forEach((num) => allTwos.add(num));
      });

      return {
        uniqueTwo: Array.from(allTwos).sort((a, b) => a - b),
      };
    }

    //! liczby pod rzad np. 1,2,3
    function hasSequentialNumbers(arr, length = 3) {
      let count = 1;
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] === arr[i - 1] + 1) {
          count++;
          if (count >= length) return true;
        } else {
          count = 1;
        }
      }
      return false;
    }

    let valid = false;
    let generated5from50;
    while (!valid) {
      generated5from50 = chance
        .unique(chance.integer, 5, {
          min: 1,
          max: 50,
        })
        .sort((a, b) => a - b);

      if (!hasSequentialNumbers(generated5from50, 3)) {
        valid = true;
      }
    }

    console.log(generated5from50.sort((a, b) => a - b));
    const generated2from12 = chance
      .unique(chance.integer, 2, {
        min: 1,
        max: 12,
      })
      .sort((a, b) => a - b);

    console.log(generated2from12.sort((a, b) => a - b));

    setNumbers((prev) => [
      ...prev,
      {
        five: generated5from50,
        two: generated2from12,
      },
    ]);
  }

  return (
    <div className="generate">
      <form action="">
        <h2>OPTIONS</h2>

        {/* OPTION 1 */}
        <div className="option">
          <input
            type="checkbox"
            checked={checkbox1}
            onChange={() => setCheckbox1(!checkbox1)}
          />
          <label htmlFor="">
            Without last numbers from (n) number of result
            <p>(bez ostatnich cyfr z (n) liczby losowań)</p>
          </label>
          {checkbox1 ? (
            <div className="select">
              <label>5 of 50</label>
              <select
                name="input1"
                id="input1"
                value={input1}
                onChange={(e) => setInput1(e.target.value)}
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>

              <label htmlFor="">2 of 12</label>
              <select
                name="input2"
                id="input2"
                value={input2}
                onChange={(e) => setInput2(e.target.value)}
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
          ) : null}
        </div>

        {/* OPTION 2 */}
        <div className="option">
          <input
            type="checkbox"
            checked={checkbox2}
            onChange={() => setCheckbox2(!checkbox2)}
          />
          <label htmlFor="">
            Generate with system{"   "}
            {checkbox2 ? (
              <select
                name="input1"
                id="input1"
                value={input1}
                onChange={(e) => setInput1(e.target.value)}
              >
                <option value="5" defaultValue={5}>
                  5
                </option>
                <option value="6">6</option>
                <option value="6">7</option>
              </select>
            ) : (
              5
            )}
            {"   "}of 50{" and "}
            {checkbox2 ? (
              <select
                name="input2"
                id="input2"
                value={input2}
                onChange={(e) => setInput2(e.target.value)}
              >
                <option value="2" defaultValue={2}>
                  2
                </option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            ) : (
              2
            )}
            {"   "}of 12
            <p>(generuj liczby systemem)</p>
          </label>
        </div>
        <div className="buttons">
          <button
            onClick={(e) => {
              e.preventDefault();
              generatingArrays();
            }}
          >
            Generate
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setNumbers([]);
            }}
          >
            Reset
          </button>
        </div>
      </form>
      <div className="generate-1">
        {numbers
          ? numbers.map((element, index) => (
              <div key={index} className="generate-2">
                {element.five.map((e, index) => (
                  <div className="five" key={index}>
                    {e}
                  </div>
                ))}
                {element.two.map((e, index) => (
                  <div className="two" key={index}>
                    {e}
                  </div>
                ))}
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
