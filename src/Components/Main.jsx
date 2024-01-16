import React from 'react';
import style from '../styles/modules/Main.module.css';

const Main = () => {
  const [monthName, setMonthName] = React.useState('');
  const [lat, setLat] = React.useState(null);
  const [long, setLong] = React.useState(null);

  // State search
  const [city, setCity] = React.useState(null);
  console.log(city);

  // State fetch
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [dayPeriod, setDayPeriod] = React.useState(null);

  // Get dates and hours
  const currentDate = new Date();
  const day = currentDate.getDate();
  const monthNumber = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const weekDay = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ];

  const hour = currentDate.getHours();
  const dayName = currentDate.getDay();
  const minutes = currentDate.getMinutes();

  function convertNumberToName() {
    if (hour >= 6 && hour < 12) {
      setDayPeriod('Manhã');
    } else if (hour >= 12 && hour < 18) {
      setDayPeriod('Tarde');
    } else {
      setDayPeriod('Noite');
    }

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
    try {
      setData(null);
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

  async function fetchSpecificCity() {
    try {
      setData(null);
      setLoading(true);
      const response = await fetch(`//Arrumar o erro aqui`);
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
          <form className={style.containerSearch} onSubmit={fetchSpecificCity}>
            <input
              type="text"
              placeholder="Pesquise sua cidade"
              className={style.searchInput}
              onChange={({ target }) => setCity(target.value)}
            />
            <button className={style.searchEnter}></button>
          </form>

          <div className={style.mainInfo}>
            <p className={style.temperature}>
              {loading && <span className={style.loader}></span>}
              {data && Math.trunc(data.main.temp) + '°C'}
            </p>
            <p className={style.generalInfo}>
              {data &&
                `${data.weather[0].description
                  .charAt(0)
                  .toUpperCase()}${data.weather[0].description.slice(1)}
                  `}
              {data && (
                <img
                  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                  alt="Imagem ilustrativa sobre o clima atual"
                />
              )}
            </p>
            <div className={style.infoDay}>
              {data && <p>Ultima atualização em:</p>}
              <p className={style.date}>
                {day && day}-{monthName && monthName}-{year && year}
              </p>
              <p>
                {weekDay[dayName]}, {hour}:{minutes.toString().padStart(2, '0')}
              </p>
              <p>{dayPeriod}</p>
            </div>
            <h2 className={style.city}>
              {data && data.name} {error && error.toString()}
            </h2>
          </div>
        </main>
        <section className={style.moreInfo}>
          <header className={style.navigationDay}>
            <ul>
              <li className={style.active}>Today</li>
            </ul>
          </header>
          <div className={style.gridDetails}>
            <div>
              <h3>Velocidade do vento</h3>
              <p className={style.details}>
                {loading && <span className={style.loader}></span>}
                {data && Math.trunc(data.wind.speed * 3.6) + ' km/h'}
              </p>
            </div>
            <div>
              <h3>Humidade</h3>

              <p className={style.details}>
                {loading && <span className={style.loader}></span>}
                {data && data.main.humidity + '%'}
              </p>
            </div>
            <div>
              <h3>Real Feel</h3>
              <p className={style.details}>
                {loading && <span className={style.loader}></span>}
                {data && Math.trunc(data.main.feels_like) + '°C'}
              </p>
            </div>
            <div>
              <h3>Temperatura mínima</h3>
              <p className={style.details}>
                {loading && <span className={style.loader}></span>}
                {data && Math.trunc(data.main.temp_min) + '°C'}
              </p>
            </div>
            <div>
              <h3>Temperatura máxima</h3>
              <p className={style.details}>
                {loading && <span className={style.loader}></span>}
                {data && Math.trunc(data.main.temp_max) + '°C'}
              </p>
            </div>
            <div>
              <h3>Pressão</h3>

              <p className={style.details}>
                {loading && <span className={style.loader}></span>}
                {data && data.main.pressure + ' hPa'}{' '}
              </p>
            </div>
          </div>
          <footer>Todos os dados fornecidos pelo OpenWeather</footer>
        </section>
      </div>
    </div>
  );
};

export default Main;
