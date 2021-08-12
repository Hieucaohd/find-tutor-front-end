import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import "./styles.scss";
import { useHistory } from 'react-router-dom';
import { AiFillCheckCircle } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { BsFillPeopleFill } from "react-icons/bs";

Room.propTypes = {
    room: PropTypes.object.isRequired,
    onDelete: PropTypes.func,
    onCheck: PropTypes.func,
    onWait: PropTypes.bool,
    color: PropTypes.string.isRequired,
};

function Room( {room, onDelete, onCheck, onWait, color} ) {
    const history = useHistory();
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
    return (
        <Grid item key={room.id} className="room" xs={12} sm={6} md={3} lg={3} className="room">
            <Box p={3}>
            <div className="item__room" style={{backgroundColor: "#FFE7C4"}} onClick={() => handleShowDetailRoom(room)}>
            <p> 
            Room Id: {room.id}
            <br/>
            Môn học: {room.subject}
            <br/> 
            Lớp: {room.lop}
            <br/>
            Vị trí: {room.province_code} , {room.district_code} , {room.ward_code}
            <br/>
            Ngày dạy: {room.day_can_teach}
            <br/>
            Parent Id: {room.parent}
            <br/>
            Yêu cầu khác: {room.other_require}
          </p>
            {onWait === undefined 
             ? <div className="item__room__button">
                    {onCheck && onWait === undefined ? <button className="item__room__button__check" onClick={ (e) => handleCheck(e, room.id)}><AiFillCheckCircle /></button> : null}
                    {onDelete ? <button className="item__room__button__delete" onClick={ (e) => handleDelete(e, room.id)}><TiDelete /></button> :null }
                </div>
            : <div className="item__room__button">
                    {onCheck && onWait === false ? <button className="item__room__button__check" onClick={ (e) => handleCheck(e, room.id)}><AiFillCheckCircle /></button> : null}
                    {onCheck && onWait === true ? <button className="item__room__button__check"><BsFillPeopleFill /></button> : null}
                    {onDelete ? <button className="item__room__button__delete" onClick={ (e) => handleDelete(e, room.id)}><TiDelete /></button> :null }
                </div>
            }
          </div>
        </Box>
        </Grid>
    );
}

export default Room;