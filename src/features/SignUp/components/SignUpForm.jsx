import { CircularProgress, makeStyles } from '@material-ui/core';
import Modal from 'components/Modal/Modal';
import { server_name } from 'namespace';
import React, { useRef } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../auth/authSlice';

function SignUpForm() {
    const classes = useStyles();
    const {register, formState: { errors }, handleSubmit, watch} = useForm();
    const password = useRef({});
    password.current = watch("password", "");
    const history = useHistory();
    const dispatch = useDispatch();
    const loadingRef = useRef(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);
    const registerAccount = async (args) => {
        return await fetch(`${server_name}/auth/register/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(args),
        })
      };
    const onSubmit = (data) => {
        loadingRef.current.style.display = "flex";
        registerAccount({
            email: data.email,
            username: data.username,
            password: data.password,
        }).then((response) => {
            if(response.ok) {
                dispatch(login({
                    email: data.email,
                    password: data.password,
                }));
                setShowSuccessModal(true);
            } else {
                setShowFailedModal(true);
                loadingRef.current.style.display = "none";
            }
        })
    }

    return (
        <div className = {classes.root}>
            <form className ={classes.form} onSubmit={handleSubmit(onSubmit)}> 
                <h2>Đăng kí tài khoản</h2>
                
                <div className ={classes.formField}>
                        <label className={classes.label}>Tên tài khoản</label>
                        <input
                            name="username" 
                            type="text"
                            {...register("username", { required: true, minLength: 6})}
                        />
                        {errors.username && errors.username.type === "required" && 
                            <span className ={classes.error}>Cần nhập tên tài khoản</span>}
                        {errors.username && errors.username.type === "minLength" && 
                            <span className ={classes.error}>Tên tài khoản cần ít nhất 6 kí tự</span>}
                    </div>
                    <div className ={classes.formField}> 
                        <label className={classes.label}>Email</label>
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
                            <span className ={classes.error}>Nhập đúng email của bạn</span>}
                    </div>
                    <div className ={classes.formField}> 
                        <label className={classes.label}>Mật khẩu</label>
                        <input 
                            name="password" 
                            type="password"
                            {...register("password", { required: true, minLength: 6})}
                        />
                        {errors.password && errors.password.type === "required" && 
                            <span className ={classes.error}>Nhập mật khẩu</span>}
                        {errors.password && errors.password.type === "minLength" && 
                            <span className ={classes.error}>Mật khẩu cần ít nhất 6 kí tự</span>}
                    </div>
                    <div className ={classes.formField}> 
                        <label className={classes.label}>Nhập lại mật khẩu</label>
                        <input 
                            name="repassword" 
                            type="password"
                            {...register("repassword", {
                                validate: value =>
                                value === password.current || "The passwords do not match"
                            })}
                        />
                        {errors.repassword && 
                            <span className ={classes.error}>Mật khẩu không trùng khớp</span>}
                    </div>
                    <div className ={classes.formField}> 
                        <button className ={classes.submit} type="submit" >Đăng kí tài khoản</button>
                    </div>
            </form>
            <div ref={loadingRef}  className ={classes.loading}> 
                <CircularProgress />
             </div>
            {showSuccessModal && <Modal typeIcon="check" text="Đăng kí tài khoản thành công" onAgree={ () => history.push("/") }/>}
            {showFailedModal && <Modal typeIcon="fail" text="Đăng kí tài khoản thất bại" onAgree={() => setShowFailedModal(false)}/>}
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            width: '80%',
          },
    },
    form: {
        [theme.breakpoints.down('sm')]: {
            width: '100%',
          },
          [theme.breakpoints.up('md')]: { 
            width: '340px',
          },
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          "& h2": {
            fontSize: 24,
            marginBottom: 20,
            fontWeight: 600,
          }
    },
    formField: {
        width: '100%',
        marginBottom: '16px',
        display: 'flex',
        flexDirection: 'column',
        '& input': {
        padding: '12px 14px',
        borderRadius: '8px',
        border: '0.5px solid #ccc',
    },
    '& button': {
      width: '100%',
    },
    },
    error: {
        fontSize: '12px',
        color: 'red',
    },
    submit:{
        backgroundColor: '#006EFF',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '10px 0px',
        opacity: 0.8,
        "&:hover": {
            opacity: 1,
            cursor: 'pointer'
        }
    },
    label: {
        fontSize: '14px',
        fontWeight: '600',
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
    },
}))


export default SignUpForm;