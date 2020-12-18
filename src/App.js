import React, { useState, useReducer, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from "./components/Login";
import { Home } from "./components/Home";

import { MasterPage } from "./components/MasterPage";
import {PrivateRoute} from "./helpers/ProtectedRoute";
import { CheckUser } from "./helpers/CheckUser";




export const App = () => {
  const test =  CheckUser()
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">
          bezKoder 
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/tutorials"} className="nav-link">
              Tutorials
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add {test}
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <PrivateRoute exact path="/Home" roles="Home" component={Home} />  
          <PrivateRoute exact path="/MasterPage" roles="MasterPage" component={MasterPage} />          
          <PrivateRoute exact path="/Login" roles="Login" component={Login} />  
          <Route roles="Login" component={Login} />
        </Switch>
      </div>
    </div>
  )
}
