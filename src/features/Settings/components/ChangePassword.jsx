import React from 'react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillCloseCircle } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';


function ChangePassword({onClose, onSubmit}) {
    const {register, formState: { errors }, handleSubmit, watch} = useForm();
    const newpassword = useRef({});
    newpassword.current = watch("newpassword", "");

    const handleChangePassword = ({oldpassword, newpassword}) => {
        if(!onSubmit) return;
        onSubmit({
            oldPassword: oldpassword,
            newPassword: newpassword,
        })
    }
    
    return (
        <div className="settings__password">
            <div className="settings__overlay" onClick={() => onClose()}></div>
                <form className="settings__password__main" onSubmit={handleSubmit(handleChangePassword)}>
                    <AiFillCloseCircle className="settings__close" onClick={() => onClose()} />
                    <label style={{fontWeight: 700}}>Đổi mật khẩu <RiLockPasswordFill /></label>
                    <div style={{padding: "12px 16px"}}>
                    <div className="settings__field" style={{width: 240}}>
                        <label>Mật khẩu cũ</label>
                        <input type="password" {...register("oldpassword", { required: true, minLength: 6})}/>
                        
                        {errors.oldpassword && 
                            <span className="settings__field__error">Mật khẩu cần ít nhất 6 kí tự</span>}    
                    </div>
                    <div className="settings__field">
                        <label>Mật khẩu mới</label>
                        <input type="password" {...register("newpassword", { required: true, minLength: 6})}/>
                        {errors.newpassword && 
                            <span className="settings__field__error">Mật khẩu mới cần ít nhất 6 kí tự</span>}    
                    </div>
                    <div className="settings__field">
                        <label>Nhập lại mật khẩu</label>
                        <input type="password" 
                            {...register("renewpassword", {
                                validate: value =>
                                value === newpassword.current || "The passwords do not match"
                        })}
                        />
                        
                        {errors.renewpassword && 
                            <span className="settings__field__error">Mật khẩu không trùng khớp</span>}
                    </div>
                    <button type="submit">Lưu</button>
                    </div>
                </form>
        </div>
    );
}

export default ChangePassword;