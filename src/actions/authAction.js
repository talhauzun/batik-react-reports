import React,{ useContext } from "react";
import authService from '../services/authService';
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT = "LOGOUT";



const loginSuccess = user => {
    return {
        type: LOGIN_SUCCESS,
        user
    };
};

const loginError = error => {
    return {
        type: LOGIN_ERROR,
        error
    };
};

const login = (context,username, password) => {
    
        console.log("test")
        authService.login(username, password)
            .then(data => {
                data.message
                    ? context.authDispatch(loginError(data.message))
                    : (context.authDispatch(loginSuccess(data)))
            })
            .catch(err => context.authDispatch(loginError(err)));
        }
 const logout = () => {
    authService.logout();
    return {
        type: LOGOUT
    };
}
export {loginSuccess,loginError,logout,login}