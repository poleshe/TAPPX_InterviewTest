import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import App from "./Form";
import Table from "./Table";
 
class Main extends Component {
  render() {
    return (
        <HashRouter>
            <div>
                <h1> Tappx Bundle Test / Pol Estecha </h1>
                <ul className="header">
                <li><NavLink exact to="/">Form</NavLink></li>
                <li><NavLink to="/table">Table</NavLink></li>
                </ul>
                <div className="content">
                    <Route exact path="/" component={App}/>
                    <Route path="/table" component={Table}/>
                </div>
            </div>
        </HashRouter>
    );
  }
}
 
export default Main;