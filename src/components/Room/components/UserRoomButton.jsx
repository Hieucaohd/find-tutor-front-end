import Modal from 'components/Modal/Modal';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./styles.scss";

function UserRoomButton({onDelete, roomAddress, typeParent}) {
    const [showModal, setShowModal] = useState(false);
    const handleDelete = () => {
        if(!onDelete) return;
        onDelete();
        setShowModal(false)
    }
    return (
        <div className="button">
            <button  className="button__delete" onClick={()=> setShowModal(true)}>Xóa</button>
            <Link to={roomAddress} className="button__detail" >Xem chi tiết</Link>
            {showModal && <Modal typeIcon="delete" text="Xóa phòng này khỏi danh sách ?" onAgree={handleDelete} onDisagree={() => setShowModal(false)}/>}
        </div>
    );
}

export default UserRoomButton;