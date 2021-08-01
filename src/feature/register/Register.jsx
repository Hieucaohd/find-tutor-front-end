import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import RegisterParent from './components/RegisterParent/RegisterParent';
import RegisterTutor from './components/RegisterTutor/RegisterTutor';
import "./styles.scss";

Register.propTypes = {
    
};

function Register(props) {
    return (
        <div class = "register">
        <Switch>
            <Route exact path="/signup/tutor" component={RegisterTutor}/>
            <Route exact path="/signup/parent" component={RegisterParent} />
        </Switch>
        <NavLink to = "/signup/tutor">Đăng kí làm gia sư</NavLink>
        <NavLink to = "/signup/parent">Đăng kí làm phụ huynh</NavLink>
        
        </div>
    );
}

export default Register;