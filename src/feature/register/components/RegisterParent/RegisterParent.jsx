import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';

RegisterParent.propTypes = {
    
};

function RegisterParent(props) {
    const {register, formState: { errors }, handleSubmit, watch} = useForm();
    const password = useRef({});
    password.current = watch("password", "");
    
    const onSubmit = (data) => {

    }

    return (
        <div className="register__parent">
            <form className="register__parent__form" onSubmit={handleSubmit(onSubmit)}> 
                <p className="resgister__parent__form__title">Đăng kí làm phụ huynh</p>
                <div className="register__parent__form__control">
                    <label>Tên tài khoản</label>
                    <input
                        name="username" 
                        type="text"
                        {...register("username", { required: true, minLength: 6})}
                     />
                    {errors.username && errors.username.type === "required" && <span>Cần nhập tên tài khoản</span>}
                    {errors.username && errors.username.type === "minLength" && <span>Tên tài khoản cần ít nhất 6 kí tự</span>}
                </div>
                <div className="register__parent__form__control"> 
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
                    {errors.email && <span>Nhập đúng email của bạn</span>}
                </div>
                <div className="register__parent__form__control"> 
                    <label>Mật khẩu</label>
                    <input 
                        name="password" 
                        type="password"
                        {...register("password", { required: true, minLength: 6})}
                    />
                    {errors.password && errors.password.type === "required" && <span>Nhập mật khẩu</span>}
                    {errors.password && errors.password.type === "minLength" && <span>Mật khẩu cần ít nhất 6 kí tự</span>}
                </div>
                <div className="register__parent__form__control"> 
                    <label>Nhập lại mật khẩu</label>
                    <input 
                        name="repassword" 
                        type="password"
                        {...register("repassword", {
                            validate: value =>
                            value === password.current || "The passwords do not match"
                        })}
                    />
                    {errors.repassword && <span>Mật khẩu không trùng khớp</span>}
                </div>
            </form>
        </div>
    );
}

export default RegisterParent;