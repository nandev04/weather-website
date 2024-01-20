import React from 'react';

const useDates = () => {
  const [dayPeriod, setDayPeriod] = React.useState(null);
  const [monthName, setMonthName] = React.useState('');

  const currentDate = new Date();
  const hour = currentDate.getHours();
  const dayName = currentDate.getDay();
  const minutes = currentDate.getMinutes();
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
  const requestDate = React.useCallback(() => {
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
    convertNumberToName();
  });
  return {
    requestDate,
    monthName,
    dayPeriod,
    day,
    hour,
    year,
    dayName,
    minutes,
    weekDay,
  };
};

export default useDates;
