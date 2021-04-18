import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";

function Navigation({ theme, setTheme }) {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="justify-content-between">
        <Navbar.Brand>Herolo Weather Task</Navbar.Brand>
        <Nav style={{ display: "flex", gap: "30px" }}>
          <Link to="/" style={{ color: "#fff" }}>
            Home
          </Link>
          <Link to="/favorites" style={{ color: "#fff" }}>
            Favorites
          </Link>
        </Nav>
      </Navbar>
      <Button
        style={{ width: "100%" }}
        variant={theme.mode === "dark" ? "light" : "dark"}
        onClick={(prev) =>
          setTheme(theme.mode === "dark" ? { mode: "light" } : { mode: "dark" })
        }
      >
        Change Theme
      </Button>
    </>
  );
}

export default Navigation;
