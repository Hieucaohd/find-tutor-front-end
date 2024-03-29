import loadable from '@loadable/component';
import { Box, Grid } from '@material-ui/core';
import { handleTime } from 'containers/date';
import React, { useEffect, useState } from 'react';
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoLocationOutline, IoMaleFemaleOutline, IoSchoolOutline, IoTimerOutline } from "react-icons/io5";
import { catchDistrictName, catchProvinceName, getDistrictName, getProvinceName } from '../location/getLocation';
import { smallerSubject } from "../../containers/picture";
import { formatPriceString, getSexOfTeacher, getStringId, getTypeTutorString } from './room.js';
import "./styles.scss";

const UserRoomButton = loadable(() => import('./components/UserRoomButton'))
const HomeButton = loadable(() => import('./components/HomeButton'))
const InfoButton = loadable(() => import('./components/InfoButton'))


function Room( {room, onDelete, onCheck, onWait, onHome=false, typeTutor=false, typeParent=false, type} ) {
    const [address, setAddress] = useState("");

    const handleDelete = () => {
        onDelete(room.id);
    }

    const handleCheck = () => {
        onCheck(room.id);
        setNumberWaiting(room.number_waiting + 1);
    }

    const [numberWaiting, setNumberWaiting] = useState(room.number_waiting);

    useEffect( () => {
        const getAddress = async () => {
            const provinceName = await getProvinceName(room.province_code);
            const districtName = await getDistrictName({
                provinceCode: room.province_code,
                districtCode: room.district_code,
            });
            setAddress(`${districtName ? `${catchDistrictName(districtName)},` : ""} ${ provinceName ? `${catchProvinceName(provinceName)}` : "" }`)
        }
        getAddress();
    }, [room.province_code, room.district_code]);
    
    return (
        <Grid item key={room.id} className="room" xs={12} sm={6} md={4} lg={3} >
            <Box mb={4} display="flex" justifyContent="center" alignItems="center">
            
            <div className="item__room">
                <div className="item__room__avatar text-gray-600">
                    {/* <Avatar 
                        src = {room?.parent?.user?.imageprivateusermodel?.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_3I4Y2ydmFBosgWcdoqVBBCsYZksWAhHtjg&usqp=CAU"}
                    /> */}
                ID{getStringId(room.roomId)} · {room?.parent?.user?.username}
                </div>
                <span className="item__room__clock text-gray-600"><AiOutlineClockCircle/>{handleTime(room?.create_at)}</span>
                <div className="item__room__thumbnail">
                    {/* <img src={subject[room.subject.trim()] || subject["Mặc Định"]} alt="mon hoc"/> */}
                    <img src={smallerSubject[room.subject.trim()].default || smallerSubject["Mặc Định"].default} alt={room.subject}/>
                    <div>
                        <h3>{room.subject} <span>{room.lop}</span></h3>
                        <h5>{formatPriceString(room?.pricemodel_set[0]?.money_per_day)} đ/buổi</h5>
                    </div>
                </div>
                <div className="item__room__info">
                    {getSexOfTeacher(room?.pricemodel_set[0]?.sex_of_teacher) && <div>
                        <IoMaleFemaleOutline /> {getSexOfTeacher(room?.pricemodel_set[0]?.sex_of_teacher)}
                    </div>}
                    { getTypeTutorString(room?.pricemodel_set[0]?.type_teacher) && <div>
                        <IoSchoolOutline /> {getTypeTutorString(room?.pricemodel_set[0]?.type_teacher)}
                    </div>}
                    <div>
                        <IoLocationOutline /> {address}
                    </div>
                    <div>
                        <IoTimerOutline /> {room?.pricemodel_set[0]?.time_in_one_day} tiếng/buổi
                    </div>
                </div>
                <span className="item__room__current">Có {numberWaiting} gia sư đang ứng tuyển</span>
                {type==="home" && <HomeButton onCheck={handleCheck} id={room.roomId} roomAddress={`/room/${room.roomId}`} typeParent={typeParent}/>}
                {type==="userroom" && <UserRoomButton onDelete={handleDelete} roomAddress={`/room/${room.roomId}`}/>}
                {type==="info" && <InfoButton roomAddress={`/room/${room.roomId}`}/>}

            </div>

        </Box>
        </Grid>
    );
}

export default Room;

// mutation {
//     create_parent_room(input_fields: {
//       lop: 12,
//       province_code: 1,
//       ward_code: 1,
//       district_code: 1,
//       detail_location: "ha noi",
//       day_can_teach: [2,3],
//       subject: "toan",
//       prices:{
//         time_in_one_day: 4,
//         money_per_day: 15000,
//         type_teacher: "gv",
//         sex_of_teacher: "nu"
//       }
//    })
//     {
//       parent_room{
//         id
//         lop
//         province_code
//         district_code
//         ward_code
//       }
//     }
//   }