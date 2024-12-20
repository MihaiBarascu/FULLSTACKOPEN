import { useState } from "react";
import Anecdote from "./Anecdote";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [mostVoted, setMostVoted] = useState(0);

  const handleNext = () => {
    const index = Math.floor(Math.random() * anecdotes.length);
    setSelected(index);
  };

  const handleVote = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
    if (votesCopy[selected] > votesCopy[mostVoted]) {
      setMostVoted(selected);
    }
  };

  return (
    <>
      <Anecdote text="Anecdote of the day" anecdote={anecdotes[selected]} />
      <div>has {votes[selected]} votes</div>
      <button onClick={handleVote}>vote</button>

      <button onClick={handleNext}>next anecdote</button>
      <Anecdote
        text="Anecdote with most votes"
        anecdote={anecdotes[mostVoted]}
      />
    </>
  );
};

export default App;
