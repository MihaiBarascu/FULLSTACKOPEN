import axios from "axios";
import { useEffect, useState } from "react";

const Countries = ({ countries, onShowClick }) => {
  if (countries.length < 1) {
    return null;
  }
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  if (countries.length != 1) {
    return (
      <div>
        {countries.map((country) => {
          return (
            <div key={country.name.official}>
              {country.name.common}{" "}
              <button onClick={() => onShowClick(country.name.common)}>
                show
              </button>
            </div>
          );
        })}
      </div>
    );
  }
};

export default Countries;
