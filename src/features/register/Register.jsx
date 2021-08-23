import { Button, CircularProgress } from '@material-ui/core';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../auth/authSlice';
import { registerAccount } from './registerAccount';
import "./styles.scss";

Register.propTypes = {
    
};

function Register(props) {
    const {register, formState: { errors }, handleSubmit, watch} = useForm();
    const password = useRef({});
    password.current = watch("password", "");
    const history = useHistory();
    const dispatch = useDispatch();
    const loadingRef = useRef(null);
    const onSubmit = (data) => {
        loadingRef.current.style.display = "flex";
        registerAccount({
            email: data.email,
            username: data.username,
            password: data.password,
        }).then((response) => {
            if(response.ok) {
                alert("Đăng kí tài khoản thành công");
                dispatch(login({
                    email: data.email,
                    password: data.password,
                }));
                history.push("/");
            } else {
                alert('Đăng kí tài khoản thất bại');
                loadingRef.current.style.display = "none";
            }
        })
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
            <div ref={loadingRef} className="register__loading"> 
                <CircularProgress />
             </div>
        </div>
    )
}

export default Register;