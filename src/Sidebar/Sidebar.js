/* Add React */
import React, { Component } from "react";
import "./Sidebar.css";

/* Add Bootstrap Components from OLD */
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
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
        <Container fluid="true" className="fill">
          <Navbar>
            <Col md={10} xs={5}>
              <h4>My Dinner {this.state.numberOfGuests}</h4>
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
        </Container>
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
    }
  }

  handleValidation = e => {
    let peopleInput = parseInt(e.target.value);
    if(peopleInput > 0){
      this.setState({
        validated: true,
        numberOfGuests: peopleInput
      });
      this.props.model.setNumberOfGuests(peopleInput);
    } else {
      this.setState({
        validated: false,
        numberOfGuests: peopleInput
      })
    }
  };

  render() {
    const { validated } = this.state;
    return (
          <Form
              noValidate
              validated={validated}
          >
            <Form.Group controlId="formNumOfGuests">
              <Form.Label>People:</Form.Label>
              <Form.Control
                  type="number"
                  placeholder={this.state.numberOfGuests}
                  value={this.state.numberOfGuests || 0}
                  onChange={e => {
                    this.handleValidation(e);
                    console.log('raz')
                  }}
              />
            </Form.Group>
            {validated ? '' : 'Please input an integer > 0'}
          </Form>
    );
  }
}

class MenuTable extends React.Component {

  render() {
    return <h1>"hey"</h1>;
  }
}

class ConfirmDinner extends React.Component {

  render() {
    return <h1>"heyla"</h1>;
  }
}