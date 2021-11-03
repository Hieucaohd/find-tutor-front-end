import Loading from 'components/Loading/Loading';
import Location from "components/location/Location.jsx";
import Modal from 'components/Modal/Modal';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { registerImage, registerParentInfor } from '../../registerAccount';

function RegisterParent(props) {
    const [loading, setLoading] = useState(false);
    const {register, formState: { errors }, handleSubmit, watch} = useForm();
    const password = useRef({});
    password.current = watch("password", "");
    const dispatch = useDispatch();
    const history = useHistory();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);
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

    const onSubmit = async(data) => {
        setLoading(true);
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
            "link": [
                { 
                    "name": 'facebook',
                    "url": data.facebook.replace(/^\s+|\s+$/g,"") ? data.facebook : "",
                },
                { 
                    "name": 'instagram',
                    "url": data.instagram.replace(/^\s+|\s+$/g,"") ? data.instagram : "",
                },
                { 
                    "name": 'linkedln',
                    "url": data.linkedln.replace(/^\s+|\s+$/g,"") ? data.linkedln : "",
                }
            ]
        }
        
        const registerReponse = await registerParentInfor({
            parentInfor: parentInfor,
            dispatch: dispatch,
        });
        const file = new FormData()
        file.append('avatar', data.avatar[0]);
        const imageResponse = registerReponse ? await registerImage({file}) : false ;
        setLoading(false);
        if(imageResponse){
            setShowSuccessModal(true);
            history.push("/");
        }else {
            setShowFailedModal(true);
        }
    }

    return (
        <div className="role">
            <form className="role__form" onSubmit={handleSubmit(onSubmit)}> 
                <p>Đăng kí làm phụ huynh</p>
                <div className="role__form__field" > 
                    <label>Họ và Tên</label>
                    <input 
                        name="text" 
                        type="name"
                        {...register("name", { required: true})}
                    />             
                    {errors.name && 
                        <span className="role__form__error">Nhập đúng tên của bạn</span>}
                </div>
                <div className="role__form__field">
                    <label>Số điện thoại</label>
                    <input 
                        name="telephone" 
                        type="number"
                        {...register("telephone", { required: true, minLength: 8})}
                    />
                    {errors.telephone && 
                        <span className="role__form__error">Cần nhập đúng số điện thoại</span>}
                </div>
                <div className="role__form__field">
                    <label>Ngày sinh</label>
                    <input 
                        name="birthday" 
                        type="date"
                        {...register("birthday", { required: true})}
                    />
                    {errors.birthday && 
                        <span className="role__form__error">Cần nhập ngày sinh</span>}
                </div>
                <div className="role__form__field">
                    <label>Ảnh đại diện</label>
                    <input type="file" name="avatar" {...register("avatar")}/>
                </div>
                <div className="role__form__field">
                    <label>Địa chỉ</label>
                    <Location onChange={handleGetLocation} />
                </div>
                <div className="role__form__field">
                    <label>Chi tiết địa chỉ</label>
                    <input 
                        name="detailLocation" 
                        type="text"
                        {...register("detailLocation")}
                    />
                </div>
                <div className="role__form__field">
                    <label>Số CMND/CCCD (không bắt buộc)</label>
                    <input 
                        name="identitycard" 
                        type="number"
                        {...register("identitycard")}
                    />
                </div>
                <div className="role__form__field">
                    <label>Link Facebook (nếu có)</label>
                    <input  
                        type="text" 
                        name="facebook"
                        {...register("facebook")}
                    />
                </div>
                <div className="role__form__field">
                    <label>Link Instagram (nếu có)</label>
                    <input  
                        type="text" 
                        name="instagram"
                        {...register("instagram")}
                    />
                </div>
                <div className="role__form__field">
                    <label>Link Linkedln (nếu có)</label>
                    <input  
                        type="text" 
                        name="linkedln"  
                        {...register("linkedln")}
                    />
                </div>
                <div className="role__form__field"> 
                    <button className="role__form__submit" variant="contained" color="primary" type="submit">Đăng kí</button>
                </div>
            </form>
            {loading && <Loading />}
            {showSuccessModal && <Modal typeIcon="check" text="Đăng kí làm gia sư thành công" onAgree={() => history.push("/") }/>}
            {showFailedModal && <Modal typeIcon="fail" text="Đăng kí làm gia sư không thành công" onAgree={() => setShowFailedModal(false)} />}
        </div>
    );
}


export default RegisterParent;