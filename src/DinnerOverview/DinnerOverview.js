import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import Dishes from "../Dishes/Dishes";
import "./DinnerOverview.css";
import "../App.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1
        }}
    />
);

export default class DinnerOverview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Topbar />
                <Overview />
            </React.Fragment>
        );
    }
}

class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dinnerName1: "No-Knead Bread",
            dinnerPrice1: "3",
            dinnerName2: "Kale and Quinoa Salad with Black Beans",
            dinnerPrice2: "15",
            dinnerName3: "Creamy Avocado Pasta",
            dinnerPrice4: "7",
            totalPrice: "25"
        };
    }

    render() {
        return (
            <Container fluid="true" className="fill">
                <Row>
                    <Col md={4}></Col>
                    <Col md={4} id="menu_dishes">
                        <Row className="align-items-end" id="menu_dishes_row">
                            <DinnerItem />
                            <DinnerItem />
                        </Row>
                    </Col>

                    <Col md={4} className="flexEnd">
                        <div className="verticalLine"></div>
                        <h6 className="total">Total: &nbsp; </h6>
                        <h6 className="totalPrice" id="overview_total">{this.state.totalPrice} &nbsp; SEK </h6>
                    </Col>
                </Row>

                <ColoredLine color="grey" />

                <Row>
                    <Col align="center" className="text-center button-center mar_5">
                        <Link to={"/printout"}>
                            <Button variant="info">Print Full Recipe</Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export class DinnerItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Col sm={4} className="media_box mar_5">
                    <div className="media-top">
                        <img className="media-object" src="http://stonerdays.com/wp-content/uploads/2013/05/shutterstock_118739218-life-purpose.jpg" />
                    </div>

                    <div className="media-body">
                        <h6 className="media-heading">Lalala </h6>
                    </div>
                    <div align="right">lalala &nbsp; SEK</div>
                </Col>
            </React.Fragment>
        );
    }
}