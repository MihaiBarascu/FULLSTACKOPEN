import { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ country }) => {
  const languages = Object.entries(country.languages);
  const apiKey = import.meta.env.VITE_SOME_KEY;
  const countryFlagURL = country.flags.png;
  const [temperature, setTemperature] = useState(undefined);
  const [wind, setWind] = useState(undefined);
  const [imgUrl, setImgUrl] = useState(undefined);
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]},${country.cca2}&appid=${apiKey}&units=metric`
      )
      .then((response) => {
        setTemperature(response.data.main.temp);
        setWind(response.data.wind.speed);
        setImgUrl(
          `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
        );
      });
  }, [country]);
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div> capital {country.capital.map((capital) => capital)}</div>
      <div> area {country.area} </div>

      <p>
        <b>languages</b>
      </p>
      <ul>
        {languages ? languages.map((l) => <li key={l[1]}>{l[1]}</li>) : null}
      </ul>
      <img style={{ width: 150 }} src={countryFlagURL} alt="" />
      {temperature && wind && imgUrl ? (
        <div>
          <h3>Weather in {country.capital[0]}</h3>

          <div>temperature {temperature} Celsius</div>

          <img src={imgUrl} />
          <div>wind {wind} m/s</div>
        </div>
      ) : null}
    </div>
  );
};

export default Country;
