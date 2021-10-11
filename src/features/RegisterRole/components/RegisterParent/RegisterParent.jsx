import { CircularProgress, makeStyles } from '@material-ui/core';
import Location from "components/location/Location.jsx";
import Modal from 'components/Modal/Modal';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectToken } from '../../../auth/authSlice';
import { registerImage, registerParentInfor } from '../../registerAccount';

function RegisterParent(props) {
    const classes = useStyles();
    const {register, formState: { errors }, handleSubmit, watch} = useForm();
    const password = useRef({});
    password.current = watch("password", "");
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const history = useHistory();
    const loadingRef = useRef(null);
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
            token: token,
            parentInfor: parentInfor,
            dispatch: dispatch,
        });
        const file = new FormData()
        file.append('avatar', data.avatar[0]);
        const imageResponse = registerReponse ? await registerImage({token, file}) : false ;
        if(imageResponse){
            loadingRef.current.style.display = "none";
            setShowSuccessModal(true);
            history.push("/");
        }else {
            loadingRef.current.style.display = "none";
            setShowFailedModal(true);
        }
    }

    return (
        <div className={classes.root}>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}> 
                <p>Đăng kí làm phụ huynh</p>
                <div className={classes.formField} > 
                    <label>Họ và Tên</label>
                    <input 
                        name="text" 
                        type="name"
                        {...register("name", { required: true})}
                    />             
                    {errors.name && 
                        <span className={classes.error}>Nhập đúng tên của bạn</span>}
                </div>
                <div className={classes.formField}>
                    <label>Số điện thoại</label>
                    <input 
                        name="telephone" 
                        type="number"
                        {...register("telephone", { required: true, minLength: 8})}
                    />
                    {errors.telephone && 
                        <span className={classes.error}>Cần nhập đúng số điện thoại</span>}
                </div>
                <div className={classes.formField}>
                    <label>Ngày sinh</label>
                    <input 
                        name="birthday" 
                        type="date"
                        {...register("birthday", { required: true})}
                    />
                    {errors.birthday && 
                        <span className={classes.error}>Cần nhập ngày sinh</span>}
                </div>
                <div className={classes.formField}>
                    <label>Ảnh đại diện</label>
                    <input type="file" name="avatar" {...register("avatar")}/>
                </div>
                <div className={classes.formField}>
                    <label>Địa chỉ</label>
                    <Location onChange={handleGetLocation} />
                </div>
                <div className={classes.formField}>
                    <label>Chi tiết địa chỉ</label>
                    <input 
                        name="detailLocation" 
                        type="text"
                        {...register("detailLocation")}
                    />
                </div>
                <div className={classes.formField}>
                    <label>Số CMND/CCCD (không bắt buộc)</label>
                    <input 
                        name="identitycard" 
                        type="number"
                        {...register("identitycard")}
                    />
                </div>
                <div className={classes.formField}>
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
                </div>
                <div className={classes.formField}> 
                    <button className={classes.submit} variant="contained" color="primary" type="submit">Đăng kí</button>
                </div>
            </form>
            <div ref={loadingRef} className={classes.loading}> 
                <CircularProgress />
             </div>
            {showSuccessModal && <Modal typeIcon="check" text="Đăng kí làm gia sư thành công" onAgree={() => history.push("/") }/>}
            {showFailedModal && <Modal typeIcon="fail" text="Đăng kí làm gia sư không thành công" onAgree={() => setShowFailedModal(false)} />}
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        marginTop: '56px',
        marginBottom: 56,
    },
    form: {
        [theme.breakpoints.down('sm')]: {
            backgroundColor: 'transparent',
            padding: '0',
            width: '80%',
        },
        [theme.breakpoints.up('md')]: {
            // backgroundColor: 'white',
            // padding: '80px',
            width: '500px',
        },
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& > p': {
            fontSize: '18px',
        }
    },
    formField: {
        width: '100%',
        marginBottom: '8px',
        display: 'flex',
        flexDirection: 'column',
        '& input': {
            padding: '8px 16px',
            borderRadius: '8px',
            border: '0.5px solid #ccc',
            backgroundColor: 'white',
        },
        '& button': {
            width: '100%',
        },
        '& label': {
            fontSize: '12px',
            fontWeight: 500,
        }
    },
    error: {
        fontSize: '12px',
        color: 'red',
    },
    submit: {
        backgroundColor: '#5037EC',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '10px 0px',
        opacity: 0.8, 
        "&:hover": {
            cursor: "pointer",
            opacity: 1,
        }
    },
    loading: {
        display: 'none',
        position: 'fixed',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)', /* Black background with opacity */
        'z-index': 2,
    }
}));

export default RegisterParent;