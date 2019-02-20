import React, { Component } from "react";
import { Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import modelInstance from "./data/DinnerModel";
import SelectDish from "./SelectDish/SelectDish";
import "./App.css";

import Container from "react-bootstrap/Container"
import 'bootstrap/dist/css/bootstrap.min.css';


import Header from "./Header/Header"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Dinner Planner"
    };
  }

  render() {
    return (
      <Container fluid={"true"}>
        <header className="App-header">
          <Header title={this.state.title}/>

          {/* We rendered different component based on the path */}
          <Route exact path="/" component={Welcome} />
          <Route
            path="/search"
            render={() => <SelectDish model={modelInstance} />}
          />
        </header>
      </Container>
    );
  }
}

export default App;
