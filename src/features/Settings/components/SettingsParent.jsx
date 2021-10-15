import React from 'react';
import SettingsLocation from 'components/location/SettingsLocation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { selectId_of_user, selectToken } from 'features/auth/authSlice';
import { GetParentProfile } from 'graphql/ProfileQueries';
import { Fragment } from 'react';
import { getName, updateLink, updateParentProfile } from '../settings';
import { useForm } from 'react-hook-form';
import Loading from 'components/Loading/Loading';
import Modal from 'components/Modal/Modal';

SettingsParent.propTypes = {
    
};

function SettingsParent(props) {

    const [parentData, setParentData] = useState(null);
    const token = useSelector(selectToken);
    const userId = useSelector(selectId_of_user);
    const [onShowSave, setOnShowSave] = useState(false);
    const [newParentProfile, setNewParentProfile] = useState({});
    const {register, formState: { errors }, handleSubmit} = useForm();
    const [showLoading, setShowLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);
    
    useEffect(()=> {
        const getData = async () => {
            const data = await GetParentProfile(userId, token);
            setParentData(data);
        }
        getData();
    }, [token, userId])
    
    const handleChangeLink = (data) => {
        let linkArr = [];
        const currentFbLink = parentData?.linkmodel_set?.find(item => item?.name === 'facebook');
        const currentInsLink = parentData?.linkmodel_set?.find(item => item?.name === 'instagram');
        const currentLinkedLink = parentData?.linkmodel_set?.find(item => item?.name === 'linkedln');
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

    const handleOnChangeProfile = (e, type) => {
        setOnShowSave(true);
        const target = e.target.value;
        if(type==="name") {
            const {first_name, last_name} = getName(target);
            setNewParentProfile({
                ...newParentProfile,
                "first_name": first_name,
                "last_name": last_name,
            })   
        } else {
            setNewParentProfile({
                ...newParentProfile,
                [type]: target,
            })
        }
    }

    const handleOnChangeLocation = ({province_code, district_code, ward_code}) => {
        setOnShowSave(true);
        setNewParentProfile({
            ...newParentProfile,
            province_code: province_code, 
            district_code: district_code,
            ward_code: ward_code,
        }) 
    }

    const onSubmit = async (data) => {
        setShowLoading(true);
        let response = await updateParentProfile({
            newTutorInfo: newParentProfile,
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
        {parentData && <form onSubmit={handleSubmit(onSubmit)} className="settings__parent">
            <div className="settings__field">
                <label>Họ và tên</label>
                <input 
                    type="text" 
                    defaultValue={`${parentData?.first_name} ${parentData?.last_name}`}
                    {...register("name", { required: true})}
                    onChange={ e => handleOnChangeProfile(e, "name")}
                />
                {errors.name && 
                        <span className="settings__field__error">Tên không hợp lệ</span>}
            </div>
            <div className="settings__field">
                <label>Số điện thoại</label>
                <input type="number" defaultValue={parentData?.number_phone}
                    onChange={ e => handleOnChangeProfile(e, "number_phone")}
                    {...register("telephone", { required: true, minLength: 8})}
                />
                {errors.telephone && 
                        <span className="settings__field__error">Số điện thoại không hợp lệ</span>}    
            </div>
            <div className="settings__field">
                <label>Ngày sinh</label>
                <input type="date" 
                    defaultValue={parentData?.birthday}
                    onChange={ e => handleOnChangeProfile(e, "birthday")}
                />
            </div>
            {/* <div className="settings__field">
                <label>Ảnh đại diện</label>
                <input type="file" />
            </div> */}
            <SettingsLocation onChange={handleOnChangeLocation} defaultLocation={{province: parentData?.province_code, ward: parentData?.ward_code, district: parentData?.district_code}}/>
            <div className="settings__field">
                <label>Link Facebook</label>
                <input 
                    type="text"
                    defaultValue={parentData?.linkmodel_set?.find(item => item?.name === 'facebook')?.url || ""}
                    {...register("facebook")}
                    onChange={(e) => setOnShowSave(true)}
                />
            </div>
            <div className="settings__field">
                <label>Link Instagram</label>
                <input 
                    type="text"
                    defaultValue={parentData?.linkmodel_set?.find(item => item?.name === 'instagram')?.url || ""}
                    {...register("instagram")}
                    onChange={(e) => setOnShowSave(true)}
                />
            </div>
            <div className="settings__field">
                <label>Link Linkedin</label>
                <input 
                    type="text"
                    defaultValue={parentData?.linkmodel_set?.find(item => item?.name === 'linkedln')?.url || ""}
                    {...register("linkedln")}
                    onChange={(e) => setOnShowSave(true)}
                />
            </div>
            {onShowSave && <div style={{display: 'flex', justifyContent: 'center'}}>
                <button type="submit" className="settings__save">Lưu</button>
            </div>}
        </form>}
        {showLoading && <Loading />}
        {showSuccessModal && <Modal typeIcon="check" text="Thay đổi thông tin thành công" onAgree={() => setShowSuccessModal(false)}/>}
        {showFailedModal && <Modal typeIcon="fail" text="Thay đổi thông tin thất bại" onAgree={() => setShowFailedModal(false)}/>}
        </Fragment>
    );
}

export default SettingsParent;