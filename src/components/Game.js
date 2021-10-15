import { useEffect, useState } from "react";

import Grid from "./Grid";

const Game = () => {
  const rows = 30;
  const cols = 50;
  const [generations, setGenerations] = useState(0);
  const [speed, setSpeed] = useState(100);
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
    let fullGridClone = JSON.parse(JSON.stringify(fullGrid));
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (Math.floor(Math.random() * 10) === 1) {
          fullGridClone[i][j] = true;
        }
      }
    }
    setFullGrid(() => fullGridClone);
  };

  useEffect(() => {
    seed();
  }, []);

  return (
    <main className="container debug">
      <Grid fullGrid={fullGrid} rows={rows} cols={cols} selectBox={selectBox} />
      <h2>Generations: {generations}</h2>
    </main>
  );
};

export default Game;
