import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Button, CardColumns } from "react-bootstrap";
import Cards from "./Cards";

function Favorites({
  forecast,
  cityName,
  index,
  setIndex,
  isCelsius,
  setIsCelsius,
}) {
  const history = useHistory();
  const onClickHandler = (idx) => {
    setIndex(idx);
    history.push("/");
  };
  const changeDegree = () => {
    setIsCelsius((prev) => !prev);
  };
  return (
    <div>
      {forecast.listReducer.favorites.length > 0 ? (
        <>
          <Container
            className="mt-5"
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <CardColumns>
              {forecast.listReducer.favorites.map((element, idx) => {
                if (idx % 2 === 1)
                  return (
                    <Cards
                      key={idx}
                      idx={idx}
                      date={element[0].Date.split("T")[0]}
                      degree={
                        isCelsius
                          ? Math.floor(
                              ((element[0].Temperature.Maximum.Value +
                                element[0].Temperature.Minimum.Value) /
                                2 -
                                32) *
                                0.5556
                            ) + "°C"
                          : Math.floor(
                              (element[0].Temperature.Maximum.Value +
                                element[0].Temperature.Minimum.Value) /
                                2
                            ) + "°F"
                      }
                      days={element[0].Day.IconPhrase}
                      nights={element[0].Night.IconPhrase}
                      cityName={forecast.listReducer.favorites[idx - 1]}
                      onClickHandler={onClickHandler}
                    />
                  );
              })}
            </CardColumns>
          </Container>
          <Button variant="info" onClick={changeDegree}>
            Change to {+isCelsius ? "Pahrenheit" : "Celsius"}
          </Button>
        </>
      ) : (
        <Container className="mt-5">
          <h3>Please enter cities to favorites</h3>
          <Link to="/">
            <Button>MAIN</Button>
          </Link>
        </Container>
      )}
    </div>
  );
}

export default Favorites;
