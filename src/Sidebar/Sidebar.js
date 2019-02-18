/* Add React */
import React, { Component } from "react";
import "./Sidebar.css";

/* Add Bootstrap Components from OLD */
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";


class Sidebar extends Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests()
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
  onNumberOfGuestsChanged = e => {
    this.props.model.setNumberOfGuests(e.target.value);
  };

  render() {
    return (
      <div className="Sidebar">
        <h3>This is the sidebar</h3>
        <p>
          People:
          <input
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.onNumberOfGuestsChanged}
          />
          <br />
          Total number of guests: {this.state.numberOfGuests}
        </p>
      </div>
    );
  }
}

export default Sidebar;

/* --------------------------------

            OLD CODE

-------------------------------- */


export class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalAmount: 5,
      open: true
    };
  }

  toggle() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    return (
        <Container fluid="true" className="fill">
          <Navbar>
            <Col md={10} xs={5}>
              <h4>My Dinner</h4>
            </Col>
            <Col md={1} xs={5} className="d-block d-md-none">
              <h4 class="moneyMenu">SEK {this.state.totalAmount}</h4>
            </Col>
            <Col md={1} className="col-2 d-block d-md-none">
              <Button variant="light" onClick={this.toggle.bind(this)}>
                <span class="navbar-toggler-icon" />
              </Button>
            </Col>
          </Navbar>
          <div
              class={
                "d-" +
                (this.state.open ? "none" : "block") +
                " d-md-" +
                (this.state.open ? "block" : "none")
              }
          >
            <MenuView />
          </div>
        </Container>
    );
  }
}
/*'d-none d-sm-block'*/
/*<div className={{ "d-" + (this.state.open ? "none" : "block") }} 'd-none d-sm-block'>*/

class MenuView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <PeopleSelect />
          <MenuTable />
          <ConfirmDinner />
        </div>
    );
  }
}

class PeopleSelect extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <h1>"hey3"</h1>;
  }
}

class MenuTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <h1>"hey"</h1>;
  }
}

class ConfirmDinner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <h1>"heyla"</h1>;
  }
}