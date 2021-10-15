import Box from "./Box";

const Grid = (props) => {
  const gridStyle = {
    gridTemplateColumns: `repeat(${props.cols}, 1fr)`,
  };

  let rowsArray = [];
  let boxClass;
  for (let i = 0; i < props.rows; i++) {
    for (let j = 0; j < props.cols; j++) {
      let boxId = `${i}_${j}`;
      boxClass = props.fullGrid[i][j] ? "box on" : "box off";

      rowsArray.push(
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

  return (
    <div className="main_grid debug" style={gridStyle}>
      {rowsArray}
    </div>
  );
};

export default Grid;
