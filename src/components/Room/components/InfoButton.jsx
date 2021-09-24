import React from 'react';
import "./styles.scss";

InfoButton.propTypes = {
    
};


function InfoButton({onShow}) {
    return (
        <div className="button">
            <button className="button__detail" onClick={()=>onShow()}>Xem chi tiết</button>
        </div>
    );
}

export default InfoButton;