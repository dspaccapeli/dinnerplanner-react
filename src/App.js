import React, { Component } from "react";
import { Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import modelInstance from "./data/DinnerModel";
import SelectDish, { DishItem } from "./SelectDish/SelectDish";
import "./App.css";
import TempDishDetails from "./TempDishDetails/TempDishDetails";
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
      <div className="App">
        <header align="center" className="App-header">
          <h1 className="App-title">{this.state.title}</h1>

          {/* We rended diffrent component based on the path */}
          <Route 
            exact 
            path="/" 
            component={Welcome}
          />
          <Route
            path="/search"
            render={() => <SelectDish model={modelInstance} />}
          />
          <Route
            path="/dish/:id"
            render={() => <TempDishDetails model={modelInstance} />}
          />
          <Route
            path="/overview"
            render={() => <DinnerOverview model={modelInstance} />}
          />
          <Route
            path="/printout"
            render={() => <DinnerPrintout model={modelInstance} />}
          />
        </header>
      </div>
    );
  }
}

export default App;
