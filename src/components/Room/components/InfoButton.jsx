import React from 'react';
import { Link } from 'react-router-dom';
import "./styles.scss";

InfoButton.propTypes = {
    
};


function InfoButton({roomAddress}) {
    
    return (
        <div className="button">
            <Link to={roomAddress} className="button__detail" >Xem chi tiết</Link>
        </div>
        
        
    );
}

export default InfoButton;