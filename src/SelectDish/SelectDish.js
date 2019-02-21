import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./SelectDish.css";
import "../App.css";

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1
        }}
    />
);

export class DishItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Col md={4} sm={6} className="media_box dish_item pointerStyle" >
                    <Link to={`/dish/${this.props.value}`}>
                        <div className="box">
                            <div className="content">
                                <img
                                    src="http://www.babaimage.com/images/instagram-logo-png-transparent-background-3.png"
                                    className="img img-responsive full-width media-object"
                                />
                            </div>
                            <div className="caption" align="center">
                                <h5 className="heading">The dish with an awesome name</h5>
                            </div>
                        </div>
                    </Link>
                </Col>
            </React.Fragment>
        );
    }
}

export class DishList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Row className="align-items-center" id="dish_again_list">
                    <DishItem value={12345}/>
                    <DishItem value={12344}/>
                    <DishItem value={12345}/>
                    <DishItem value={12344}/>
                </Row>
            </React.Fragment>
        );
    }
}

export class DishSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "All"
        };
    }

    render() {
        return (
            <React.Fragment>
                <h3 align="center">FIND A DISH</h3>
                <ColoredLine color="grey" />
                <Row>
                    <Col sm={3} align="center" className="form-group mar_leftRight_5">
                        <input
                            type="text"
                            className="form-control"
                            id="keywords"
                            placeholder="Enter key words"
                        />
                    </Col>
                    <Col sm={4} align="center" className="dropdown">
                        <DropdownButton
                            id="dropdown-basic-button"
                            title={this.state.title}
                            variant="info"
                        >
                            <Dropdown.Item
                                href="#"
                                onSelect={() => this.setState({ title: "All" })}
                            >
                                All
                            </Dropdown.Item>
                            <Dropdown.Item
                                href="#"
                                onSelect={() => this.setState({ title: "Appetizer" })}
                            >
                                Appetizer
                            </Dropdown.Item>
                            <Dropdown.Item
                                href="#"
                                onSelect={() => this.setState({ title: "Main Course" })}
                            >
                                Main Course
                            </Dropdown.Item>
                            <Dropdown.Item
                                href="#"
                                onSelect={() => this.setState({ title: "Side Dish" })}
                            >
                                Side Dish
                            </Dropdown.Item>
                            <Dropdown.Item
                                href="#"
                                onSelect={() => this.setState({ title: "Dessert" })}
                            >
                                Dessert
                            </Dropdown.Item>
                            <Dropdown.Item
                                href="#"
                                onSelect={() => this.setState({ title: "Salad" })}
                            >
                                Salad
                            </Dropdown.Item>
                            <Dropdown.Item
                                href="#"
                                onSelect={() => this.setState({ title: "Bread" })}
                            >
                                Bread
                            </Dropdown.Item>
                            <Dropdown.Item
                                href="#"
                                onSelect={() => this.setState({ title: "Breakfast" })}
                            >
                                Breakfast
                            </Dropdown.Item>
                            <Dropdown.Item
                                href="#"
                                onSelect={() => this.setState({ title: "Soup" })}
                            >
                                Soup
                            </Dropdown.Item>
                            <Dropdown.Item
                                href="#"
                                onSelect={() => this.setState({ title: "Beverage" })}
                            >
                                Beverage
                            </Dropdown.Item>
                            <Dropdown.Item
                                href="#"
                                onSelect={() => this.setState({ title: "Sauce" })}
                            >
                                Sauce
                            </Dropdown.Item>
                            <Dropdown.Item
                                href="#"
                                onSelect={() => this.setState({ title: "Drink" })}
                            >
                                Drink
                            </Dropdown.Item>
                        </DropdownButton>
                    </Col>
                    <Col sm={4} align="center">
                        <Button variant="info" id="search_button" className="mar_top_5">
                            Search
                        </Button>
                    </Col>
                </Row>
                <ColoredLine color="grey" />
            </React.Fragment>
        );
    }
}


export default class SelectDish extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <DishSearch />
                <DishList />
            </React.Fragment>
        );
    }
}
