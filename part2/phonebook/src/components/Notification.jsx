const Notification = ({ message }) => {
  if (!message) {
    return null;
  }

  const color = message.includes("already") ? "red" : "green";

  const style = {
    background: "lightGray",
    borderRadius: 5,
    borderColor: color,
    borderStyle: "solid",

    fontSize: 20,
    padding: 10,
    color,
    marginBottom: 10,
  };
  return <div style={style}>{message}</div>;
};

export default Notification;
