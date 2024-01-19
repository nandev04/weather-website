import React from 'react';

const useCustomFetch = () => {
  const request = React.useCallback(
    async (setData, setError, setLoading, address) => {
      try {
        setData(null);
        setLoading(true);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${address.join()}&appid=cb583e83caade67cb06d84f96762d184&units=metric&exclude=current&lang=pt_br`,
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
    },
  );

  return {
    request,
  };
};

export default useCustomFetch;
