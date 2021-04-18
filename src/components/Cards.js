import { Button } from "react-bootstrap";
import React from "react";
import Card from "react-bootstrap/Card";

function Cards({ idx, date, degree, days, nights, cityName, onClickHandler }) {
  return (
    <Card
      style={{ width: "18rem", cursor: cityName ? "pointer" : "default" }}
      onClick={onClickHandler ? () => onClickHandler(idx) : null}
    >
      <Card.Body>
        <Card.Title>
          {cityName ? cityName : date.split("-").reverse().join("/")}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{degree}</Card.Subtitle>{" "}
        <Card.Text>{"Day: " + days}</Card.Text>
        <Card.Text>{"Night: " + nights}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Cards;
