import { subject } from 'components/Room/picture';
import React from 'react';


function RoomNotification({noti}) {
    // const {room} = noti;

    const room = {
        subject: "Toán",
    };
    return (
        <div className="noti__list__item">
            <img src={subject[room.subject.trim()].default || subject["Mặc Định"].default} alt={room.subject} />
            <p>Lớp Ngữ Văn 7 của phụ huynh Cao Trung Hiếu vừa kết thúc hợp đồng với gia sư. Bạn có muốn dạy không?</p>
        </div>
    );
}

export default RoomNotification;