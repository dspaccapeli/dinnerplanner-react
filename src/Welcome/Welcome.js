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
              <p>Welcome to the Dinner Planner app! Here you can order a menu for you and your friends. Select how many of you are there in the sidebar and then select a dish per each type: Appetizers, Main Courses, Side Dishes, Desserts, Salads, Bread, Breakfast, Soup, Beverages, Sauces, Drinks and Desserts. Bon Appetit!</p>

              <Link to="/search">
                  <Button>Start planning</Button>
              </Link>
          </div>
      </Container>
    );
  }
}

export default Welcome;
