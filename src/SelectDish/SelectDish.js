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
                    <Link to={`/dish/${this.props.dishId}`}>
                        <div className="box">
                            <div className="content">
                                <img
                                    src={this.props.imgSrc}
                                    className="img img-responsive full-width media-object"
                                />
                            </div>
                            <div className="caption" align="center">
                                <h5 className="heading">{this.props.name}</h5>
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

    getAllDishItems (promise) {
        console.log("I'm here.");
        promise.then(dishDict => {
            console.log("I'm here.2");
            if (Object.keys(dishDict).length === 0) {
                return "No dishes matching this criteria were found.";
            }
            return dishDict.map((entry) => <DishItem dishId={entry.id} name={entry.name} imgSrc={entry.image} />);
            
        }).catch( error => {
            if (error.name === "TypeError" && error.message === "Failed to fetch") {
                return "Could not load data from the server. Please check your internet connection and try again.";
            }
            else {
                return "An unknown error occured: "+ error.message;
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <Row className="align-items-center" id="dish_again_list">
                    {this.getAllDishItems(this.props.model.getAllDishes(this.props.type, this.props.filter))}
                </Row>
            </React.Fragment>
        );
    }
}

export class DishSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "All",
            keywords: ""
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
                            variant="info">
                            {['All', 'Appetizer', 'Main course', 'Side Dish', 'Dessert', 'Salad', 'Bread', 'Breakfast', 'Soup', 'Beverage', 'Sauce', 'Drink']
                            .map((item, i) =>
                                <Dropdown.Item href="#" key={i} onSelect={() => this.setState({ title: item })} >{item}</Dropdown.Item>             
                            )}
                        </DropdownButton>
                    </Col>
                    <Col sm={4} align="center">
                        <Button variant="info" id="search_button" className="mar_top_5" /*onClick={this.props.changeFn(this.title, this.keywords)}*/ >
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
        this.state = {
            type: "All",
            filter: ""
          };
    }

    changeSearchParams (type, filter) {
        this.setState({
          type: type,
          filter: filter
        });
      }

    render() {
        return (
            <React.Fragment>
                <DishSearch changeFn={this.changeSearchParams.bind(this)} />
                <DishList model={this.props.model} type={this.state.type} filter={this.state.filter}/>
            </React.Fragment>
        );
    }
}
