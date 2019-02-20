import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button";


class Welcome extends Component {
  render() {
    return (
      <Container fluid={"true"}>
          <div className="Welcome">
              <p>Welcome to the dinner planner React Startup code!
                  Change me with the full options, as in the prev labs</p>

              <Link to="/search">
                  <Button>Start planning</Button>
              </Link>
          </div>
      </Container>
    );
  }
}

export default Welcome;
