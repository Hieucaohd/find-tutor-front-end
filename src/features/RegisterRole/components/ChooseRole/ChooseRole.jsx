import { isSignedIn } from 'features/auth/cookies';
import React from 'react';
import { useHistory } from 'react-router-dom';


function RegisterRole(props) {
    const history = useHistory();
    
    if(!isSignedIn()) {
        history.push("/signin");
    }

    const handleChooseParent = () => {
        history.push("/role/parent");
    }

    const handleChooseTutor = () => {
        history.push("/role/tutor");
    }


    return (
        <div className="choose">
            <div onClick={handleChooseTutor} className="choose__button choose__tutor">
                <img src="https://i.ibb.co/5xJH98b/teacher.webp" alt="teacher" border="0"/>
                <h4>Đăng kí làm gia sư</h4>
            </div>
        
            <div onClick={handleChooseParent} className="choose__button choose__parent">
                <img src="https://i.ibb.co/M2ypJj9/parents.webp" alt="parents" border="0"/>
                <h4>Đăng kí làm phụ huynh</h4>
            </div>
        </div>
    );
}

export default RegisterRole;