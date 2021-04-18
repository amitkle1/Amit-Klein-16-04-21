import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "./redux/actions";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { getGeopositionWeather } from "./scripts/forecast";
import Navigation from "./components/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Main from "./components/Main";
import Favorites from "./components/Favorites";

function App() {
  const [cityKey, setCityKey] = useState(215854); // tel aviv
  const [cityName, setCityName] = useState("Tel Aviv, Israel");
  const [cityElement, setCityElement] = useState("Tel Aviv, Israel");
  const [index, setIndex] = useState(null);
  const [title, setTitle] = useState("");
  const [isCelsius, setIsCelsius] = useState(true);
  const [theme, setTheme] = useState({ mode: "light" });
  const [geoPosition, setGeoPosition] = useState(null);

  const GlobalStyle = createGlobalStyle`
body{
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#111" : "#EEE"};
  color:${(props) => (props.theme.mode === "dark" ? `#777777` : "#111")};
}`;

  const forecast = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setGeoPosition(
        position.coords.latitude + "," + position.coords.longitude
      );
    });
    if (geoPosition) {
      getGeopositionWeather(geoPosition).then((res) => {
        setCityKey(res.Key);
        setCityName(res.LocalizedName + ", " + res.Country.LocalizedName);
        setCityElement(res.LocalizedName + ", " + res.Country.LocalizedName);
      });
    }
  }, [geoPosition]);

  useEffect(() => {
    dispatch(getData(cityKey));
    setTitle(forecast.listReducer.data[0]?.Day.IconPhrase);
  }, [cityKey, forecast.listReducer.data[0]?.Day.IconPhrase, cityName]);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <GlobalStyle />

        <Router>
          <Navigation theme={theme} setTheme={setTheme} />
          <div className="App">
            <Switch>
              <Route exact path="/">
                {forecast.listReducer.data.length && (
                  <Main
                    forecast={forecast}
                    cityKey={cityKey}
                    setCityKey={setCityKey}
                    cityName={cityName}
                    setCityName={setCityName}
                    title={title}
                    setTitle={setTitle}
                    cityElement={cityElement}
                    setCityElement={setCityElement}
                    index={index}
                    setIndex={setIndex}
                    isCelsius={isCelsius}
                    setIsCelsius={setIsCelsius}
                  />
                )}
              </Route>
              <Route exact path="/favorites">
                <Favorites
                  forecast={forecast}
                  cityName={cityName}
                  index={index}
                  setIndex={setIndex}
                  isCelsius={isCelsius}
                  setIsCelsius={setIsCelsius}
                />
              </Route>
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
