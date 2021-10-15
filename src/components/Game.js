import { useEffect, useState } from "react";

import Grid from "./Grid";

const Game = () => {
  const rows = 30;
  const cols = 50;
  let speed = 1000;
  const [generations, setGenerations] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
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
        if (Math.floor(Math.random() * 10) <= 2) {
          fullGridClone[i][j] = true;
        }
      }
    }
    setFullGrid(() => fullGridClone);
  };

  const handlePlay = () => {
    let newIntervalId;
    if (intervalId !== null) {
      clearInterval(intervalId);
    }
    newIntervalId = setInterval(play, speed);
    setIntervalId(() => newIntervalId);
  };

  const handlePause = () => {
    console.log(intervalId);

    clearInterval(intervalId);
  };

  const handleSlow = () => {
    clearInterval(intervalId);
    speed = 2000;
    handlePlay();
  };

  const handleFast = () => {
    console.log(intervalId);
    clearInterval(intervalId);
    speed = 500;
    handlePlay();
  };

  const handleSeed = () => {
    clearInterval(intervalId);
    seed();
  };

  const play = () => {
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

    return () => clearInterval(intervalId);
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
