import Loading from 'components/Loading/Loading';
import SettingsLocation from 'components/location/SettingsLocation';
import Modal from 'components/Modal/Modal';
import { selectId_of_user, selectToken } from 'features/auth/authSlice';
import { GetTutorProfile } from 'graphql/ProfileQueries';
import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { getName, updateLink, updateTutorProfile } from '../settings';
import LoadingField from './LoadingField';


function SettingsTutor(props) {
    const [tutorData, setTutorData] = useState(null);
    const token = useSelector(selectToken);
    const userId = useSelector(selectId_of_user);
    const {register, formState: { errors }, handleSubmit} = useForm();
    const [onShowSave, setOnShowSave] = useState(false);
    const [newTutorProfile, setNewTutorProfile] = useState({});
    const [showLoading, setShowLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);
    
    useEffect(()=> {
        const getData = async () => {
            const data = await GetTutorProfile(userId, token);
            setTutorData(data);
        }
        getData();
    }, [token, userId])

    const renderType = (type) => {
        if(type === "gv") {
            return (<select onChange={ e => handleOnChangeProfile(e, "profession")}>
                <option value="sv">Sinh Viên</option>
                <option value="gv" selected>Giáo Viên</option>
                <option value="khac">Khác</option>
            </select>)
        } else if (type === 'sv') {
            return (<select onChange={ e => handleOnChangeProfile(e, "profession")}>
                <option value="sv" selected>Sinh Viên</option>
                <option value="gv">Giáo Viên</option>
                <option value="khac">Khác</option>
            </select>)
        } else {
            return (<select>
                <option value="sv">Sinh Viên</option>
                <option value="gv">Giáo Viên</option>
                <option value="khac" selected>Khác</option>
            </select>)
        }
    }

    const handleOnChangeProfile = (e, type) => {
        setOnShowSave(true);
        const target = e.target.value;
        if(type==="name") {
            const {first_name, last_name} = getName(target);
            setNewTutorProfile({
                ...newTutorProfile,
                "first_name": first_name,
                "last_name": last_name,
                "cap_day": tutorData.cap_day || [],
                "lop_day": tutorData.lop_day || [],
            })   
        } else {
            setNewTutorProfile({
                ...newTutorProfile,
                [type]: target,
                "cap_day": tutorData.cap_day || [],
                "lop_day": tutorData.lop_day || [],
            })
        }
    }

    const handleOnChangeLocation = ({province_code, district_code, ward_code}) => {
        setOnShowSave(true);
        setNewTutorProfile({
            ...newTutorProfile,
            province_code: province_code, 
            district_code: district_code,
            ward_code: ward_code,
            "cap_day": tutorData.cap_day || [],
            "lop_day": tutorData.lop_day || [],
        }) 
    }

    const handleChangeLink = (data) => {
        let linkArr = [];
        const currentFbLink = tutorData?.linkmodel_set?.find(item => item?.name === 'facebook');
        const currentInsLink = tutorData?.linkmodel_set?.find(item => item?.name === 'instagram');
        const currentLinkedLink = tutorData?.linkmodel_set?.find(item => item?.name === 'linkedln');
        if(data.facebook !== currentFbLink?.url) {
            linkArr.push({
                ...currentFbLink,
                url: data.facebook,
            })
        }

        if(data.instagram !== currentInsLink?.url) {
            linkArr.push({
                ...currentInsLink,
                url: data.instagram,
            })
        }

        if(data.linkedln !== currentLinkedLink?.url) {
            linkArr.push({
                ...currentLinkedLink,
                url: data.linkedln,
            })
        }
        return linkArr;
    }

    const onSubmit = async (data) => {
        setShowLoading(true);
        let response = await updateTutorProfile({
            newTutorInfo: newTutorProfile,
            token: token,
            id: userId,
        });
        
        const newLink = await handleChangeLink(data);
        if(newLink.length!==0) {
            response = await updateLink({newLink: newLink, token: token});
        }

        setShowLoading(false);

        if(response) {
            setShowSuccessModal(true);
        } else {
            setShowFailedModal(true);
        }
    }

    return (
        <Fragment>
        {tutorData ? <form className="settings__tutor" onSubmit={handleSubmit(onSubmit)}>
            <div className="settings__field">
                <label>Họ và tên</label>
                <input type="text" 
                    defaultValue={`${tutorData.first_name} ${tutorData.last_name}`}
                    {...register("name", { required: true})}
                    onChange={ e => handleOnChangeProfile(e, "name")}
                />
                {errors.name && 
                        <span className="settings__field__error">Tên không hợp lệ</span>}    
            </div>
            
            
            <div className="settings__field">
                <label>Số điện thoại</label>
                <input 
                    type="number" 
                    defaultValue={tutorData.number_phone}
                    {...register("telephone", { required: true, minLength: 8})}
                    onChange={ e => handleOnChangeProfile(e, "number_phone")}
                />
                {errors.telephone && 
                        <span className="settings__field__error">Số điện thoại không hợp lệ</span>}    
            </div>
            <div className="settings__field">
                <label>Ngày sinh</label>
                <input type="date" 
                    defaultValue={tutorData.birthday}
                    onChange={ e => handleOnChangeProfile(e, "birthday")}
                />
            </div>
            <SettingsLocation onChange={handleOnChangeLocation} defaultLocation={{province: tutorData.province_code, ward: tutorData.ward_code, district: tutorData.district_code}}/>
            <div className="settings__field">
                <label>Nghề nghiệp</label>
                {renderType(tutorData.profession)}
            </div>
            <div className="settings__field">
                <label>Khu vực dạy</label>
                <input 
                    type="text"
                    defaultValue={tutorData.khu_vuc_day}
                    onChange={ e => handleOnChangeProfile(e, "khu_vuc_day")}
                />
            </div>
            <div className="settings__field">
                <label>Trường Đại Học/Cao Đẳng </label>
                <input  
                    type="text" 
                    onChange={ e => handleOnChangeProfile(e, "university")}
                />
            </div>
            <div className="settings__field">
                <label>Kinh nghiệm </label>
                <textarea 
                    type="text"
                    rows = {3}
                    defaultValue={tutorData.experience}
                    onChange={ e => handleOnChangeProfile(e, "experience")}
                />
            </div>
            <div className="settings__field">
                <label>Thành tích nổi bật </label>
                <textarea 
                    type="text"
                    rows = {3}
                    defaultValue={tutorData.achievement}
                    onChange={ e => handleOnChangeProfile(e, "achievement")}
                />
            </div>
            <div className="settings__field">
                <label>Mô tả bản thân </label>
                <textarea 
                    type="text"
                    rows = {3}
                    onChange={value => console.log(value.target.value)}
                />
            </div>
            <div className="settings__field">
                <label>Link Facebook</label>
                <input 
                    type="text"
                    defaultValue={tutorData?.linkmodel_set?.find(item => item?.name === 'facebook')?.url || ""}
                    {...register("facebook")}
                    onChange={(e) => setOnShowSave(true)}
                />
            </div>
            <div className="settings__field">
                <label>Link Instagram</label>
                <input 
                    type="text"
                    defaultValue={tutorData?.linkmodel_set?.find(item => item?.name === 'instagram')?.url || ""}
                    {...register("instagram")}
                    onChange={(e) => setOnShowSave(true)}
                />
            </div>
            <div className="settings__field">
                <label>Link Linkedin</label>
                <input 
                    type="text"
                    defaultValue={tutorData?.linkmodel_set?.find(item => item?.name === 'linkedln')?.url || ""}
                    {...register("linkedln")}
                    onChange={(e) => setOnShowSave(true)}
                />
            </div>
            {onShowSave && <div style={{display: 'flex', justifyContent: 'center'}}>
                <button type="submit" className="settings__save">Lưu</button>
            </div>}
        </form> : <LoadingField /> }
        {showLoading && <Loading/>}
        {showSuccessModal && <Modal typeIcon="check" text="Thay đổi thông tin thành công" onAgree={() => setShowSuccessModal(false)}/>}
        {showFailedModal && <Modal typeIcon="fail" text="Thay đổi thông tin thất bại" onAgree={() => setShowFailedModal(false)}/>}
        </Fragment>
    );
}

export default SettingsTutor;