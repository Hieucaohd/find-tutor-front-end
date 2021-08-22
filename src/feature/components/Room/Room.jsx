import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import "./styles.scss";
import { useHistory } from 'react-router-dom';
import { AiFillCheckCircle } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { BsFillPeopleFill } from "react-icons/bs";
import { catchDistrictName, catchProvinceName, getDistrictName, getProvinceName } from '../location/getLocation';
import { AiOutlineCheck, AiFillHeart, AiFillCloseCircle } from "react-icons/ai";
import { subject } from "./picture"
import { selectType_tutor } from '../../auth/authSlice';
import { useSelector } from 'react-redux';

Room.propTypes = {
    room: PropTypes.object.isRequired,
    onDelete: PropTypes.func,
    onCheck: PropTypes.func,
    onWait: PropTypes.bool,
    color: PropTypes.string.isRequired,
    onHome: PropTypes.string,
    typeTutor: PropTypes.bool,
};

function Room( {room, onDelete, onCheck, onWait, color, onHome=false, typeTutor=false} ) {
    const history = useHistory();
    const [address, setAddress] = useState({});
    const handleShowDetailRoom = (room) => {
        //navigate to detail room
        history.push(`/room/${room.id}`);
    }
    const handleDelete = (e, id) => {
        e.stopPropagation();
        onDelete(id);
    }
    const handleCheck = (e, id) => {
        e.stopPropagation();
        onCheck(id);
    }
    useEffect( () => {
        const getAddress = async () => {
            const provinceName = await getProvinceName(room.province_code);
            const districtName = await getDistrictName({
                provinceCode: room.province_code,
                districtCode: room.district_code,
            });
            setAddress({
                province: catchProvinceName(provinceName),
                district: catchDistrictName (districtName),
            })
        }
        getAddress();
    }, [])
    return (
        <Grid item key={room.id} className="room" xs={12} sm={6} md={3} lg={3} className="room">
            <Box p={3} display="flex" justifyContent="center" alignItems="center">
            <div className="item__room" onClick={() => handleShowDetailRoom(room)}>
                <div className="item__room__thumbnail">
                    <div>
                        <h4>{room.subject}<span>{room.lop}</span></h4>
                    </div>
                    <img src={subject[room.subject] || subject["Mặc Định"]} />
                </div>
                <div className="item__room__info">
                    <div>
                        <h5>{address.district}, {address.province}</h5>
                        <span>150.000đ</span>
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