import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectToken, setDataFromRegister } from '../../../auth/authSlice';
import { registerAccount, registerTutorInfor } from '../../registerAccount';
import { useEffect } from 'react';

import "./styles.scss";
import { Button } from '@material-ui/core';
import Location from '../../../location/Location';


RegisterTutor.propTypes = {
    
};

function RegisterTutor(props) {
    const token = useSelector(selectToken);
    const history = useHistory();
    const {register, formState: { errors }, handleSubmit, watch} = useForm();
    const password = useRef({});
    password.current = watch("password", "");
    const dispatch = useDispatch();
    const [location, setLocation] = useState({
        province: 0,
        district: 0,
        ward: 0
    })

    //nếu đã đăng nhập trả về trang home
    useEffect(() => {
        if(token) {
            history.push("/");
        }
    }, [token])
    

    //cắt lấy firstname và lastname 
    const getName = (name) => {
        return {
          first_name: name.slice(0, name.indexOf(' ')),
          last_name: name.slice(name.indexOf(' ') + 1)
        }
    }

    const getTeachingLevel = (data) => {
        const arr = [];
        if(data["cap1"]) {
            arr.push(1);
        }
        if(data["cap2"]) {
            arr.push(2);
        }
        if(data["cap3"]) {
            arr.push(3);
        }
        if(data["cap4"]) {
            arr.push(4);
        }
        return arr;
    }

    const handleGetLocation = (data) => {
        setLocation(data);
    }

    const onSubmit = async (data) => {
        
        const tutorInfor = {
            "profession": data.profession || null,
            "university": data.university || null,
            "experience": data.experience || null,
            "achievement": data.achievement || null,
            "khu_vuc_day": data.teachLocation || null,
            "number_phone": data.telephone || null,
            "number_of_identity_card": data.identitycard || null,
            "first_name": getName(data.name).first_name || null,
            "last_name": getName(data.name).last_name || null,
            "lop_day": [1],
            "cap_day": getTeachingLevel(data) || null,
            "birthday": data.birthday || null,
            "avatar": null,
            "province_code": Number(location.province),
            "district_code": Number(location.district),
            "ward_code": Number(location.ward),
            "detail_location": data.detailLocation || null,
        }

        registerAccount({
            email: data.email,
            password: data.password,
            username: data.username,  
        }).then(response => {
            if(response.ok) {
                alert("Đăng kí tài khoản thành công.")
                const data_from_response = response.json();
                data_from_response.then((data) => {
                    console.log(data);
                    const {email, username, token, refresh_token, id, type_tutor, type_parent} = data;
                    const successfull = registerTutorInfor({token: token, tutorInfor: tutorInfor, dispatch: dispatch});
                    if (successfull) {
                        dispatch(setDataFromRegister({email, username, token, refresh_token, id, type_tutor, type_parent}))
                    }
                })
            } else {
                alert("Đăng kí tài khoản không thành công");
            }
        })
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
                    {errors.email && 
                        <span className="register__tutor__form__error">Nhập đúng email của bạn</span>}
                </div>
                <div className="register__tutor__form__control"> 
                    <label>Mật khẩu</label>
                    <input 
                        name="password" 
                        type="password"
                        {...register("password", { required: true, minLength: 6})}
                    />
                    {errors.password && errors.password.type === "required" && 
                        <span className="register__tutor__form__error">Nhập mật khẩu</span>}
                    {errors.password && errors.password.type === "minLength" && 
                        <span className="register__tutor__form__error">Mật khẩu cần ít nhất 6 kí tự</span>}
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
                    {errors.repassword && 
                        <span className="register__tutor__form__error">Mật khẩu không trùng khớp</span>}
                </div>
                <div className="register__tutor__form__control"> 
                    <label>Họ và Tên</label>
                    <input 
                        name="text" 
                        type="name"
                        {...register("name", { required: true})}
                    />             
                    {errors.name && 
                        <span className="register__tutor__form__error">Nhập đúng tên của bạn</span>}
                </div>
                <div className="register__tutor__form__control">
                    <label>Ngày sinh</label>
                    <input 
                        name="birthday" 
                        type="date"
                        {...register("birthday", { required: true})}
                    />
                    {errors.birthday && 
                        <span className="register__tutor__form__error">Cần nhập ngày sinh</span>}
                </div>
                <div className="register__tutor__form__control">
                    <label>Số điện thoại</label>
                    <input 
                        name="telephone" 
                        type="number"
                        {...register("telephone", { required: true, minLength: 8})}
                    />
                    {errors.telephone && 
                        <span className="register__tutor__form__error">Cần nhập đúng số điện thoại</span>}
                </div>
                <div className="register__tutor__form__control">
                    <label>Số CMND/CCCD (không bắt buộc)</label>
                    <input 
                        name="identitycard" 
                        type="number"
                        {...register("identitycard")}
                    />
                </div>
                <div className="register__tutor__form__control">
                    <label>Địa chỉ</label>
                    <Location onChange={handleGetLocation} />
                </div>
                <div className="register__tutor__form__control">
                    <label>Chi tiết địa chỉ</label>
                    <input 
                        name="detailLocation" 
                        type="text"
                        {...register("detailLocation")}
                    />
                </div>
                <div className="register__tutor__form__control">
                    <label>Ảnh đại diện</label>
                    <input type="file" name="avatar" />
                </div>
                <div className="register__tutor__form__control">
                    <label>Nghề nghiệp hiện tại</label>
                    <select className="register__tutor__form__profession" name="profession" {...register("profession")}>
                        <option value="sv">Sinh Viên</option>
                        <option value="gv">Giáo Viên</option>
                    </select>
                </div>
                <div className="register__tutor__form__control" >
                    <label>Cấp dạy</label>
                    <div className="register__tutor__form__choose">
                    <div>
                            <label>Cấp một</label>
                            <input 
                                type="checkbox" 
                                name="capba"
                                value="checked"
                                {...register("cap1")}
                            />
                        </div>
                        <div>
                            <label>Cấp hai</label>
                            <input 
                                type="checkbox" 
                                name="caphai"
                                value="checked"
                                {...register("cap2")}
                                />
                        </div>
                        <div>
                            <label>Cấp ba</label>
                            <input 
                                type="checkbox" 
                                name="capba"
                                value="checked"
                                {...register("cap3")}
                            />
                        </div>
                        <div>
                            <label>Đại học</label>
                            <input 
                                type="checkbox" 
                                name="daihoc"
                                value="checked"
                                {...register("cap4")}
                            />
                        </div>
                    </div>
                </div>
                <div className="register__tutor__form__control">
                    <label>Khu vực dạy (không bắt buộc)</label>
                    <input 
                        name="teachlocation" 
                        type="text"
                        {...register("teachLocation")}
                    />
                </div>
                <div className="register__tutor__form__control">
                    <label>Trường Đại Học (không bắt buộc)</label>
                    <input  
                        type="text" 
                        name="university"
                        {...register("university")}
                    />
                </div>
                <div className="register__tutor__form__control">
                    <label>Kinh nghiệm (không bắt buộc)</label>
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
                </div>
                <div className="register__tutor__form__control"> 
                    <Button variant="contained" color="primary" type="submit">Đăng kí</Button>
                </div>
            </form>
        </div>
    );
}

export default RegisterTutor;