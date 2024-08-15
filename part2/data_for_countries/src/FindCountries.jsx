const FindCountries = ({ onFilterChange, filter }) => {
  return (
    <div>
      <form>
        find countries{" "}
        <input value={filter} onChange={(event) => onFilterChange(event)} />
      </form>
    </div>
  );
};

export default FindCountries;
