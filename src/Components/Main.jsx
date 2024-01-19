import React from 'react';
import style from '../styles/modules/Main.module.css';
import Details from './Details';
import useCurrentLocationFetch from '../customHooks/useCurrentLocationFetch';
import useCustomFetch from '../customHooks/useCustomFetch';

const Main = () => {
  const [monthName, setMonthName] = React.useState('');
  const [lat, setLat] = React.useState(null);
  const [long, setLong] = React.useState(null);

  // States fetch
  const [address, setAddress] = React.useState(null);

  //Fetch hooks
  const { autoRequest, data, setData, loading, setLoading, error, setError } =
    useCurrentLocationFetch(lat, long);
  const { request } = useCustomFetch();

  // Get dates and hours
  const [dayPeriod, setDayPeriod] = React.useState(null);
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
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert(
                'Permissão para acessar a localização foi negada. Permita o acesso ou pesquise sua cidade na barra de busca.',
              );
              break;
            case error.POSITION_UNAVAILABLE:
              setError('Informações de localização não estão disponíveis.');
              break;
            case error.TIMEOUT:
              setError(
                'A solicitação para obter a localização do usuário expirou.',
              );
              break;
            case error.UNKNOWN_ERROR:
              setError('Ocorreu um erro desconhecido ao obter a localização.');
              break;
          }
        },
      );
    }
  }

  React.useEffect(() => {
    if (lat && long) autoRequest(lat, long, setError, setLoading, setData);
  }, [lat && long]);

  React.useEffect(() => {
    convertNumberToName();
    getCurrentLocation();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.grid}>
        <main className={style.info}>
          <form
            className={style.containerSearch}
            onSubmit={(event) => {
              event.preventDefault();
              request(setData, setError, setLoading, address);
            }}
          >
            <input
              type="text"
              placeholder={'City, State, Country'}
              className={style.searchInput}
              onChange={({ target }) => setAddress(target.value.split(','))}
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
              {data && data.name}
              {error && error.toString()}
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
            <Details
              title={'Velocidade do vento'}
              info={data && Math.trunc(data.wind.speed * 3.6)}
              character={' km/h'}
              loading={loading}
            />

            <Details
              title={'Humidade'}
              info={data && data.main.humidity}
              character={'%'}
              loading={loading}
            />

            <Details
              title={'Sensação térmica'}
              info={data && Math.trunc(data.main.feels_like)}
              character={'°C'}
              loading={loading}
            />

            <Details
              title={'Temperatura mínima'}
              info={data && Math.trunc(data.main.temp_min)}
              character={'°C'}
              loading={loading}
            />

            <Details
              title={'Temperatura máxima'}
              info={data && Math.trunc(data.main.temp_max)}
              character={'°C'}
              loading={loading}
            />

            <Details
              title={'Pressão'}
              info={data && data.main.pressure}
              character={'  hPa'}
              loading={loading}
            />
          </div>
          <footer>Todos os dados fornecidos pelo OpenWeather</footer>
        </section>
      </div>
    </div>
  );
};

export default Main;
