/* Add React */
import React, { Component } from "react";
import "./Sidebar.css";

/* Add Bootstrap Components from OLD */
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Navbar } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom";


class Sidebar extends Component {
    constructor(props) {
        super(props);

        // we put on state the properties we want to use and modify in the component
        this.state = {
            numberOfGuests: this.props.model.getNumberOfGuests(),
            open: true,
            validated: true
        };
    }

    // this methods is called by React lifecycle when the
    // component is actually shown to the user (mounted to DOM)
    // that's a good place to setup model observer
    componentDidMount() {
        this.props.model.addObserver(this);
    }

    // this is called when component is removed from the DOM
    // good place to remove observer
    componentWillUnmount() {
        this.props.model.removeObserver(this);
    }

    // in our update function we modify the state which will
    // cause the component to re-render
    update() {
        this.setState({
            numberOfGuests: this.props.model.getNumberOfGuests()
        });
    }

    // our handler for the input's on change event
    onNumberOfGuestsChanged = input => {
        this.props.model.setNumberOfGuests(input);
    };

    // Set the state of the Sidebar -> Is the Burger menu open or close ?
    toggleBurger () {
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        return (
            <div>
                <Navbar>
                    <Col md={10} xs={5}>
                        <h4>My Dinner</h4>
                    </Col>
                    <Col md={1} xs={5} className="d-md-none">
                        <h4 className="green">SEK {this.props.model.getTotalMenuPrice()}</h4>
                    </Col>
                    <Col md={1} xs={2} className="d-md-none">
                        <Button variant="light" onClick={this.toggleBurger.bind(this)}>
                            <span className="navbar-toggler-icon" />
                        </Button>
                    </Col>
                </Navbar>
                <div
                    className={
                        "d-" +
                        (this.state.open ? "none" : "block") +
                        " d-md-" +
                        (this.state.open ? "block" : "none")
                    }
                >
                    <MenuView
                        numberOfGuests={this.state.numberOfGuests}
                        model={this.props.model}
                    />
                </div>
            </div>
        );
    }
}

export default Sidebar;


class MenuView extends React.Component {

    render() {
        return (
            <div>
                <PeopleSelect
                    numberOfGuests={this.props.numberOfGuests}
                    model={this.props.model}
                />
                <MenuTable
                    numberOfGuests={this.props.numberOfGuests}
                    model={this.props.model}
                />
                <ConfirmDinner />
            </div>
        );
    }
}

class PeopleSelect extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            validated: true,
            numberOfGuests: this.props.model.getNumberOfGuests()
        };

        this.handleInput = this.handleInput.bind(this);
    }

    handleInput = e => {
        if(e > 0){
            this.setState({
                validated: true,
                numberOfGuests: e
            });
            this.props.model.setNumberOfGuests(e);
        } else {
            this.setState({
                validated: false,
                numberOfGuests: e
            })
        }
    };

    render() {
        const { validated } = this.state;
        return (
            <Form className="menuContent">
                <Form.Group controlId="formNumOfGuests">
                    <Form.Label>People: </Form.Label>
                    <Form.Control
                        type="number"
                        min="1"
                        value={this.state.numberOfGuests}
                        onChange={e => {this.handleInput(e.target.value);}}
                    />
                </Form.Group>
                {validated ? '' : <p className="green">Please input an integer > 0</p>}
            </Form>
        );
    }
}

class MenuTable extends React.Component {

    render() {
        let menu = [{name: ' ', price: ' '}];
        let menuEmpty = true;
        let totalPrice = 0;
        let getFullMenu = this.props.model.getFullMenu();
        if (getFullMenu && getFullMenu.length !== 0){
            menuEmpty = false;
            menu = getFullMenu.map((dish) => {
                    return {
                        name: dish.name,
                        price: dish.ingredients.reduce((in1, in2) => {
                            return in1.price ? in1.price + in2.price : in1 + in2.price;
                        })
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

        let menuJsx = (
            <tr/>
        );

        if (!menuEmpty) {
            menuJsx = menu.map((dish) =>
                <tr key={dish.name}>
                    <td>{dish.name}</td>
                    <td>SEK {dish.price * this.props.numberOfGuests}</td>
                </tr>
            );
        }

        return (
            <div className="menuContent">
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>Dish Name</th>
                        <th>Cost</th>
                    </tr>
                    </thead>
                    <tbody>
                    {menuJsx}
                    <tr className='table-info' id='total_price'>
                        <td> Total </td>
                        <td className='blue'>SEK {totalPrice*this.props.numberOfGuests}</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

class ConfirmDinner extends React.Component {

    render() {
        return (
            <div className="center">
                <Link to="/overview">
                    <Button>Start planning</Button>
                </Link>
            </div>
        );
    }
}