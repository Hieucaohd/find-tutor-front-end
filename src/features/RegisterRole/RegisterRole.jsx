import React from 'react';
import { Route, Switch } from "react-router-dom";
import loadable from '@loadable/component'

const RegisterParent = loadable(() => import('./components/RegisterParent/RegisterParent'))
const RegisterTutor = loadable(() => import('./components/RegisterTutor/RegisterTutor'))
const ChooseRole = loadable(() => import('./components/ChooseRole/ChooseRole'))

function RegisterRole() {
    return (
        <div>
            <Switch>
                <Route exact path="/role/chooserole" component={ChooseRole}/>
                <Route exact path="/role/parent" component={RegisterParent} />
                <Route exact path="/role/tutor" component={RegisterTutor} />
            </Switch>
        </div>
    );
}

export default RegisterRole;