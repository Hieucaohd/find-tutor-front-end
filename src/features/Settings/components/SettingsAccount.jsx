import React from 'react';

function SettingsAccount(props) {
    return (
        <div className="settings__account">
            <div className="settings__field">
                <label>Tên tài khoản</label>
                <input type="text" disabled defaultValue="hiepnk223"/>
            </div>
            <div className="settings__field">
                <label>Email</label>
                <input type="text" disabled defaultValue="hiepnguyenno01@gmail.com"/>
            </div>
            <div className="settings__field">
                <label>Mật khẩu</label>
                <button>Đổi mật khẩu</button>
            </div>
        </div>
    );
}

export default SettingsAccount;