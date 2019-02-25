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
        // Daniele
        let menu = this.props.model.getFullMenu();
        let totalPrice = 0;
        // Calculate total price NEW
        if (menu && menu.length !== 0){
            menu = menu.map((dish) => {
                    return {
                        name: dish.name,
                        price: dish.ingredients.reduce((in1, in2) => {
                            return in1.price ? in1.price + in2.price : in1 + in2.price;
                        }),
                        ingredients: dish.ingredients,
                        image: dish.image
                    };
                }
            );
            totalPrice = menu.reduce((dish1, dish2) => {
                    return dish1.price ? dish1.price + dish2.price : dish1 + dish2.price;
                }
            );
            if (isNaN(totalPrice)) {
                totalPrice = totalPrice.price;
            }
        }
        this.state = {
            menu: menu,
            totalPrice: totalPrice*this.props.model.getNumberOfGuests()
        };
    }

    getAllMenuItems() {
        let arrayReturn = [];
        this.state.menu.forEach((entry) => {
            let price = 0;
            (entry.ingredients).forEach((ingredient) => {
                price += ingredient.price;
            });
            price *= this.props.model.getNumberOfGuests();
            arrayReturn.push(<DinnerItem key={entry.name} price={price} name={entry.name} imgSrc={entry.image} />);
        });
        return arrayReturn;
    }

    render() {

        return (
            <Container fluid="true" className="fill">
                <Row>
                    <Col md={2}/>
                    <Col md={8} id="menu_dishes">
                        <Row className="align-items-end" id="menu_dishes_row">
                            {this.getAllMenuItems()}
                        </Row>
                    </Col>

                    <Col md={2} className="flexEnd">
                        <div className="verticalLine"/>
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
                <Col md={4} sm={6} className="media_box dish_item" >
                        <div className="box">
                            <div className="content">
                                <img
                                    src={this.props.imgSrc}
                                    alt={this.props.imgSrc}
                                    className="img img-responsive full-width media-object"
                                />
                            </div>
                            <div className="caption" align="center">
                                <h5 className="heading">{this.props.name}</h5>
                            </div>
                        </div>
                </Col>
            </React.Fragment>
        );
    }
}

/*
        <Col sm={4} className="media_box mar_5">
            <div className="media-top">
                <img alt={this.props.imgSrc} className="media-object" src={this.props.imgSrc}/>
            </div>

            <div className="media-body">
                <h6 className="media-heading">{this.props.name}</h6>
            </div>
            <div align="right">{this.props.price} SEK</div>
        </Col>
    */