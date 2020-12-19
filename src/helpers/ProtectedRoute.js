import React from "react";
import { Route, Redirect } from "react-router-dom";
import { CheckUser } from "../helpers/CheckUser";

import jwt_decode from "jwt-decode";
import {UserContext} from "../App";

//const context = useContext(UserContext)
export const PrivateRoute = ({ component: Component,isAuth,pageAuthority, roles, ...rest }) => (
  
  <Route
    {...rest}
    render={(props) => {
      
      console.log(isAuth+" "+pageAuthority)
      if (!isAuth&&(roles!="Login")) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }
      if (isAuth&&(roles=="Login")) {
        return (
          <Redirect
            to={{ pathname: "/Home", state: { from: props.location } }}
          />
        );
      }
      if (!pageAuthority) {
        return (
          <Redirect
            to={{ pathname: "/Home", state: { from: props.location } }}
          />
        );
      }
      if (isAuth&&(roles=="404")) {
        return (
          <Redirect
            to={{ pathname: "/Home", state: { from: props.location } }}
          />
        );
      }

      console.log("burası çalıştı");
      // authorised so return component
      return <Component {...props} />;
    }}
  />
);
