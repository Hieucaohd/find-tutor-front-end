import React from 'react';
import "./styles.scss";

HomeButton.propTypes = {
    
};


function HomeButton({onCheck, onShow, typeParent}) {
    return (
        <div className="button">
            {!typeParent && <button className="button__apply" onClick={()=> onCheck()}>Ứng tuyển</button>}
            <button className="button__detail" onClick={()=>onShow()}>Xem chi tiết</button>
        </div>
    );
}

export default HomeButton;