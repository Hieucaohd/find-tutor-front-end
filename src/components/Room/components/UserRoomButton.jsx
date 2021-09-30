import Modal from 'components/Modal/Modal';
import React from 'react';
import { useState } from 'react';
import "./styles.scss";


function UserRoomButton({onDelete, onShow, typeParent}) {
    const [showModal, setShowModal] = useState(false);
    const handleDelete = () => {
        if(!onDelete) return;
        onDelete();
        setShowModal(false)
    }
    return (
        <div className="button">
            <button className="button__delete" onClick={()=> setShowModal(true)}>Xóa</button>
            <button className="button__detail" onClick={()=> onShow()}>Xem chi tiết</button>
            {showModal && <Modal typeIcon="delete" text="Xóa phòng này khỏi danh sách ?" onAgree={handleDelete} onDisagree={() => setShowModal(false)}/>}
        </div>
    );
}

export default UserRoomButton;