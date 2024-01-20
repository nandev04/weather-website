import React from 'react';
import style from '../styles/modules/Main.module.css';
import Details from './Details';
import useCurrentLocationFetch from '../customHooks/useCurrentLocationFetch';
import useCustomFetch from '../customHooks/useCustomFetch';
import useDates from '../customHooks/useDates';

const Main = () => {
  // State fetch
  const [lat, setLat] = React.useState(null);
  const [long, setLong] = React.useState(null);
  const [address, setAddress] = React.useState(null);

  //Fetch hooks
  const { autoRequest, data, setData, loading, setLoading, error, setError } =
    useCurrentLocationFetch(lat, long);
  const { request } = useCustomFetch();

  // Date hook
  const {
    requestDate,
    monthName,
    dayPeriod,
    day,
    hour,
    year,
    dayName,
    minutes,
    weekDay,
  } = useDates();

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
    requestDate();
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
