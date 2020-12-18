import React, { useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import About from './components/About';
import NavigationBar from './components/NavigationBar';

import authReducer from "./reducers/authReducer";

export const CounterContext = React.createContext(null)



const App = (props) => {
  const initialState = {
    user: '',
    isAuthenticated: false,
    error: false,
    errorMessage: '',
  }
  const [state, dispatch] = useReducer(authReducer, initialState)
  
  return (
    <CounterContext.Provider value={{authState:state,authDispatch:dispatch}}>
    <Router>
      <div>
      <NavigationBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/account/login" component={LoginForm} />
          <PrivateRoute path="/about" component={About} />
        </Switch>
      </div>
    </Router>
    </CounterContext.Provider>
  );
}

export default App;