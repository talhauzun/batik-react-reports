import React, { useState ,useContext, useEffect} from "react";
import ApiService from "../services/ApiService";
import jwt_decode from "jwt-decode";

import { UserContext } from "../App";
import { useHistory,Redirect } from "react-router-dom";

import { history } from '../helpers/history';
import "./Login.css";
const Login = (props) => {

    const initialTutorialState = {
        username: "",
        password: "",
        token: null,
    };
    const [user, setUser] = useState(initialTutorialState);
    const [loading, setLoading] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const saveTutorial = () => {
        var data = {
            UserName: user.username,
            UserPass: user.password
        };

        ApiService.login(data)
            .then(response => {
                setLoading(true);
                setUser({
                    ...user,
                });
                //setLoading(false);
                console.log(response.data);
                var decodedHeader = jwt_decode(response.data);
                console.log(decodedHeader);
                localStorage.setItem('token', response.data);
                localStorage.setItem('testObject', JSON.stringify(decodedHeader));
               
                window.location.reload();
               
            })
            .catch(e => {
                console.log(e);
                //setLoading(false);
            });
            
    };
    
    return (
        <div className="container login-container">
       
            <div className="col-md-6 login-form-2">
                <h3>Arma Report</h3>
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Your Email *"   value={user.username}
                                onChange={handleInputChange}
                                name="username"/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control"  value={user.password}
                                onChange={handleInputChange} name="password"  placeholder="Your Password *"  />
                    </div>
                    <div className="form-group">
                        <input onClick={saveTutorial} className="btnSubmit" value="Login" />
                    </div>
                 
                </form>
            </div>
    </div>
    );
};

export default Login;