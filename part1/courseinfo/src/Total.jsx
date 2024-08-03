const Total = (props) => {
  const parts = props.parts;
  let total = parts[0].exercises + parts[1].exercises + parts[2].exercises;

  return <p>Number of ecercises  {total}</p>;
};
export default Total;
