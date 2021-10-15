const Box = (props) => {
  const handleOnClick = () => {
    props.selectBox(props.row, props.col);
  };
  return (
    <div
      className={props.boxClass}
      id={props.boxId}
      onClick={handleOnClick}
    ></div>
  );
};

export default Box;
