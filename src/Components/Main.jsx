import React from 'react';
import style from '../styles/modules/Main.module.css';
import logo from '../assets/logo.png';

const Main = () => {
  const [temperature, setTemperature] = React.useState('');
  const [minTemperature, setMinTemperature] = React.useState('');
  const [maxTemperature, setMaxTemperature] = React.useState('');
  const [pressure, setPressure] = React.useState('');
  const [humidity, setHumidity] = React.useState('');
  const [feelLike, setFeelLike] = React.useState('');
  const [wind, setWind] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [city, setCity] = React.useState('');
  const [monthName, setMonthName] = React.useState('');
  const [lat, setLat] = React.useState(null);
  const [long, setLong] = React.useState(null);

  const currentDate = new Date();
  const day = currentDate.getDate();
  const monthNumber = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  function convertNumberToName() {
    switch (monthNumber) {
      case 1:
        setMonthName('Janeiro');
        break;
      case 2:
        setMonthName('Fevereiro');
        break;
      case 3:
        setMonthName('Março');
        break;
      case 4:
        setMonthName('Abril');
        break;
      case 5:
        setMonthName('Maio');
        break;
      case 6:
        setMonthName('Junho');
        break;
      case 7:
        setMonthName('Julho');
        break;
      case 8:
        setMonthName('Agosto');
        break;
      case 9:
        setMonthName('Setembro');
        break;
      case 10:
        setMonthName('Outubro');
        break;
      case 11:
        setMonthName('Novembro');
        break;
      case 12:
        setMonthName('Dezembro');
        break;
    }
  }

  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
    }
  }

  function fetchCurrentLocation() {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=cb583e83caade67cb06d84f96762d184&units=metric&exclude=current&lang=pt_br`,
    )
      .then((response) => response.json())
      .then((json) => {
        setTemperature(Math.trunc(json.main.temp));
        setMinTemperature(Math.trunc(json.main.temp_min));
        setMaxTemperature(Math.trunc(json.main.temp_max));
        setPressure(json.main.pressure);
        setHumidity(json.main.humidity);
        setFeelLike(Math.trunc(json.main.feels_like));
        setWind(json.wind.speed);
        setDescription(
          `${json.weather[0].description
            .charAt(0)
            .toUpperCase()}${json.weather[0].description.substring(1)}`,
        );
        setCity(json.name);
      });
  }

  React.useEffect(() => {
    fetchCurrentLocation();
  }, [lat, long]);

  React.useEffect(() => {
    convertNumberToName();
    getCurrentLocation();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.grid}>
        <main className={style.info}>
          <input type="text" placeholder="Pesquise sua cidade" />
          <img src={logo} alt="Imagem representando o clima" />
          <p className={style.temperature}>{temperature}°C</p>
          <p className={style.generalInfo}>{description}</p>
          <div className={style.infoDay}>
            <p className={style.date}>
              {day && day}-{monthName && monthName}-{year && year}
            </p>
            <p>Friday, 12:44 PM</p>
            <p>Day</p>
          </div>
          <h2 className={style.city}>{city}</h2>
        </main>
        <section className={style.moreInfo}>
          <header className={style.navigationDay}>
            <ul>
              <li className={style.active}>Today</li>
            </ul>
          </header>
          <div className={style.gridDetails}>
            <div>
              <h3>Wind</h3>
              <p className={style.details}>
                {Math.trunc(wind && wind * 3.6)} km/h
              </p>
            </div>
            <div>
              <h3>Humidity</h3>
              <p className={style.details}>{humidity && humidity}%</p>
            </div>
            <div>
              <h3>Real Feel</h3>
              <p className={style.details}>{feelLike && feelLike}°C</p>
            </div>
            <div>
              <h3>Temperatura mínima</h3>
              <p className={style.details}>
                {minTemperature && minTemperature}°C
              </p>
            </div>
            <div>
              <h3>Temperatura máxima</h3>
              <p className={style.details}>
                {maxTemperature && maxTemperature}°C
              </p>
            </div>
            <div>
              <h3>Pressão</h3>
              <p className={style.details}>{pressure && pressure} hPa</p>
            </div>
          </div>
          <footer>Todos os dados fornecidos pelo OpenWeather</footer>
        </section>
      </div>
    </div>
  );
};

export default Main;
