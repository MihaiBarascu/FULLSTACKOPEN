import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import services from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const personsToShow =
    filter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );

  useEffect(() => {
    services.getAll().then((result) => {
      setPersons(result);
    });
  }, []);

  const handleAdd = (event) => {
    event.preventDefault();
    const person = persons.find((person) => person.name === newName);
    if (person) {
      updateNumber(person);
    } else if (persons.some((person) => person.number === newNumber)) {
      alert(`Number ${newNumber} is allready added to phonebook`);
    } else {
      const newPerson = { name: newName, number: newNumber };

      services
        .create(newPerson)
        .then((person) => setPersons(persons.concat(person)));

      setNewNumber("");
      setNewName("");
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
  };

  const handleDelete = (id) => {
    const person = persons.find((person) => person.id === id);
    const confirmation = window.confirm(`Delete ${person.name} ?`);

    if (confirmation) {
      services
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id != id));
        })
        .catch(() => {
          alert(`${person.name} is allready deleted from phonebook`);
        });
    }
  };

  const updateNumber = (person) => {
    const confirmation = window.confirm(
      `${person.name} is allready added to phonebook, replace the old number with a new one?`
    );

    if (confirmation) {
      services
        .update(person.id, { ...person, number: newNumber })
        .then((updatedPerson) => {
          setPersons(
            persons.map((pers) =>
              pers.id === updatedPerson.id ? updatedPerson : pers
            )
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
      <Persons persons={personsToShow} onDelete={handleDelete} />
    </div>
  );
};

export default App;
