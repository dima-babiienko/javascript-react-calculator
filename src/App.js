import "./App.css";
import { useState } from "react";

export default function App() {
  const [result, setResult] = useState(0);
  const [count, setCount] = useState("0");

  let buttonList = [];
  for (let i = 1; i < 10; i++) {
    buttonList.push(
        <button key={i} value={i} onClick={(e) => add(e)}>
          {i}
        </button>
    );
  }

  function increase() {
    setResult((curr) => curr + Number(count));
    setCount("0");
  }

  function decrease() {
    if (result === 0) {
      setResult(Number(count));
    } else {
      setResult((curr) => curr - Number(count));
    }
    setCount("0");
  }

  function multiply() {
    if (result === 0) {
      setResult(Number(count));
    } else {
      setResult((curr) => curr * Number(count));
    }
    setCount("0");
  }

  function divide() {
    if (result === 0) {
      setResult(Number(count));
    } else {
      setResult((curr) => Math.round(curr / Number(count)));
    }
    setCount("0");
  }

  function reset() {
    setResult(0);
    setCount("0");
  }

  function add(e) {
    if (count === "0") {
      setCount(e.target.value);
    } else {
      setCount((curr) => curr + e.target.value);
    }
  }

  return (
      <div className="App">
        <h1 className="title">React Calculator</h1>
        <div className="flex">
          <div className="counter">
            <h1>{count === "0" ? result : count}</h1>
          </div>
        </div>

        <div className="flex">
          <div className="buttons btn-style">
            {buttonList}
            <button>C</button>
            <button value={0} onClick={(e) => add(e)}>
              0
            </button>
            <button onClick={reset}>RES</button>
          </div>
        </div>
        <div className="ops-btn btn-style">
          <button onClick={increase}>+</button>
          <button onClick={decrease}>-</button>
          <button onClick={multiply}>*</button>
          <button onClick={divide}>/</button>
        </div>
        <footer>
          <p>
            Coded by{" "}
            <a
                href="https://github.com/"
                rel="noreferrer"
                target="_blank"
            >
              Abyss
            </a>
          </p>
        </footer>
      </div>
  );
}
