import { changePassword } from 'axios/profile';
import Loading from 'components/Loading/Loading';
import Modal from 'components/Modal/Modal';
import { selectEmail, selectUsername } from 'features/auth/authSlice';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ChangePassword from './ChangePassword';

function SettingsAccount(props) {
    const userName = useSelector(selectUsername);
    const email = useSelector(selectEmail);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);

    const handleChangePassword = async ({oldPassword, newPassword}) => {
        setShowLoading(true);
        const response = await changePassword({
            oldPassword: oldPassword,
            newPassword: newPassword,
        })
        setShowLoading(false);
        if(response) {
            setShowSuccessModal(true);
        } else {
            setShowFailedModal(true);
        }
    }

    return (
        <div className="settings__account">
            <div className="settings__field">
                <label>Tên tài khoản</label>
                <input type="text" disabled defaultValue={userName}/>
            </div>
            <div className="settings__field">
                <label>Email</label>
                <input type="text" disabled defaultValue={email}/>
            </div>
            <div className="settings__field">
                <label>Mật khẩu</label>
                <button onClick={() => setShowChangePassword(true)}>Đổi mật khẩu</button>
            </div>
            {showChangePassword && <ChangePassword onClose={()=>setShowChangePassword(false)} onSubmit={handleChangePassword}/>}
            {showLoading && <Loading />}
            {showSuccessModal && <Modal typeIcon="check" text="Đổi mật khẩu thành công" onAgree={() => {setShowChangePassword(false);setShowSuccessModal(false)}}/>}
            {showFailedModal && <Modal typeIcon="fail" text="Đổi mật khẩu không thành công" onAgree={() => setShowFailedModal(false)} />}
        </div>
    );
}

export default SettingsAccount;