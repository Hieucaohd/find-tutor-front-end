import React from 'react';
import { useRef } from 'react';
import "./styles.scss";



function HomeButton({onCheck, onShow, typeParent}) {
    const checkRef = useRef(null);
    const handleCheck = () => {
        onCheck();
        checkRef.current.style.backgroundColor = "#AAAAAA";
    }
    return (
        <div className="button">
            {!typeParent && <button ref={checkRef} className="button__apply" onClick={handleCheck}>Ứng tuyển</button>}
            
            <button className="button__detail" onClick={()=>onShow()}>Xem chi tiết</button>
        </div>
    );
}

export default HomeButton;