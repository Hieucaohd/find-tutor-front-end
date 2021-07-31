import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "./authSlice";
import "./styles.scss"

const selectToken = (state) => state.auth.token;

function Login() {
  const dispatch = useDispatch();
  let history = useHistory();
  const { register, formState: { errors }, handleSubmit } = useForm();
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
    <div className = "login">
          <form className = "login__form" onSubmit={handleSubmit(onSubmit)}>
            <div className="login__form__control">
              <input 
                name="username" 
                type="text" placeholder="Username" 
                {...register("username", { required: true }
                )}/>
                <span className="login__error">{errors.username && "Username is required"}</span>
            </div>
            <div className="login__form__control">
              <input name="password" 
              type="password" 
              placeholder="Password" 
              {...register("password", { required: true })}/>
              <span className="login__error">{errors.username && "Password is required"}</span>
            </div>
            <div className="login__form__control">
              <Button variant="contained" color="primary" type="submit">Sign in</Button>
            </div>
            <div className="login__form__control">
              <a>Sign up</a>
            </div>
          </form>   
    </div>              
  );
}

export default Login;
