import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const [filteredPersons, setFilteredPersons] = useState(persons);

  const handleAdd = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is allready added to phonebook`);
    } else if (persons.some((person) => person.number === newNumber)) {
      alert(`Number ${newNumber} is allready added to phonebook`);
    } else {
      const newPersons = persons.concat({ name: newName, number: newNumber });
      setPersons(newPersons);
      setNewNumber("");
      setNewName("");
      setFilter("");
      setFilteredPersons(newPersons);
    }
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);

    setFilteredPersons(
      persons.filter(
        (person) =>
          person.name.includes(value.toUpperCase()) ||
          person.name.includes(value.toLowerCase())
      )
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        name={newName}
        number={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onAdd={handleAdd}
      />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
