import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import "../App.css";
import Topbar from "../Topbar/Topbar";
import "./DinnerOverview.css";

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
    render() {
        return (
            <React.Fragment>
                <Topbar model={this.props.model}/>
                <Overview model={this.props.model} />
            </React.Fragment>
        );
    }
}

class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: this.props.model.getFullMenu(),
            totalPrice: this.props.model.getFullMenu.length > 0 ? this.props.model.getFullMenu().reduce((accumulator1, entry) =>
                accumulator1 + entry.reduce((accumulator2, ingredient) =>
                accumulator2 + ingredient.price
                )
            ) * this.props.model.getNumberOfGuests() : 0
        };
    }

    getAllMenuItems() {
        return this.state.menu.forEach((entry) => {
            let price = 0;
            (entry.ingredients).forEach((ingredient) => {
                price += ingredient.price;
            });
            price *= this.props.model.getNumberOfGuests();
            return <DinnerItem price={price} name={entry.name} imgSrc={entry.image} />
        })
    }

    render() {

        return (
            <Container fluid="true" className="fill">
                <Row>
                    <Col md={4}></Col>
                    <Col md={4} id="menu_dishes">
                        <Row className="align-items-end" id="menu_dishes_row">
                            {this.getAllMenuItems()}
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
    render() {
        return (
            <React.Fragment>
                <Col sm={4} className="media_box mar_5">
                    <div className="media-top">
                        <img alt={this.props.imgSrc} className="media-object" src={this.props.imgSrc}/>
                    </div>

                    <div className="media-body">
                        <h6 className="media-heading">{this.props.name}</h6>
                    </div>
                    <div align="right">{this.props.price} SEK</div>
                </Col>
            </React.Fragment>
        );
    }
}