import { Button, CircularProgress } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectToken, setId, setParentTrue } from '../../../auth/authSlice';
import { setParentIdCookie } from '../../../auth/cookies';
import { registerParentInfor } from '../../registerAccount';
import Location from "components/location/Location.jsx";

import "./styles.scss";

function RegisterParent(props) {
    const {register, formState: { errors }, handleSubmit, watch} = useForm();
    const password = useRef({});
    password.current = watch("password", "");
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const history = useHistory();
    const loadingRef = useRef(null);
    const [location, setLocation] = useState({
        province: 0,
        district: 0,
        ward: 0
    })

    //cắt lấy firstname và lastname 
    const getName = (name) => {
        return {
          first_name: name.slice(0, name.indexOf(' ')),
          last_name: name.slice(name.indexOf(' ') + 1)
        }
    }

    const handleGetLocation = (data) => {
        setLocation(data);
    }

    const onSubmit = (data) => {
        loadingRef.current.style.display = "flex";
        const parentInfor = {
            "avatar": null,
            "identity_card": null,
            "number_phone": data.telephone || null,
            "number_of_identity_card": data.identitycard || null,
            "first_name": getName(data.name).first_name || null,
            "last_name": getName(data.name).last_name || null,
            "birthday": data.birthday || null,
            "location": null,
            "province_code": Number(location.province),
            "district_code": Number(location.district),
            "ward_code": Number(location.ward),
            "detail_location": data.detailLocation || null,
        }
        
        dispatch(setParentTrue());
        registerParentInfor({
            token: token,
            parentInfor: parentInfor,
        }).then((response) => {
            if (response.ok) {
                dispatch(setId({idParent: response.id}));
                setParentIdCookie(response.id);
                alert(`Bạn đã đăng kí làm phụ huynh thành công.`);
                history.push("/");
            } else {
                loadingRef.current.style.display = "none";
                alert("Có lỗi xảy ra, bạn hiện tại chưa thể đăng kí làm phụ huynh, vui lòng thử lại sau.");
            }
          });
    }

    return (
        <div className="register__parent">
            <form className="register__parent__form" onSubmit={handleSubmit(onSubmit)}> 
                <p className="resgister__parent__form__title">Đăng kí làm phụ huynh</p>
                <div className="register__parent__form__control"> 
                    <label>Họ và Tên</label>
                    <input 
                        name="text" 
                        type="name"
                        {...register("name", { required: true})}
                    />             
                    {errors.name && 
                        <span className="register__parent__form__error">Nhập đúng tên của bạn</span>}
                </div>
                <div className="register__parent__form__control">
                    <label>Số điện thoại</label>
                    <input 
                        name="telephone" 
                        type="number"
                        {...register("telephone", { required: true, minLength: 8})}
                    />
                    {errors.telephone && 
                        <span className="register__parent__form__error">Cần nhập đúng số điện thoại</span>}
                </div>
                <div className="register__parent__form__control">
                    <label>Ngày sinh</label>
                    <input 
                        name="birthday" 
                        type="date"
                        {...register("birthday", { required: true})}
                    />
                    {errors.birthday && 
                        <span className="register__parent__form__error">Cần nhập ngày sinh</span>}
                </div>
                <div className="register__parent__form__control">
                    <label>Địa chỉ</label>
                    <Location onChange={handleGetLocation} />
                </div>
                <div className="register__parent__form__control">
                    <label>Chi tiết địa chỉ</label>
                    <input 
                        name="detailLocation" 
                        type="text"
                        {...register("detailLocation")}
                    />
                </div>
                <div className="register__parent__form__control">
                    <label>Số CMND/CCCD (không bắt buộc)</label>
                    <input 
                        name="identitycard" 
                        type="number"
                        {...register("identitycard")}
                    />
                </div>
                <div className="register__parent__form__control"> 
                    <Button variant="contained" color="primary" type="submit">Đăng kí</Button>
                </div>
            </form>
            <div ref={loadingRef} className="register__parent__loading"> 
                <CircularProgress />
             </div>
        </div>
    );
}

export default RegisterParent;