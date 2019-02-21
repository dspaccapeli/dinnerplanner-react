/* Add React */
import React, { Component } from "react";
import "./Sidebar.css";

/* Add Bootstrap Components from OLD */
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import Form from "react-bootstrap/Form";


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
                <h4 className="moneyMenu">SEK {this.state.totalAmount}</h4>
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

/* --------------------------------

            OLD CODE

-------------------------------- */

class MenuView extends React.Component {

  render() {
    return (
        <div>
          <PeopleSelect
              numberOfGuests={this.props.numberOfGuests}
              model={this.props.model}
          />
          <MenuTable />
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
              <Form.Label>People:</Form.Label>
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
            <tr>
              <td>1</td>
              <td>Mark</td>
            </tr>
            </tbody>
          </Table>
        </div>
    );
  }
}

class ConfirmDinner extends React.Component {

  render() {
    return <h1>"heyla"</h1>;
  }
}