import Person from "./Person";
const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person
          key={person.id}
          name={person.name}
          number={person.number}
          onDelete={() => onDelete(person.id)}
        />
      ))}
    </div>
  );
};

export default Persons;
