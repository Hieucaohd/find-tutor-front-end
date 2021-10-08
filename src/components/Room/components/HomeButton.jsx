import React from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import "./styles.scss";



function HomeButton({onCheck, roomAddress, typeParent}) {
    const checkRef = useRef(null);
    const handleCheck = () => {
        onCheck();
        checkRef.current.style.backgroundColor = "#2DC66D";
        checkRef.current.innerHTML = "Đã ứng tuyển";
    }
    return (
        <div className="button">
            {!typeParent && <button ref={checkRef} className="button__apply" onClick={handleCheck}>Ứng tuyển</button>}
            
            <Link to={roomAddress} className="button__detail">Xem chi tiết</Link>
        </div>
    );
}

export default HomeButton;