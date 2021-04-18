const key = "NWLREzkgLeTQd8wxXLeEGeDA5kBsyF93";

//get weather information
const getWeather = async (id) => {
  const base = "https://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${key}`;
  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];
};

//get 5 days weather information
const getFiveDaysWeather = async (id) => {
  const base = "https://dataservice.accuweather.com/forecasts/v1/daily/5day/";
  const query = `${id}?apikey=${key}`;
  const response = await fetch(base + query);
  const data = await response.json();
  return data;
};

//get city information
const getCity = async (city) => {
  const base =
    "https://dataservice.accuweather.com/locations/v1/cities/autocomplete";
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];
};

const getGeopositionWeather = async (position) => {
  const base =
    "https://dataservice.accuweather.com/locations/v1/cities/geoposition/search";
  const query = `?apikey=${key}&q=${position}`;
  const response = await fetch(base + query);
  const data = await response.json();
  return data;
};

export { getWeather, getCity, getFiveDaysWeather, getGeopositionWeather };
