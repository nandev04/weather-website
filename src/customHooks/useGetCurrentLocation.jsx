import React from 'react';
import useFetchCurrentLocationFetch from './useFetchCurrentLocationFetch';

const useGetCurrentLocation = () => {
  const { setError } = useFetchCurrentLocationFetch();

  const [lat, setLat] = React.useState(null);
  const [long, setLong] = React.useState(null);

  const requestGetCurrentLocation = React.useCallback(() => {
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
                setError(
                  'Ocorreu um erro desconhecido ao obter a localização.',
                );
                break;
            }
          },
        );
      }
    }
    getCurrentLocation();
  });

  return {
    requestGetCurrentLocation,
    lat,
    long,
  };
};

export default useGetCurrentLocation;
