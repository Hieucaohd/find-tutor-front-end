import { selectIsSignedIn, selectType_parent, selectType_tutor } from 'features/auth/authSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Route, useHistory } from 'react-router-dom';
import "./styles.scss";

import loadable from '@loadable/component'
import Loading from 'components/Loading/Loading';

const SettingsParent = loadable(() => import('./components/SettingsParent'), {
    fallback: <Loading whiteBkg={true} />
  })
const SettingsAccount = loadable(() => import('./components/SettingsAccount'), {
    fallback: <Loading whiteBkg={true} />
  })
const SettingsTutor = loadable(() => import('./components/SettingsTutor'), {
    fallback: <Loading whiteBkg={true} />
  })

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