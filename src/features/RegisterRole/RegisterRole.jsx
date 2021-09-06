import React from 'react';
import { Route, Switch } from "react-router-dom";
import RegisterParent from './components/RegisterParent/RegisterParent';
import RegisterTutor from './components/RegisterTutor/RegisterTutor';
import ChooseRole from './components/ChooseRole/ChooseRole';

RegisterRole.propTypes = {
    
};

function RegisterRole(props) {
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