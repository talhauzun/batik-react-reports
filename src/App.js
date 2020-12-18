import React, { useState, useReducer, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Login from "./components/Login";
import { Home } from "./components/Home";

import { MasterPage } from "./components/MasterPage";
import { PrivateRoute } from "./helpers/ProtectedRoute";
import { UserReducer } from "./redux/UserReducer";
import { CheckUser } from "./helpers/CheckUser";

export const UserContext = React.createContext(null);

export const App = () => {
  const user = CheckUser();
  useEffect(() => {
    dispatch({ type: "set_user", payload: user });
    console.log(user);
  }, [user]);

  const [count, dispatch] = useReducer(UserReducer, user);
  return (
    <UserContext.Provider
      value={{ countState: count, countDispatch: dispatch }}
    >
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/tutorials" className="navbar-brand">
            bezKoder {count.FullName}
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/Home"} className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/MasterPage"} className="nav-link">
                Master
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/Login"} className="nav-link">
                Login
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <PrivateRoute
              path="/Login"
              isAuth={user.isAuth}
              pageAuthority={true}
              roles="Login"
              component={Login}
            />
            <PrivateRoute
              path="/MasterPage"
              isAuth={user.isAuth}
              pageAuthority={user.role.indexOf("MasterPage")>0}
              roles="MasterPage"
              component={MasterPage}
            />
            <PrivateRoute
              path="/Home"
              isAuth={user.isAuth}
              pageAuthority={true}
              roles="Home"
              component={Home}
            />
            <PrivateRoute path=""  pageAuthority={true} isAuth={user.isAuth} roles="404" component={Home} />
          </Switch>
        </div>
      </div>
    </UserContext.Provider>
  );
};
