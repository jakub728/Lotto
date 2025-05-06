import React, { useEffect, useState, useContext } from "react";
import "../App.css";
import "../style/Generate.css";
import Chance from "chance";
import { DataContext } from "../context/Context";
import { v4 as unique } from "uuid";

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
  const [input3, setInput3] = useState(5);
  const [input4, setInput4] = useState(2);

  function generatingArrays() {
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

    const count50 = checkbox2 ? input3 : 5;
    const count12 = checkbox2 ? input4 : 2;

    let valid = false;
    let generated5from50;
    let pool = Array.from({ length: 50 }, (_, i) => i + 1);
    let pool12 = Array.from({ length: 12 }, (_, i) => i + 1);

    while (!valid) {
      if (checkbox1) {
        const recent = data.slice(-input1);
        const exclude = recent.flatMap((d) => [...d.five]);
        pool = pool.filter((n) => !exclude.includes(n));
      }

      if (checkbox1 && input2 > 0) {
        const recent2 = data.slice(-input2);
        const exclude2 = recent2.flatMap((d) => [...d.two]);
        pool12 = pool12.filter((n) => !exclude2.includes(n));
      }

      if (pool.length < input1) break;

      generated5from50 = chance.pickset(pool, count50).sort((a, b) => a - b);

      if (!hasSequentialNumbers(generated5from50, 3)) {
        valid = true;
      }
    }

    const generated2from12 = chance
      .pickset(pool12, count12)
      .sort((a, b) => a - b);

    setNumbers((prev) => [
      ...prev,
      {
        id: unique(),
        five: generated5from50,
        two: generated2from12,
      },
    ]);
  }

  function handleSave(element) {
    const currentDate = new Date();

    const withDate = {
      ...element,
      date:
        currentDate.getDate().toString().padStart(2, "0") +
        "-" +
        (currentDate.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        currentDate.getFullYear().toString().slice(2),
      time:
        currentDate.getHours().toString().padStart(2, "0") +
        ":" +
        currentDate.getMinutes().toString().padStart(2, "0"),
    };
    localStorage.setItem(`numbers-${element.id}`, JSON.stringify(withDate));
    alert(`Saved`);
  }
  console.log(data);

  return (
    <div>
      {data.length > 0 ? (
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
                    onChange={(e) => setInput1(Number(e.target.value))}
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
                    onChange={(e) => setInput2(Number(e.target.value))}
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
                    name="input3"
                    id="input3"
                    value={input3}
                    onChange={(e) => setInput3(Number(e.target.value))}
                  >
                    <option value="5" defaultValue={5}>
                      5
                    </option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                  </select>
                ) : (
                  5
                )}
                {"   "}of 50{" and "}
                {checkbox2 ? (
                  <select
                    name="input4"
                    id="input4"
                    value={input4}
                    onChange={(e) => setInput4(Number(e.target.value))}
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
            <div className="option">
              <label htmlFor="">
                * default without 3 or more numbers in row ex. 25, 26, 27..
                <p>
                  (domyślnie bez 3 lub wiecej liczb pod rząd np. 25, 26, 27)
                </p>
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
              ? numbers.map((element) => (
                  <div className="generate-1-5">
                    <div className="generate-2">
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
                    <button
                      key={element.id}
                      onClick={() => handleSave(element)}
                      className="green-button"
                    >
                      Save
                    </button>
                  </div>
                ))
              : null}
          </div>
        </div>
      ) : (
        <img src="7471270.png" className="spinner" />
      )}
    </div>
  );
}
