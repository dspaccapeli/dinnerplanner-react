import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

class Welcome extends Component {

  /*testFn = () => {
    localStorage.setItem("numOfGuests", 1);
    localStorage.setItem("menu", JSON.stringify({"lala": 1, "lala2": 3}));
  }*/

  render() {
    return (
      <div className="Welcome">
        <p>Welcome to the dinner planner React Startup code!</p>

        <Link to="/search">
          <button /*onClick={this.testFn}*/>Start planning</button>
        </Link>
      </div>
    );
  }
}

export default Welcome;
