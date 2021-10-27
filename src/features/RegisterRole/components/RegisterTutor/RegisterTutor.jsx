import Loading from 'components/Loading/Loading';
import Location from "components/location/Location";
import Modal from 'components/Modal/Modal';
import FormData from 'form-data';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectToken } from '../../../auth/authSlice';
import { registerImage, registerTutorInfor } from '../../registerAccount';

function RegisterTutor(props) {
    const token = useSelector(selectToken);
    const history = useHistory();
    const {register, formState: { errors }, handleSubmit, watch} = useForm();
    const password = useRef({});
    password.current = watch("password", "");
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState({
        province: 0,
        district: 0,
        ward: 0
    });
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);

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

    const onSubmit = async(data) => {
        setLoading(true);
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

        const resgisterTutor = await registerTutorInfor({
            token: token,
            tutorInfor: tutorInfor,
            dispatch: dispatch,
        });
        const file = new FormData()
        file.append('avatar', data.avatar[0]);
        file.append('identity_card', data.cccd[0]);
        file.append('student_card', data.thesv[0]);
        const imageReponse = resgisterTutor ? await registerImage({token: token, file: file}) : false;
        setLoading(false);
        if(imageReponse){
            setShowSuccessModal(true);
            history.push("/");
        } else {
            setShowFailedModal(true);
        }
    }    
    return (
        <div className="role">
            <form className="role__form" onSubmit={handleSubmit(onSubmit)}> 
                <p>Đăng kí làm gia sư</p>
                <div className="role__form__field"> 
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
                    <label>Số CMND/CCCD (không bắt buộc)</label>
                    <input 
                        name="identitycard" 
                        type="number"
                        {...register("identitycard")}
                    />
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
                    <label>Ảnh đại diện</label>
                    <input type="file" name="avatar" {...register("avatar")}/>
                </div>
                <div className="role__form__field">
                    <label>Ảnh CCCD</label>
                    <input type="file" name="avatar" {...register("cccd")}/>
                </div>
                <div className="role__form__field">
                    <label>Nghề nghiệp hiện tại</label>
                    <select className="role__form__profession" name="profession" {...register("profession")}>
                        <option value="sv">Sinh Viên</option>
                        <option value="gv">Giáo Viên</option>
                        <option value="khac">Khác</option>
                    </select>
                </div>
                {/* <div className={classes.formField} >
                    <label>Cấp dạy</label>
                    <div className={classes.choose}>
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
                </div> */}
                {/* <div className={classes.formField}>
                    <label>Khu vực dạy (không bắt buộc)</label>
                    <input 
                        name="teachlocation" 
                        type="text"
                        {...register("teachLocation")}
                    />
                </div> */}
                {/* <div className={classes.formField}>
                    <label>Trường Đại Học/Cao Đẳng </label>
                    <input  
                        type="text" 
                        name="university"
                        {...register("university")}
                    />
                </div> */}
                <div className="role__form__field">
                    <label>Ảnh thẻ sinh viên</label>
                    <input type="file" name="avatar" {...register("thesv")}/>
                </div>
                {/* <div className={classes.formField}>
                    <label>Kinh nghiệm </label>
                    <textarea 
                        name="experience" 
                        type="text"
                        rows={3}
                        {...register("experience")}
                    />
                </div> */}
                {/* <div className={classes.formField}>
                    <label>Mô tả thêm bản thân </label>
                    <textarea 
                        name="moreinfo" 
                        type="text"
                        rows={3} 
                    />
                </div> */}
                 {/* <div className={classes.formField}>
                    <label>Link Facebook (nếu có)</label>
                    <input  
                        type="text" 
                        name="facebook"
                        {...register("facebook")}
                    />
                </div>
                <div className={classes.formField}>
                    <label>Link Instagram (nếu có)</label>
                    <input  
                        type="text" 
                        name="instagram"
                        {...register("instagram")}
                    />
                </div>
                <div className={classes.formField}>
                    <label>Link Linkedln (nếu có)</label>
                    <input  
                        type="text" 
                        name="linkedln"  
                        {...register("linkedln")}
                    />
                </div> */}
                
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



export default RegisterTutor;