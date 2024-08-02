const Content = (props) => {
  return (
    <>
      {props.parts.map((item) => (
        <p key={item.name}>
          {item.name} {item.exercises}{" "}
        </p>
      ))}
    </>
  );
};
export default Content;
