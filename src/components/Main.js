import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../redux/actions/index";
import { getCity } from "../scripts/forecast";
import { Container, CardDeck, Form, Button, Alert } from "react-bootstrap";
import icon from "../assets/Favorite-icon.png";
import Cards from "./Cards";

function Main({
  forecast,
  setCityKey,
  cityName,
  setCityName,
  title,
  setTitle,
  cityElement,
  setCityElement,
  index,
  setIndex,
  isCelsius,
  setIsCelsius,
}) {
  const [changeValue, setChangeValue] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [data, setData] = useState(forecast.listReducer.data);

  useEffect(
    () => {
      if (index) {
        setCityName(forecast.listReducer.favorites[index - 1]);
        setData(forecast.listReducer.favorites[index]);
        setTitle(forecast.listReducer.favorites[index][0].Day.IconPhrase);
        setCityElement(forecast.listReducer.favorites[index - 1]);
      }
    },
    data,
    index,
    setTitle,
    cityName,
    cityElement
  );
  const dispatch = useDispatch();
  const changeHandler = (e) => {
    setChangeValue(e.target.value);
  };
  const onClickHandler = () => {
    getCity(changeValue).then((res) => {
      if (res) {
        setIsAlert(false);
        setCityElement(res.LocalizedName + ", " + res.Country.LocalizedName);
        setCityName(res.LocalizedName + ", " + res.Country.LocalizedName);
        setCityKey(res.Key);
        setChangeValue("");
      } else {
        setIsAlert(false);
        setTimeout(() => {
          setIsAlert(true);
        }, 300);
      }
    });
  };
  const addToFavoritesHandler = (city) => {
    dispatch(addToFavorites(city, cityElement));
  };
  const removeFromFavoritesHadnler = (city) => {
    dispatch(removeFromFavorites(city, cityElement));
    if (forecast.listReducer.favorites.length === 0) {
      setIndex(null);
    }
  };
  const changeDegree = () => {
    setIsCelsius((prev) => !prev);
  };
  return (
    <div>
      <Form.Group className="mt-5">
        <Container>
          <Form.Row
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Form.Control
              type="text"
              value={changeValue}
              placeholder="Please enter location name to search"
              onChange={(e) => changeHandler(e)}
            />
            <Container>
              <Button onClick={onClickHandler}>Search</Button>
              {isAlert && (
                <Alert className="m-auto" variant="danger">
                  Please enter valid city name
                </Alert>
              )}
            </Container>
          </Form.Row>
        </Container>
      </Form.Group>
      <Container
        className="border border-dark"
        style={{
          padding: "40px",
        }}
      >
        <div
          className="m-5"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <h4>{cityName}</h4>
          {forecast.listReducer.favorites.includes(cityElement) ? (
            <>
              <img src={icon} style={{ height: "40px" }} />
              <Button
                onClick={() =>
                  removeFromFavoritesHadnler(forecast.listReducer.data)
                }
              >
                Remove from Favorites
              </Button>
            </>
          ) : (
            <Button
              onClick={() => addToFavoritesHandler(forecast.listReducer.data)}
            >
              add to Favorites
            </Button>
          )}
        </div>

        <h2>{title}</h2>
        <div style={{ display: "flex", alignItems: "center", height: "60%" }}>
          <CardDeck>
            {data.map((day, idx) => {
              return (
                <Cards
                  key={idx}
                  date={day.Date.split("T")[0]}
                  degree={
                    isCelsius
                      ? Math.floor(
                          ((day.Temperature.Maximum.Value +
                            day.Temperature.Minimum.Value) /
                            2 -
                            32) *
                            0.5556
                        ) + "°C"
                      : Math.floor(
                          (day.Temperature.Maximum.Value +
                            day.Temperature.Minimum.Value) /
                            2
                        ) + "°F"
                  }
                  days={day.Day.IconPhrase}
                  nights={day.Night.IconPhrase}
                  onClickHandler={null}
                />
              );
            })}
          </CardDeck>
        </div>
        <Button variant="info" onClick={changeDegree}>
          Change to {+isCelsius ? "Pahrenheit" : "Celsius"}
        </Button>
      </Container>
    </div>
  );
}

export default Main;
