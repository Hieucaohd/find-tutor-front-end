import React, {useRef} from 'react';
import { NavLink, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import "./styles.scss";
import { useForm } from 'react-hook-form';
import { Button } from '@material-ui/core';
import { registerAccount, selectRegisterInfo, setInfo } from './registerAccount';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../auth/authSlice';

Register.propTypes = {
    
};

function Register(props) {
    const {register, formState: { errors }, handleSubmit, watch} = useForm();
    const password = useRef({});
    const successAlert = useRef();
    password.current = watch("password", "");
    const history = useHistory();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        registerAccount({
            email: data.email,
            username: data.username,
            password: data.password,
        }).then(response => {
            if(response.ok) {
                successAlert.current.style.display = "flex";
                const userInfo = response.json();
                console.log(userInfo);
                userInfo.then( (registerData) => {
                    console.log(registerData);
                    dispatch(setInfo({
                        email: registerData.email,
                        username: registerData.username,
                        token: registerData.token,
                        refresh_token: registerData.refresh_token,
                        id: registerData.id,
                        type_tutor: registerData.type_tutor,
                        type_parent: registerData.type_parent,
                    }))
                })
                
            } else {
                alert('Dang ki tai khoan khong thanh cong');
            }
        })
    }

    const handleSignupParent = (data) => {
        history.push("/signup/parent");
    }

    const handleSignupTutor = (data) => {
        history.push("/signup/tutor");
    }

    return (
        <div class = "register">
            <form class = "register__form" onSubmit={handleSubmit(onSubmit)}> 
            <div className="register__form__control">
                    <label>Tên tài khoản</label>
                    <input
                        name="username" 
                        type="text"
                        {...register("username", { required: true, minLength: 6})}
                     />
                    {errors.username && errors.username.type === "required" && 
                        <span className="register__form__error">Cần nhập tên tài khoản</span>}
                    {errors.username && errors.username.type === "minLength" && 
                        <span className="register__form__error">Tên tài khoản cần ít nhất 6 kí tự</span>}
                </div>
                <div className="register__form__control"> 
                    <label>Email</label>
                    <input 
                        name="email" 
                        type="email"
                        {...register('email', {
                            required: true,
                            pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        }})}
                    />
                    {errors.email && 
                        <span className="register__form__error">Nhập đúng email của bạn</span>}
                </div>
                <div className="register__form__control"> 
                    <label>Mật khẩu</label>
                    <input 
                        name="password" 
                        type="password"
                        {...register("password", { required: true, minLength: 6})}
                    />
                    {errors.password && errors.password.type === "required" && 
                        <span className="register__form__error">Nhập mật khẩu</span>}
                    {errors.password && errors.password.type === "minLength" && 
                        <span className="register__form__error">Mật khẩu cần ít nhất 6 kí tự</span>}
                </div>
                <div className="register__form__control"> 
                    <label>Nhập lại mật khẩu</label>
                    <input 
                        name="repassword" 
                        type="password"
                        {...register("repassword", {
                            validate: value =>
                            value === password.current || "The passwords do not match"
                        })}
                    />
                    {errors.repassword && 
                        <span className="register__form__control">Mật khẩu không trùng khớp</span>}
                </div>
                <div className="register__form__control"> 
                    <Button type="submit" >dang ki tai khoan</Button>
                </div>
            </form>
            <div className="register__success" ref={successAlert}> 
                <h4>Dang ki tai khoan thanh cong</h4>
                <div>   
                    <Button onClick={handleSignupParent}>Dang ki lam phu huynh</Button>
                    <Button onClick={handleSignupTutor}>Dang ki lam gia su</Button>
                </div>
            </div>
        </div>
    );
}

export default Register;