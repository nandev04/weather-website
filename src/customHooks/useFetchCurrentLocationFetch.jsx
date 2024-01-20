import React from 'react';

const useFetchCurrentLocationFetch = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const autoRequest = React.useCallback(async (lat, long) => {
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
  });

  return {
    autoRequest,
    setData,
    data,
    setError,
    error,
    setLoading,
    loading,
  };
};

export default useFetchCurrentLocationFetch;
