import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { login } from "./authSlice";

const selectToken = (state) => state.auth.token;

function Login() {
  const dispatch = useDispatch();
  let history = useHistory();
  const {register, handleSubmit} = useForm();

  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      history.push("/");
    }
  }, [token]);

  const onSubmit = (data) => {
    const args = {
      username: data.username,
      password: data.password,
    };

    dispatch(login(args));
  };

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label>Username</label>
            <input name="username" type="text" {...register("username", { required: true })}/>
          </div>
          <div className="form-control">
            <label>Password</label>
            <input name="password" type="password" {...register("password", { required: true })}/>
          </div>
          <button type="submit">Sign in</button>
        </form>   
        <button>Sign up</button>          
    </div>              
  );
}

export default Login;
