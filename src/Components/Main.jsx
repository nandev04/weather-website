import React from 'react';
import style from '../styles/modules/Main.module.css';

// Colocar ícone do clima
//`http://openweathermap.org/img/w/${data.weather[0].icon}.png`,

const Main = () => {
  const [monthName, setMonthName] = React.useState('');
  const [lat, setLat] = React.useState(null);
  const [long, setLong] = React.useState(null);
  const [weatherImg, setWeatherImg] = React.useState(null);

  // State fetch
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

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

  async function fetchCurrentLocation() {
    let responseImg;
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=cb583e83caade67cb06d84f96762d184&units=metric&exclude=current&lang=pt_br`,
      );
      if (!response.ok)
        throw new Error('Ocorreu um erro ao solicitar os dados');
      const json = await response.json();
      setError(null);
      setData(json);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  console.log(data);

  React.useEffect(() => {
    if (lat && long) fetchCurrentLocation();
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
          <p className={style.temperature}>
            {data && Math.trunc(data.main.temp)}°C
          </p>
          <p className={style.generalInfo}>
            {data &&
              data.weather[0].description.charAt(0).toUpperCase() +
                data.weather[0].description.slice(1)}
          </p>
          <div className={style.infoDay}>
            <p className={style.date}>
              {day && day}-{monthName && monthName}-{year && year}
            </p>
            <p>Friday, 12:44 PM</p>
            <p>Day</p>
          </div>
          <h2 className={style.city}>
            {data && data.name} {error && error.toString()}
          </h2>
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
                {Math.trunc(data && data.wind.speed * 3.6)} km/h
              </p>
            </div>
            <div>
              <h3>Humidade</h3>
              <p className={style.details}>{data && data.main.humidity}%</p>
            </div>
            <div>
              <h3>Real Feel</h3>
              <p className={style.details}>
                {Math.trunc(data && data.main.feels_like)}°C
              </p>
            </div>
            <div>
              <h3>Temperatura mínima</h3>
              <p className={style.details}>
                {Math.trunc(data && data.main.temp_min)}°C
              </p>
            </div>
            <div>
              <h3>Temperatura máxima</h3>
              <p className={style.details}>
                {Math.trunc(data && data.main.temp_max)}°C
              </p>
            </div>
            <div>
              <h3>Pressão</h3>
              <p className={style.details}>{data && data.main.pressure} hPa</p>
            </div>
          </div>
          <footer>Todos os dados fornecidos pelo OpenWeather</footer>
        </section>
      </div>
    </div>
  );
};

export default Main;
