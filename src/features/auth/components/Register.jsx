import { makeStyles, CircularProgress } from '@material-ui/core';
import { server_name } from 'namespace';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../authSlice';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        "& h1": {
            margin: '18px 0px',
        }
    },
    form: {
        [theme.breakpoints.down('sm')]: {
            backgroundColor: 'rgba(233,235,238,0.85)',
            padding: '28px 24px',
            width: '80%',
          },
          [theme.breakpoints.up('md')]: {
            backgroundColor: 'rgba(233,235,238,0.85)',
            border: '0.5px solid rgba(0,0,0,0.1)',
            padding: '28px 20px',
            width: '300px',
          },
          height: '320px',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative'
    },
    formField: {
        width: '100%',
        marginBottom: '8px',
        display: 'flex',
        flexDirection: 'column',
        '& input': {
            padding: '10px 14px' , 
            borderRadius: '64px',
            border: '1px solid #ccc',
        },
        '& button': {
            width: '100%',
        },
        '& label': {
            fontSize: '12px',
            fontWeight: '500',
        },
    },
    error: {
        fontSize: '12px',
        color: 'red',
    },
    submit:{
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
    },
    close: {
        position: 'absolute',
        top: '32px',
        right: '20px',
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '28px',
        opacity: '0.6',
        "&:hover": {
            opacity: 1,
        }
    }
}))

function Register({onClose = null}) {
    const classes = useStyles();
    const {register, formState: { errors }, handleSubmit, watch} = useForm();
    const password = useRef({});
    password.current = watch("password", "");
    const history = useHistory();
    const dispatch = useDispatch();
    const loadingRef = useRef(null);
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
                alert("Đăng kí tài khoản thành công");
                dispatch(login({
                    email: data.email,
                    password: data.password,
                }));
                history.push("/");
            } else {
                alert('Đăng kí tài khoản thất bại');
                loadingRef.current.style.display = "none";
            }
        })
    }

    const handleClose = () => {
        if(!onClose) return;
        onClose();
    }
    
    return (
        <div className = {classes.root}>
            <form className ={classes.form} onSubmit={handleSubmit(onSubmit)}> 
                <h1>Đăng kí</h1>
                {onClose && <button onClick={handleClose} className={classes.close}><IoClose /></button>}
                <div className ={classes.formField}>
                        <label>Tên tài khoản</label>
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
                            <span className ={classes.error}>Nhập đúng email của bạn</span>}
                    </div>
                    <div className ={classes.formField}> 
                        <label>Mật khẩu</label>
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
                            <span className ={classes.error}>Mật khẩu không trùng khớp</span>}
                    </div>
                    <div className ={classes.formField}> 
                        <button className ={classes.submit} type="submit" >Đăng kí tài khoản</button>
                    </div>
            </form>
            <div ref={loadingRef}  className ={classes.loading}> 
                <CircularProgress />
             </div>
        </div>
    )
}

export default Register;