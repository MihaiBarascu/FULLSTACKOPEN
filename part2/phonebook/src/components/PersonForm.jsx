const PersonForm = ({ name, number, onNameChange, onNumberChange, onAdd }) => {
  return (
    <div>
      <form>
        <div>
          name: <input value={name} onChange={onNameChange} />
        </div>
        <div>
          number :<input value={number} onChange={onNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={onAdd}>
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
