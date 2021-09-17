import { Box, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { AiFillCheckCircle, AiFillCloseCircle, AiFillHeart } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { useHistory } from 'react-router-dom';
import { catchDistrictName, catchProvinceName, getDistrictName, getProvinceName } from '../location/getLocation';
import { gradientColor } from "./color";
import { subject } from "./picture";
import "./styles.scss";

Room.propTypes = {
    room: PropTypes.object.isRequired,
    onDelete: PropTypes.func,
    onCheck: PropTypes.func,
    onWait: PropTypes.bool,
    color: PropTypes.string,
    onHome: PropTypes.string,
    typeTutor: PropTypes.bool,
};

function Room( {room, onDelete, onCheck, onWait, onHome=false, typeTutor=false} ) {
    const history = useHistory();
    const [address, setAddress] = useState("");
    // const [showModal, setShowModal] = useState(false);
    const handleShowDetailRoom = (id) => {
        //navigate to detail room
        history.push(`/room/${id}`);
    }

    const handleDelete = (e, id) => {
        e.stopPropagation();
        onDelete(id);
    }

    const handleCheck = (e, id) => {
        e.stopPropagation();
        onCheck(id);
    }

    const getTypeRoomString = (typeTeacher, sexTeacher) => {
        if(!typeTeacher && !sexTeacher) return ;
        let ans = "";
        if(typeTeacher === "Giao Vien, Sinh Vien") {
            ans += "Giáo viên, Sinh viên";
        } else if (typeTeacher === "Giao Vien") {
            ans += "Giáo viên";
        } else if (typeTeacher === "Sinh Vien") {
            ans += "Sinh viên"
        }
        if (sexTeacher === "NAM") {
            ans += " nam";
        } else if (sexTeacher === "NU") {
            ans += " nữ";
        }
        return ans;
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
        <Grid item key={room.id} className="room" xs={12} sm={6} md={3} lg={3} className="room">
            <Box mb={4} display="flex" justifyContent="center" alignItems="center">
            <div className="item__room" onClick={() => handleShowDetailRoom(room.roomId)}>
                <div className="item__room__thumbnail" style={{ 'background-image': gradientColor[room.subject] || gradientColor["Khác"]}}>
                    <div>
                        <h4>{room.subject}<span>{room.lop}</span></h4>
                    </div>
                    <img src={subject[room.subject] || subject["Mặc Định"]} alt="mon hoc"/>
                </div>
                <div className="item__room__info">
                    <div className="item__room__info__price">
                        <h4>{address}</h4>
                        <h5>{getTypeRoomString(room.pricemodel_set[0].type_teacher, room.pricemodel_set[0].sex_of_teacher)}</h5>
                        <h5><span>{formatPriceString(room.pricemodel_set[0].money_per_day)}</span> đ / buổi</h5>
                    
                    </div>
                    {onHome && typeTutor && <button onClick={ (e) => handleCheck(e, room.id)} className="item__room__info__heart">
                        <AiFillHeart />
                    </button> 
                    }
                    {!onHome && <div>
                        {onWait === undefined 
                            ? <div className="item__room__button">
                                   {onCheck && onWait === undefined ? <button className="item__room__button__check" onClick={ (e) => handleCheck(e, room.id)}><AiFillCheckCircle /></button> : null}
                                   {onDelete ? <button className="item__room__button__delete" onClick={ (e) => handleDelete(e, room.id)}><AiFillCloseCircle /></button> :null }
                               </div>
                           : <div className="item__room__button">
                                   {onCheck && onWait === false ? <button className="item__room__button__check" onClick={ (e) => handleCheck(e, room.id)}><AiFillCheckCircle /></button> : null}
                                   {onCheck && onWait === true ? <button className="item__room__button__check"><BsFillPeopleFill /></button> : null}
                                   {onDelete ? <button className="item__room__button__delete" onClick={ (e) => handleDelete(e, room.id)}><AiFillCloseCircle /></button> :null }
                               </div>
                           }
                        </div>
                    }
                </div>
          </div>
        </Box>
        </Grid>
    );
}

export default Room;