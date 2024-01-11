import React from 'react';
import style from '../styles/modules/Main.module.css';
import predoNublado from '../assets/predominantemente-nublado.svg';

const Main = () => {
  return (
    <div className={style.container}>
      <div className={style.grid}>
        <main className={style.info}>
          <input type="text" placeholder="Pesquise sua cidade" />
          <img
            src={predoNublado}
            alt="Imagem representando um clima predominantemente nublado"
          />
          <span className={style.temperature}>31°C</span>
          <p className={style.generalInfo}>Mostly Cloudy</p>
          <div className={style.infoDay}>
            <p className={style.date}>21-July-2023</p>
            <p>Friday, 12:44 PM</p>
            <p>Day</p>
          </div>
          <h2 className={style.city}>Dhaka</h2>
        </main>
        <section className={style.moreInfo}>
          <header className={style.navigationDay}>
            <ul>
              <li className={style.active}>Today</li>
              <li>Tomorrow</li>
            </ul>
          </header>
          <div className={style.gridDetails}>
            <div>
              <h3>Wind</h3>
            </div>
            <div>
              <h3>Humidity</h3>
            </div>
            <div>
              <h3>Real Feel</h3>
            </div>
            <div>
              <h3>UV Index</h3>
            </div>
            <div>
              <h3>Pressure</h3>
            </div>
            <div>
              <h3>Chance of rain</h3>
            </div>
            <div>
              <h3>Temperature History</h3>
            </div>
            <div>
              <h3>Sun</h3>
            </div>
            <div>
              <h3>Moon</h3>
            </div>
          </div>
          <footer>Todos os dados fornecidos pelo OpenWeather</footer>
        </section>
      </div>
    </div>
  );
};

export default Main;
