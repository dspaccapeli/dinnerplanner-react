import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Dishes from "../Dishes/Dishes";
import "./SelectDish.css";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class SelectDish extends Component {
  render() {
    return (
      <Container fluid={"true"} className="SelectDish">
        <Row>
            <Col md={4}>
                <Sidebar model={this.props.model} />
            </Col>
            <Col md={4}>
                <h2>This is the Select Dish screen</h2>
            </Col>
            <Col md={4}>
                <Dishes />
            </Col>
        </Row>
      </Container>
    );
  }
}

export default SelectDish;
