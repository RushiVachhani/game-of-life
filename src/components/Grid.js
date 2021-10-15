import { useEffect, useState } from "react";
import Box from "./Box";

const Grid = (props) => {
  const gridStyle = {
    gridTemplateColumns: `repeat(${props.cols}, 1fr)`,
  };
  const [rowsArray, setRowsArray] = useState([]);

  useEffect(() => {
    initializeArrayWithBox();
  }, [props]);

  const initializeArrayWithBox = () => {
    let newRowsArray = [];
    let boxClass;
    for (let i = 0; i < props.rows; i++) {
      for (let j = 0; j < props.cols; j++) {
        let boxId = `${i}_${j}`;
        boxClass = props.fullGrid[i][j] ? "box on" : "box off";

        newRowsArray.push(
          <Box
            boxClass={boxClass}
            boxId={boxId}
            key={boxId}
            row={i}
            col={j}
            selectBox={props.selectBox}
          />
        );
      }
    }
    setRowsArray(() => newRowsArray);
  };

  return (
    <div className="main_grid" style={gridStyle}>
      {rowsArray}
    </div>
  );
};

export default Grid;
