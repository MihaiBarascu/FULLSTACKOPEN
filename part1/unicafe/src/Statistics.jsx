import StatisticsLine from "./StatisticsLine";

const Statistics = ({ feedbacks, good, neutral, bad }) => {
  const average = () => {
    const sum = feedbacks.reduce((acc, curr) => acc + curr, 0);
    return sum / feedbacks.length;
  };

  const positivePercentage = () => {
    const positiveCounter = feedbacks.reduce(
      (acc, curr) => (curr > 0 ? acc + 1 : acc),
      0
    );
    return (positiveCounter / feedbacks.length) * 100;
  };

  if (!feedbacks.length) {
    return (
      <>
        <h1>statistics</h1>
        No feedback given
      </>
    );
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />

          <StatisticsLine text="neutral" value={neutral} />

          <StatisticsLine text="bad" value={bad} />

          <StatisticsLine text="all" value={feedbacks.length} />

          <StatisticsLine text="average" value={average()} />

          <StatisticsLine text="positive" value={positivePercentage() + " %"} />
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
