import { getFiveDaysWeather } from "../../scripts/forecast";

export const addToFavorites = (city, cityElement) => {
  return {
    type: "ADD_TO_FAVORITES",
    payload: city,
    cityElement,
  };
};
export const removeFromFavorites = (city, cityElement) => {
  return {
    type: "REMOVE_FROM_FAVORITES",
    payload: city,
    cityElement,
  };
};

export const getData = (cityKey) => {
  return (dispatch) => {
    getFiveDaysWeather(cityKey).then((res) =>
      dispatch({
        type: "FETCH_DATA",
        payload: res.DailyForecasts,
      })
    );
  };
};
