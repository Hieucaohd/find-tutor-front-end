import { Button, CircularProgress, makeStyles } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectToken, setId, setTutorTrue } from '../../../auth/authSlice';
import { setTutorIdCookie } from '../../../auth/cookies';
import Location from "components/location/Location";
import { registerTutorInfor } from '../../registerAccount';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        marginTop: '56px',
    },
    form: {
        [theme.breakpoints.down('sm')]: {
            backgroundColor: 'none',
            width: '310px',
            padding: '0',
        },
        [theme.breakpoints.up('md')]: {
            backgroundColor: 'white',
            width: '400px',
            padding: '20px 40px',
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
            width: '92%',
            padding: '8px 16px',
            borderRadius: '64px',
            border: '1px solid #ccc',
            '&:focus-visible': {
                outline: 'none',
            }
        },
        '& button': {
            width: '100%',
        },
        '& label': {
            fontSize: '12px',
            fontWeight: 500,
        }
    },
    check: {
        display: 'flex',
    },
    profession: {
        padding: '8px 8px',
        border: '1px solid #ccc',
        borderRadius: '64px',
        marginTop: '2px',
    },
    choose: {
        display: 'flex',
        justifyContent: 'space-between',
        border: '1px solid',
        borderRadius: '8px',
        marginTop: '1px',
    },
    error: {
        fontSize: '12px',
        color: 'red',
    },
    submit: {
        backgroundColor: '#5037EC',
        color: 'white',
        border: 'none',
        borderRadius: '64px',
        padding: '10px 0px',
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

function RegisterTutor(props) {
    const classes = useStyles();
    const token = useSelector(selectToken);
    const history = useHistory();
    const {register, formState: { errors }, handleSubmit, watch} = useForm();
    const password = useRef({});
    password.current = watch("password", "");
    const dispatch = useDispatch();
    const loadingRef = useRef(null);
    const [location, setLocation] = useState({
        province: 0,
        district: 0,
        ward: 0
    });
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

    const onSubmit = (data) => {
        loadingRef.current.style.display = "flex";
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

        dispatch(setTutorTrue());
        registerTutorInfor({
            token: token,
            tutorInfor: tutorInfor,
        }).then((response) => {
            if (response.ok) {
                alert(`Bạn đã đăng kí làm gia sư thành công.`);
                setTutorIdCookie(response.id);
                dispatch(setId({idTutor: response.id}));
                history.push("/");
            } else {
                loadingRef.current.style.display = "none";
                alert("Có lỗi xảy ra, bạn hiện tại chưa thể đăng kí làm gia sư, vui lòng thử lại sau.");
            }
          });
    }    
    return (
        <div className={classes.root}>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}> 
                <p>Đăng kí làm gia sư</p>
                <div className={classes.formField}> 
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
                    <label>Số CMND/CCCD (không bắt buộc)</label>
                    <input 
                        name="identitycard" 
                        type="number"
                        {...register("identitycard")}
                    />
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
                    <label>Ảnh đại diện</label>
                    <input type="file" name="avatar" />
                </div>
                <div className={classes.formField}>
                    <label>Nghề nghiệp hiện tại</label>
                    <select className={classes.profession} name="profession" {...register("profession")}>
                        <option value="sv">Sinh Viên</option>
                        <option value="gv">Giáo Viên</option>
                    </select>
                </div>
                <div className={classes.formField} >
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
                </div>
                <div className={classes.formField}>
                    <label>Khu vực dạy (không bắt buộc)</label>
                    <input 
                        name="teachlocation" 
                        type="text"
                        {...register("teachLocation")}
                    />
                </div>
                <div className={classes.formField}>
                    <label>Trường Đại Học (không bắt buộc)</label>
                    <input  
                        type="text" 
                        name="university"
                        {...register("university")}
                    />
                </div>
                <div className={classes.formField}>
                    <label>Kinh nghiệm (không bắt buộc)</label>
                    <input 
                        name="experience" 
                        type="text"
                        {...register("experience")}
                    />
                </div>
                <div className={classes.formField}>
                    <label>Thành tích nổi bật (không bắt buộc)</label>
                    <input 
                        name="achievement" 
                        type="text"
                        {...register("achievement")}
                    />
                </div>
                <div className={classes.formField}> 
                    <button className={classes.submit} variant="contained" color="primary" type="submit">Đăng kí</button>
                </div>
            </form>
            <div ref={loadingRef} className={classes.loading}> 
                <CircularProgress />
             </div>

        </div>
    );
}

export default RegisterTutor;