import { selectIsSignedIn, selectType_parent, selectType_tutor } from 'features/auth/authSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Route, useHistory } from 'react-router-dom';
import SettingsAccount from './components/SettingsAccount';
import SettingsParent from './components/SettingsParent';
import SettingsTutor from './components/SettingsTutor';
import "./styles.scss";

function Settings(props) {
    const isSigned = useSelector(selectIsSignedIn);
    const history = useHistory();
    if(!isSigned) {
        history.push("/");
    }
    const typeTutor = useSelector(selectType_tutor);
    const typeParent = useSelector(selectType_parent);
    return (
        <div style={{ marginTop: 56 }} className="settings">
            <div className="settings__nav">
                <NavLink to="/settings/account">Tài khoản</NavLink>
                {typeTutor && <NavLink to="/settings/profile/tutor">Thông tin gia sư</NavLink>}
                {typeParent && <NavLink to="/settings/profile/parent">Thông tin phụ huynh</NavLink>}
            </div>
            <div className="settings__content">
                <Route exact path="/settings/account" component={SettingsAccount} />
                <Route exact path="/settings/profile/parent" component={SettingsParent} />
                <Route exact path="/settings/profile/tutor" component={SettingsTutor} />
            </div>

        </div>
    );
};

export default Settings;