import { Avatar } from '@material-ui/core';
import { smallerSubject } from 'containers/picture';
import { getStringId } from 'components/Room/room';
import { handleTime } from 'containers/date';
import React from 'react';
import { Link } from 'react-router-dom';

function RoomNotification({noti, onClose}) {
    // const {room} = noti;
    
    const {text, is_seen, create_at, room} = noti;
    const getNotificationInfo =  (text, room) => {
        if(!text || !room) {
            return;
        }
        switch(text.id) {
            case "1.1" : 
                return {
                    link: `/room/${room?.id}`,
                    textNotification: (<p >Phụ huynh <strong>{text?.user_send?.username}</strong> đã tạo phòng học mới <span> </span></p>),
                    image: text?.user_send?.imageprivateusermodel?.avatar,
                }
            case "2.1": 
                return {
                    link: `/room/${room?.id}`,
                    textNotification: (<p >Gia sư <strong>{text?.user_send?.username}</strong> đã ứng tuyển vào lớp <strong>{room?.subject} {room?.lop} ID{getStringId(room?.id)}</strong> <span> · {handleTime(create_at)}</span></p>),
                    image: text?.user_send?.imageprivateusermodel?.avatar,
                }
            case "3.1": 
                return {
                    link: `/room/${room?.id}`,
                    textNotification: (<p >Gia sư <strong>{text?.user_send?.username}</strong> đã hủy ứng tuyển vào lớp <strong>{room?.subject} {room?.lop} ID{getStringId(room?.id)}</strong> <span> · {handleTime(create_at)}</span></p>),
                    image: text?.user_send?.imageprivateusermodel?.avatar,
                }
            case "4.1":
                return {
                    link: `/room/${room?.id}`,
                    textNotification: (<p><strong style={{color: "#33AF33"}}>Chúc mừng</strong> bạn đã được dạy học lớp <strong>{room?.subject} {room?.lop} ID{getStringId(room?.id)}</strong></p>),
                    image: smallerSubject[room?.subject.trim()].default,
                }
            // case "12.1":
            //     return {
            //         link: `/room/${room?.id}`,
            //         textNotification: (<p>Lớp <strong>{room?.subject} ${room?.lop} ID${getStringId(room?.id)}</strong> đã có gia sư khác dạy</p>),
            //         image: subject[room?.subject.trim()].default,
            //     }
            case "5.1":
                return {
                    link: `/room/${room?.id}`,
                    textNotification: (<p >Bạn đã bị xóa khỏi danh sách ứng tuyển lớp <strong>{room?.subject} {room?.lop} ID{getStringId(room?.id)}</strong></p>),
                    image: smallerSubject[room?.subject.trim()].default,
                }
            case "9.1": 
                return {
                    link: `/room/${room?.id}`,
                    textNotification: (<p >Bạn không còn là gia sư dạy học lớp <strong>{room?.subject} {room?.lop} ID{getStringId(room?.id)}</strong> </p>),
                    image: smallerSubject[room?.subject.trim()].default,
                }
            case "10.1": 
                return {
                    link: `/room/${room?.id}`,
                    textNotification: (<p >Gia sư <strong>{text?.user_send?.username}</strong> không còn dạy học lớp <strong>{room?.subject} {room?.lop} ID{getStringId(room?.id)}</strong></p>),
                    image: text?.user_send?.imageprivateusermodel?.avatar,
                } 
            case "11.1":
                return {
                    link: `/room/${room?.id}`,
                    textNotification: (<p >Lớp học <strong>{room?.subject} {room?.lop} ID{getStringId(room?.id)}</strong> đã có gia sư dạy chính thức</p>),
                    image: text?.user_send?.imageprivateusermodel?.avatar,
                }
            default:
        }
    }

    // const {link, textNotification, image} = getNotificationInfo(text, room);

    return (
        <Link to={getNotificationInfo(text, room)?.link} onClick={() => onClose()} className="noti__list__item">
            <Avatar src={getNotificationInfo(text, room)?.image} alt={room?.subject} />
            {getNotificationInfo(text, room)?.textNotification}
        </Link>
    );
}

export default RoomNotification;