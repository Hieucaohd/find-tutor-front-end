import { Box, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoMaleFemaleOutline, IoSchoolOutline, IoLocationOutline, IoTimerOutline } from "react-icons/io5";
import { useHistory } from 'react-router-dom';
import { catchDistrictName, catchProvinceName, getDistrictName, getProvinceName } from '../location/getLocation';
import { subject } from "./picture";
import "./styles.scss";
import { Avatar, makeStyles } from '@material-ui/core';
import HomeButton from './components/HomeButton/HomeButton';

Room.propTypes = {
    room: PropTypes.object.isRequired,
    onDelete: PropTypes.func,
    onCheck: PropTypes.func,
    onWait: PropTypes.bool,
    color: PropTypes.string,
    onHome: PropTypes.string,
    typeTutor: PropTypes.bool,
};

function Room( {room, onDelete, onCheck, onWait, onHome=false, typeTutor=false, type} ) {
    console.log('room', room)
    const history = useHistory();
    const [address, setAddress] = useState("");
    // const [showModal, setShowModal] = useState(false);
    const handleShowDetailRoom = () => {
        //navigate to detail room
        history.push(`/room/${room.roomId}`);
    }

    const handleDelete = () => {
        onDelete(room.id);
    }

    const handleCheck = () => {
        onCheck(room.id);
    }

    const getTypeTutorString = (typeTeacher) => {
        if(!typeTeacher) return ;
        if(typeTeacher === "Giao Vien, Sinh Vien") {
            return false;
        } else if (typeTeacher === "Giao Vien") {
            return "Giáo viên";
        } else if (typeTeacher === "Sinh Vien") {
            return "Sinh viên"
        }
    }

    const getSexOfTeacher = (sex)=> {
        if(!sex) return "";
        if (sex === "NAM") {
            return "Gia sư nam";
        } else if (sex === "NU") {
            return"Gia sư nữ";
        }
        return false;
    }

    const formatPriceString = (price) => {
        const priceString = price.toString();
        let ans = "";
        const len = priceString.length;
        let count = 0;
        for(let i = len - 1; i >= 0; i--) {
          count++;
          ans = priceString[i] + ans;
          if(count %3 ===0 && count !== len) {
            ans = "." + ans
          }
        }
        return ans;
    }

    useEffect( () => {
        const getAddress = async () => {
            const provinceName = await getProvinceName(room.province_code);
            const districtName = await getDistrictName({
                provinceCode: room.province_code,
                districtCode: room.district_code,
            });
            setAddress(`${catchDistrictName(districtName)}, ${catchProvinceName(provinceName)}`)
        }
        getAddress();
    }, []);
    return (
        <Grid item key={room.id} className="room" xs={12} sm={6} md={4} lg={3} className="room" >
            <Box mb={4} display="flex" justifyContent="center" alignItems="center">
            <div className="item__room">
                <div className="item__room__avatar">
                    <Avatar 
                        src = {room?.parent?.user?.imageprivateusermodel?.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_3I4Y2ydmFBosgWcdoqVBBCsYZksWAhHtjg&usqp=CAU"}
                    />
                
                {room?.parent?.user?.username}</div>
                <span className="item__room__clock"><AiOutlineClockCircle/> 2 giờ trước</span>
                <div className="item__room__thumbnail">
                    <img src={subject[room.subject] || subject["Mặc Định"]} alt="mon hoc"/>
                    <div>
                        <h3>{room.subject} <span>{room.lop}</span></h3>
                        <h5>{formatPriceString(room.pricemodel_set[0].money_per_day)} đ/buổi</h5>
                    </div>
                </div>
                <div className="item__room__info">
                    {getSexOfTeacher(room.pricemodel_set[0].sex_of_teacher) && <div>
                        <IoMaleFemaleOutline /> {getSexOfTeacher(room.pricemodel_set[0].sex_of_teacher)}
                    </div>}
                    { getTypeTutorString(room.pricemodel_set[0].type_teacher) && <div>
                        <IoSchoolOutline /> {getTypeTutorString(room.pricemodel_set[0].type_teacher)}
                    </div>}
                    <div>
                        <IoLocationOutline /> {address}
                    </div>
                    <div>
                        <IoTimerOutline /> {room.pricemodel_set[0].time_in_one_day} tiếng/buổi
                    </div>
                </div>
                <span className="item__room__current">Có 4 gia sư đang ứng tuyển</span>
                {type==="home" && <HomeButton onCheck={handleCheck} id={room.roomId} onShow={handleShowDetailRoom}/>}
            </div>
        </Box>
        </Grid>
    );
}

export default Room;