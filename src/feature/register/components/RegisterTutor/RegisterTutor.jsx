import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectToken, setDataFromRegister } from '../../../auth/authSlice';
import { registerAccount, registerTutorInfor } from '../../registerAccount';
import { useEffect } from 'react';

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
    useEffect(() => {
        if(token) {
            history.push("/");
        }
    }, [token])
    

    //cắt lấy firsename và lastname 
    const getName = (name) => {
        return {
          first_name: name.slice(0, name.indexOf(' ') + 1),
          last_name: name.slice(name.indexOf(' ') + 1)
        }
      }


    const onSubmit = async (data) => {
        // const tutorInfor = {
        //     // profession: data.profession,
        //     // universe: 'HNUE',
        //     // experience: data.experience,
        //     // achievement: data.achievement,
        //     // // cap_day: null,
        //     // // lop_day: null,
        //     // khu_vuc_day: 'Ha Noi',
        //     // // avatar: null,
        //     // // identitycard: null,
        //     // number_phone: data.telephone,
        //     // number_of_identity_card: data.indentitycard,
        //     // first_name: getName(data.name).first_name,
        //     // last_name: getName(data.name).last_name,
        //     // // birthday: data.birthday,
        //     // location: 'Ha NOI',
        //     profession: "sv",
        //     university: "HNUE",
        //     experience: "no",
        //     achievement: "data.achievement",
        //     cap_day: [2],
        //     lop_day: [2],
        //     khu_vuc_day: "Ha Noi",
        //     // avatar: null,
        //     // identitycard: null,
        //     number_phone: "7891432471",
        //     number_of_identity_card: "4781893471029",
        //     first_name: "getName(data.name).first_name",
        //     last_name: "getName(data.name).last_name",
        //     // birthday: data.birthday,
        //     birthday: "2002-02-19",
        //     location: "Ha NOI",
        // };

        const tutorInfor = {
            "profession": "sv",
            "university": "Dai hoc quoc gia Ha Noi",
            "experience": "di day 2 nam",
            "achievement": "thu khoa dau ra cua dai hoc cong nghe",
            "khu_vuc_day": "quan Hai Ba Trung, Ha Noi",
            "number_phone": "0977157490",
            "number_of_identity_card": "03030303030",
            "first_name": "Cao",
            "last_name": "Hieu",
            "location": "Cau Giay, Ha Noi",
            "lop_day": [1],
            "cap_day": [2],
            "birthday": "2002-02-19"
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
                <div className="register__tutor__form__control"> 
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
                </div>
                <div className="register__tutor__form__control" type="submit"> 
                    <button>Đăng kí</button>
                </div>
            </form>
        </div>
    );
}

export default RegisterTutor;