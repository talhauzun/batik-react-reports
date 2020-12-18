import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { CounterContext } from "../App";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";

import { loginSuccess,loginError } from "../actions/authAction";
import { axiosBase } from "../helpers/defaultUrl";
import authService from '../services/authService';

const FormPage = () => {
  const context = useContext(CounterContext);

  const { register, handleSubmit, watch, errors } = useForm();
  //const onSubmit = data => console.log(data);
  const onSubmit = data => {
    //context.authDispatch(login(data.username, data.password));
    authService.login(data.username, data.password)
    .then(data => {
        data.message
            ? context.authDispatch(loginError(data.message))
            : (context.authDispatch(loginSuccess(data)))
    })
    .catch(err => context.authDispatch(loginError(err)));
    console.log();
  }
  //console.log(watch("example")); // watch input value by passing the name of it

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
        <form onSubmit={handleSubmit(onSubmit)}>
        <p className="h4 text-center mb-4">Sign in</p>
        <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
          Your email
        </label>
        <input type="text" id="defaultFormRegisterNameEx" className="form-control" name="username" ref={register} />
        <br />
        <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
          Your password
        </label>
        <input type="password" id="defaultFormLoginPasswordEx" className="form-control" name="password"  ref={register({ required: true })} />
        <div className="text-center mt-4">
          <MDBBtn color="indigo" type="submit">Login</MDBBtn>
        </div>
      </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default FormPage;
