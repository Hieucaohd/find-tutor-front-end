import React from 'react';
import "./styles.scss";

UserRoomButton.propTypes = {
    
};


function UserRoomButton({onDelete, onShow, typeParent}) {
    return (
        <div className="button">
            <button className="button__delete" onClick={()=> onDelete()}>Xóa</button>
            <button className="button__detail" onClick={()=> onShow()}>Xem chi tiết</button>
        </div>
    );
}

export default UserRoomButton;