import { useState } from "react";
import Statistics from "./Statistics";
import Button from "./Button";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [feedbacks, setfeedbacks] = useState([]);

  const handleGood = () => {
    setGood(good + 1);
    setfeedbacks(feedbacks.concat(1));
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setfeedbacks(feedbacks.concat(0));
  };
  const handleBad = () => {
    setBad(bad + 1);
    setfeedbacks(feedbacks.concat(-1));
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <Statistics
        feedbacks={feedbacks}
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  );
};

export default App;
