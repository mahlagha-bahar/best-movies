import React, { useContext } from "react";
import { Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function nav() {
  const { user } = useContext(UserContext);

  function handleLogin() {
    fetch(
      "https://api.themoviedb.org/3/authentication/token/new?api_key=86ba05b5b5ef9e6cd98405fff0572996"
    )
      .then((r) => r.json())
      .then((data) => {
        setUser(data.request_token);
        window.location = `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=http://localhost:3000/auth`;
      });
  }

  return (
    <Row>
      <Col>
        <Button>
          <Link to="/">Home</Link>
        </Button>
        <Button>
          {" "}
          <Link to="/about">About</Link>
        </Button>
      </Col>
      <Col>
        {user ? user.username : <Button onClick={handleLogin()}>Login</Button>}
      </Col>
    </Row>
  );
}
