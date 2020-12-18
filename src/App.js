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
              <Link to={"/tutorials"} className="nav-link">
                Tutorials
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <PrivateRoute
              path="/Home"
              isAuth={user.isAuth}
              roles="Home"
              component={Home}
            />
            <PrivateRoute
              path="/MasterPage"
              isAuth={user.isAuth}
              roles="MasterPage"
              component={MasterPage}
            />
            <PrivateRoute
              path="/Login"
              isAuth={user.isAuth}
              roles="Login"
              component={Login}
            />
            <PrivateRoute isAuth={user.isAuth} roles="404" component={Home} />
          </Switch>
        </div>
      </div>
    </UserContext.Provider>
  );
};
