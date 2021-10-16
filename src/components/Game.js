import { useEffect, useState } from "react";

import Grid from "./Grid";
import useInterval from "../hooks/useInterval";

const Game = () => {
  const rows = 30;
  const cols = 50;
  const [generations, setGenerations] = useState(0);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [fullGrid, setFullGrid] = useState(
    Array(rows)
      .fill()
      .map(() => Array(cols).fill(false))
  );

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
        if (Math.floor(Math.random() * 10) <= 3) {
          fullGridClone[i][j] = true;
        }
      }
    }
    setFullGrid(() => fullGridClone);
  };

  const handlePlay = () => {
    setRunning(true);
  };

  useInterval(() => {
    play();
  }, speed);

  const handlePause = () => {
    setRunning(false);
  };

  const handleSlow = () => {
    setSpeed(1000);
  };

  const handleFast = () => {
    setSpeed(100);
  };

  const handleSeed = () => {
    seed();
  };

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

  useEffect(() => {
    seed();
  }, []);

  return (
    <main className="container">
      <div class="button-section">
        <button type="button" className="btn" onClick={handlePlay}>
          Play
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
      </div>
      <Grid fullGrid={fullGrid} rows={rows} cols={cols} selectBox={selectBox} />
      <h2>Generations: {generations}</h2>
    </main>
  );
};

export default Game;
