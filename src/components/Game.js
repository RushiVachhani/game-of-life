import { useEffect, useState } from "react";

import Grid from "./Grid";
import useInterval from "../hooks/useInterval";
import { constants } from "../utils/constants";

const Game = () => {
  // states
  const [generations, setGenerations] = useState(0);
  const [running, setRunning] = useState(constants.initialRunning);
  const [speed, setSpeed] = useState(constants.initialSpeed);
  const [rows, setRows] = useState(constants.initialRows);
  const [cols, setCols] = useState(constants.initialCols);
  const [fullGrid, setFullGrid] = useState(
    Array(rows)
      .fill()
      .map(() => Array(cols).fill(false))
  );

  // lifecycle methods
  useEffect(() => {
    seed();
  }, []);

  // hooks
  useInterval(() => {
    play();
  }, speed);

  // functions
  const selectBox = (row, col) => {
    let fullGridClone = JSON.parse(JSON.stringify(fullGrid));
    fullGridClone[row][col] = !fullGrid[row][col];
    setFullGrid(() => {
      return fullGridClone;
    });
  };

  const seed = () => {
    let fullGridClone = Array(rows)
      .fill()
      .map(() => Array(cols).fill(false));
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (
          Math.floor(Math.random() * 10) <= constants.RandomizationParameter
        ) {
          fullGridClone[i][j] = true;
        }
      }
    }
    setFullGrid(() => fullGridClone);
  };

  const handlePlay = () => {
    if (running) {
      setGenerations(0);
    }
    setRunning((previous) => !previous);
    seed();
  };

  const handlePause = () => {
    setRunning(false);
  };

  const handleSlow = () => {
    setSpeed(constants.slowSpeed);
  };

  const handleFast = () => {
    setSpeed(constants.fastSpeed);
  };

  const handleSeed = () => {
    setRunning(false);
    setGenerations(0);
    seed();
  };

  const handleClear = () => {
    setRunning(false);
    setFullGrid(
      Array(rows)
        .fill()
        .map(() => Array(cols).fill(false))
    );
    setGenerations(0);
  };

  // const handleGridSizeChange = async (e) => {
  //   const newRows = e.target.value.split("-")[0];
  //   const newCols = e.target.value.split("-")[1];
  //   // await setFullGrid(
  //   //   Array(newRows)
  //   //     .fill()
  //   //     .map(() => Array(newCols).fill(false))
  //   // );
  //   // setRows(newRows);
  //   // setCols(newCols);
  //   // seed();
  // };

  const play = () => {
    if (!running) {
      return;
    }
    let fullGridClone = JSON.parse(JSON.stringify(fullGrid));

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let count = 0;
        if (i > 0) if (fullGrid[i - 1][j]) count++;
        if (i > 0 && j > 0) if (fullGrid[i - 1][j - 1]) count++;
        if (i > 0 && j < cols - 1) if (fullGrid[i - 1][j + 1]) count++;
        if (j < cols - 1) if (fullGrid[i][j + 1]) count++;
        if (j > 0) if (fullGrid[i][j - 1]) count++;
        if (i < rows - 1) if (fullGrid[i + 1][j]) count++;
        if (i < rows - 1 && j > 0) if (fullGrid[i + 1][j - 1]) count++;
        if (i < rows - 1 && j < cols - 1) if (fullGrid[i + 1][j + 1]) count++;
        if (fullGrid[i][j] && (count < 2 || count > 3))
          fullGridClone[i][j] = false;
        if (!fullGrid[i][j] && count === 3) fullGridClone[i][j] = true;
      }
    }
    setFullGrid(() => fullGridClone);
    setGenerations((prev) => prev + 1);
  };

  return (
    <main className="container">
      <div class="button-section">
        <button type="button" className="btn" onClick={handlePlay}>
          {running ? "Stop" : "Play"}
        </button>
        <button type="button" className="btn" onClick={handlePause}>
          Pause
        </button>
        <button type="button" className="btn" onClick={handleFast}>
          Fast
        </button>
        <button type="button" className="btn" onClick={handleSlow}>
          Slow
        </button>
        <button type="button" className="btn" onClick={handleSeed}>
          Seed
        </button>
        <button type="button" className="btn" onClick={handleClear}>
          Clear
        </button>
        {/* <select onChange={handleGridSizeChange}>
          <option value="30-30">30 X 30</option>
          <option value="30-50" selected>
            30 X 50
          </option>
          <option value="30-70">30 X 70</option>
          <option value="50-30">50 X 30</option>
          <option value="50-50">50 X 50</option>
          <option value="50-70">50 X 70</option>
        </select> */}
      </div>
      <Grid fullGrid={fullGrid} rows={rows} cols={cols} selectBox={selectBox} />
      <h2>Generations: {generations}</h2>
    </main>
  );
};

export default Game;
