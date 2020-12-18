import React from "react";
import { Route, Redirect } from "react-router-dom";
import { CheckUser } from "../helpers/CheckUser";

import jwt_decode from "jwt-decode";

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (

  <Route {...rest} render={props => {

    try {
      
    let currentUser = false;
    let token = localStorage.getItem("token")
    let jwt = token!=null?jwt_decode(token):null

    /*console.log(jwt.role)
    console.log(jwt.role.findIndex(fruit => fruit === roles) + "test")*/

    const now = Date.now().valueOf() / 1000
    if (jwt.exp > now) {
      currentUser = true
    }


    if (!currentUser && (roles != "Login")) {
      // not logged in so redirect to login page with the return url
      return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    }
    if ((jwt.role.findIndex(fruit => fruit === roles) < 0) && (roles != "Home")) {
      // role not authorised so redirect to home page
      return <Redirect to={{ pathname: '/Home' }} />
    }


    console.log("burası çalıştı")
    // authorised so return component
    return <Component {...props} />
  } catch (error) {
    return roles == "Login"?<Component {...props} />:<Redirect to={{ pathname: '/Home' }} />;
  }
  }} />
)