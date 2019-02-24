import React, { Component } from "react";
import { Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import modelInstance from "./data/DinnerModel";
import SelectDish from "./SelectDish/SelectDish";
import "./App.css";

import Container from "react-bootstrap/Container"
import 'bootstrap/dist/css/bootstrap.min.css';
import DishDetails from "./DishDetails/DishDetails";

import Header from "./Header/Header"
// Nezas
import DinnerOverview from "./DinnerOverview/DinnerOverview";
import DinnerPrintout from "./DinnerPrintout/DinnerPrintout";

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
          {/* details -> dish */}
          <Route
              path="/dish/:id"
              render={(props) => <DishDetails {...props} model={modelInstance} />}
          />
          {/* Nezas routes */}
          <Route
              path="/overview"
              render={() => <DinnerOverview model={modelInstance} />}
          />
          <Route
              path="/printout"
              render={() => <DinnerPrintout model={modelInstance} />}
          />
        </header>
      </Container>
    );
  }
}

export default App;
