import { Box, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { AiFillCheckCircle, AiFillCloseCircle, AiFillHeart } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { useHistory } from 'react-router-dom';
import { catchDistrictName, catchProvinceName, getDistrictName, getProvinceName } from '../location/getLocation';
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

function Room( {room, onDelete, onCheck, onWait, color, onHome=false, typeTutor=false} ) {
    const history = useHistory();
    const [address, setAddress] = useState("");
    const handleShowDetailRoom = (room) => {
        //navigate to detail room
        history.push(`/room/${room.id}`);
    }

    const getColor = (str) => {
        if(str === 'red') {
            return '#FF7F7F';
        }
        else if(str === 'green') {
            return '#79e279';
        }
        else if(str === 'blue') {
            return '#6BBFE2';
        }
        else if(str === 'yellow') {
            return '#FFF37F';
        }
        else {
            return '#C3C8E8';
        }
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
            setAddress(`${catchDistrictName(districtName)}, ${catchProvinceName(provinceName)}`)
        }
        getAddress();
    }, [])
    return (
        <Grid item key={room.id} className="room" xs={12} sm={6} md={3} lg={3} className="room">
            <Box p={3} display="flex" justifyContent="center" alignItems="center">
            <div className="item__room" onClick={() => handleShowDetailRoom(room)}>
                <div className="item__room__thumbnail" style={{ 'background-color': getColor(color)}}>
                    <div>
                        <h4>{room.subject}<span>{room.lop}</span></h4>
                    </div>
                    <img src={subject[room.subject] || subject["Mặc Định"]} />
                </div>
                <div className="item__room__info">
                    <div>
                        <h5>{address}</h5>
                        <span>{room.pricemodel_set[0].money_per_day} đ / buổi</span>
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