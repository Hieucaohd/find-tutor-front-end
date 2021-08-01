import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectToken } from '../../../auth/authSlice';
import { registerAccount, registerInfo } from '../../registerAccount';

import "./styles.scss";

RegisterTutor.propTypes = {
    
};

function RegisterTutor(props) {
    const token = useSelector(selectToken);
    const history = useHistory();
    const {register, formState: { errors }, handleSubmit, watch} = useForm();
    const password = useRef({});
    password.current = watch("password", "");
    const dispatch = useDispatch();

    //nếu đã đăng nhập trả về trang home
    if(token) {
        history.push("/");
    }

    //cắt lấy firsename và lastname 
    const getName = (name) => {
        return {
          first_name: name.slice(0, name.indexOf(' ') + 1),
          last_name: name.slice(name.indexOf(' ') + 1)
        }
      }


    const onSubmit = async (data) => {
        const responseAccount = await registerAccount({
            email: data.email,
            password: data.password,
            username: data.username,  
        })
        const responseTutor = await registerInfo({
            token: responseAccount.token,
            tutorInfo: {
                profession: data.profession,
                universe: null,
                experience: data.experience,
                achievement: data.achievement,
                cap_day: null,
                lop_day: null,
                khu_vuc_day: null,
                avatar: null,
                identitycard: null,
                number_phone: data.telephone,
                number_of_identity_card: data.indentitycard,
                first_name: getName(data.name).first_name,
                last_name: getName(data.name).last_name,
                birthday: data.birthday,
                location: null,
            },
            dispatch: dispatch
        });
        console.log(responseTutor);
    }
    return (
        <div className="register__tutor">
            <form className="register__tutor__form" onSubmit={handleSubmit(onSubmit)}> 
                <p className="resgister__tutor__form__title">Đăng kí làm gia sư</p>
                <div className="register__tutor__form__control">
                    <label>Tên tài khoản</label>
                    <input
                        name="username" 
                        type="text"
                        {...register("username", { required: true, minLength: 6})}
                     />
                    {errors.username && errors.username.type === "required" && <span>Cần nhập tên tài khoản</span>}
                    {errors.username && errors.username.type === "minLength" && <span>Tên tài khoản cần ít nhất 6 kí tự</span>}
                </div>
                <div className="register__tutor__form__control"> 
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
                <div className="register__tutor__form__control"> 
                    <label>Mật khẩu</label>
                    <input 
                        name="password" 
                        type="password"
                        {...register("password", { required: true, minLength: 6})}
                    />
                    {errors.password && errors.password.type === "required" && <span>Nhập mật khẩu</span>}
                    {errors.password && errors.password.type === "minLength" && <span>Mật khẩu cần ít nhất 6 kí tự</span>}
                </div>
                <div className="register__tutor__form__control"> 
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
                {/* <div className="register__tutor__form__control"> 
                    <label>Tên của bạn</label>
                    <input 
                        name="text" 
                        type="name"
                        {...register("name", { required: true})}
                    />             
                    {errors.name && <span>Nhập đúng tên của bạn</span>}
                </div>
                <div className="register__tutor__form__control">
                    <label>Ngày sinh</label>
                    <input 
                        name="birthday" 
                        type="date"
                        {...register("birthday", { required: true})}
                    />
                    {errors.birthday && <span>Cần nhập ngày sinh</span>}
                </div>
                <div className="register__tutor__form__control">
                    <label>Số điện thoại</label>
                    <input 
                        name="telephone" 
                        type="number"
                        {...register("telephone", { required: true})}
                    />
                    {errors.telephone && <span>Cần nhập số điện thoại</span>}
                </div>
                <div className="register__tutor__form__control">
                    <label>Số CMND/CCCD</label>
                    <input 
                        name="identitycard" 
                        type="number"
                        {...register("identitycard")}
                    />
                </div>
                <div className="register__tutor__form__control">
                    <label>Ảnh đại diện</label>
                    <input type="file" name="avatar" />
                </div>
                <div className="register__tutor__form__control">
                    <label>Nghề nghiệp hiện tại</label>
                    <input 
                        name="professtion" 
                        type="text"
                        {...register("professtion")}
                    />
                </div>
                <div className="register__tutor__form__control">
                    <label>Kinh nghiệm</label>
                    <input 
                        name="experience" 
                        type="text"
                        {...register("experience")}
                    />
                </div>
                <div className="register__tutor__form__control">
                    <label>Thành tích nổi bật (không bắt buộc)</label>
                    <input 
                        name="achievement" 
                        type="text"
                        {...register("achievement")}
                    />
                </div> */}
                <div className="register__tutor__form__control" type="submit"> 
                    <button>Đăng kí</button>
                </div>
            </form>
        </div>
    );
}

export default RegisterTutor;