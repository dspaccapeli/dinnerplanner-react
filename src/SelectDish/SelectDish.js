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
        this.state = {
            status: "LOADING"
        };
    }

    callApi = () => {
        this.props.model
          .getAllDishes(this.props.type, this.props.filter)
          .then(dishes => {
            console.log(dishes);
            this.setState({
              status: "LOADED",
              dishes: dishes
            });
          })
          .catch(() => {
            this.setState({
              status: "ERROR"
            });
          });
    }

    componentDidMount() {
        // when data is retrieved we update the state
        // this will cause the component to re-render
        this.callApi();
    }

    componentDidUpdate(prevProps) {
        if (this.props.type !== prevProps.type || this.props.filter !== prevProps.filter) {
            this.callApi();
        }
    }

    render() {
        let dishesList = null;
        switch (this.state.status) {
        case "LOADING":
            dishesList = <em>Loading...</em>;
            break;
        case "LOADED":
            console.log(this.state.dishes);
            dishesList = this.state.dishes.map((dish, i) => <DishItem key={i} dishId={dish.id} name={dish.name} imgSrc={dish.image} />);
            break;
        default:
            dishesList = <b>Failed to load data, please try again</b>;
            break;
        }

        return (
            <React.Fragment>
                <Row className="align-items-center" id="dish_again_list">
                    {dishesList}
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
                            onChange={(e) => this.setState({keywords: e.target.value})}
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
                        <Button variant="info" id="search_button" className="mar_top_5" onClick={() => this.props.changeFn(this.state.title, this.state.keywords)} >
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

    changeSearchParams = (type, filter) => {
        this.setState({
          type: type,
          filter: filter
        });
    }

    render() {
        return (
            <React.Fragment>
                <DishSearch changeFn={this.changeSearchParams}/>
                <DishList model={this.props.model} type={this.state.type} filter={this.state.filter}/>
            </React.Fragment>
        );
    }
}
