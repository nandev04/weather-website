import style from '../styles/modules/Details.module.css';

import React from 'react';

const Details = ({ title, info, character, loading }) => {
  return (
    <div className={style.containerDetails}>
      <h3>{title}</h3>
      <p className={style.details}>
        {loading && <span className={style.loader}></span>}
        {info && info + character}
      </p>
    </div>
  );
};

export default Details;
