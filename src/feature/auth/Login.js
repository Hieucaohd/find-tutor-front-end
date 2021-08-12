import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { login, setStateFromCookies } from "./authSlice";
import LoginFacebook from "./LoginFacebook";
import LoginGoogle from "./LoginGoogle";
import "./styles.scss"

const selectToken = (state) => state.auth.token;

function Login() {
  const dispatch = useDispatch();
  let history = useHistory();
  const { register, formState: { errors }, handleSubmit } = useForm();
  const token = useSelector(selectToken);

  //lấy data từ cookies lưu vào state
  if(!token){
    dispatch(setStateFromCookies());
  }

  //token đã tồn tại chuyển sang trang home
  useEffect(() => {
    if (token) {
      history.push("/");
    }
  }, [token]);

  const onSubmit = (data) => {
    const args = {
      email: data.email,
      password: data.password,
    };

    dispatch(login(args));
  };

  return (
    <div className = "login">
          <form className = "login__form" onSubmit={handleSubmit(onSubmit)}>
            <div className="login__form__control">
              <input 
                name="email" 
                type="email" placeholder="Email" 
                {...register("email", { required: true }
                )}/>
                <span className="login__error">{errors.email && "Email is required"}</span>
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
              <LoginGoogle />
            </div>
            <div className="login__form__control">
              <LoginFacebook />
            </div>
            <div className="login__form__control">
              <Link to="/signup" className="login__form__control__register">Đăng kí tài khoản</Link>
            </div>
            

          </form> 
    </div>              
  );
}

export default Login;
