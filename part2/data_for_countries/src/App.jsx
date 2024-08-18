import { useState, useEffect } from "react";
import FindCountries from "./FindCountries";
import Countries from "./Countries";
import axios from "axios";
import Country from "./Country";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const countriesToShow = filter
    ? countries.filter((country) => {
        return country.name.common.toLowerCase().includes(filter.toLowerCase());
      })
    : [];

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const handleShowClick = (newFilterValue) => {
    setFilter(newFilterValue);
  };

  return (
    <>
      <FindCountries filter={filter} onFilterChange={handleFilterChange} />

      {countriesToShow.length === 1 ? (
        <Country
          key={countriesToShow[0].name.common}
          country={countriesToShow[0]}
        />
      ) : (
        <Countries onShowClick={handleShowClick} countries={countriesToShow} />
      )}
    </>
  );
}

export default App;
