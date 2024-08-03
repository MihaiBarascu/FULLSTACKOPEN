import Part from './Part'

const Content = (props) => {
  return (
    <>
      {props.parts.map((item) => (
        <Part key={item.name}name={item.name} exercises={item.exercises}/>
      ))}
    </>
  );
};
export default Content;
