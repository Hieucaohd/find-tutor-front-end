import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { GiTeacher } from "react-icons/gi";
import { Button } from '@material-ui/core';
import { RiParentFill } from "react-icons/ri";
import "./styles.scss";
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../auth/authSlice';

RegisterRole.propTypes = {
    
};

function RegisterRole(props) {
    const history = useHistory();
    const token = useSelector(selectToken);

    useEffect( () => {
        if(!token) {
            history.push("/login");
        }
    }, [token])

    const handleChooseParent = () => {
        history.push("/signup/parent");
    }

    const handleChooseTutor = () => {
        history.push("/signup/tutor");
    }

    return (
        <div class="registerrole">
            
            <Button onClick={handleChooseTutor}>
                <GiTeacher />
                Đăng kí làm gia sư
            </Button>

            <Button onClick={handleChooseParent}>
                <RiParentFill />
                Đăng kí làm phụ huynh
            </Button>

            <div> 

            </div>
        </div>
    );
}

export default RegisterRole;