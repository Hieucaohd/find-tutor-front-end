import { Box, Grid } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addWaitingListForRoom } from "../../parent_room/waitingListForRoomSlice";
import { deleteRoom } from "../homeSlice";
import './styles.scss';
import { IoIosAddCircle } from "react-icons/io";
import { renderThem } from "../conditionFunctionToRender";
import { TiDelete } from "react-icons/ti";

function Room({
  room,
  token,

  list_room_waiting,
  list_room_invited,
  list_room_try_teaching,
  id_of_user,
  type_tutor,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDeleteRoom = (e, roomId) => {
    e.stopPropagation();
    dispatch(deleteRoom({ roomId: roomId, token: token }));
  };

  const addToWaitingList = (e, roomId) => {
    e.stopPropagation()
    dispatch(addWaitingListForRoom({ roomId: roomId, token: token }));
  };

  const handleShowDetailRoom = (room) => {
      //navigate to detail room
      history.push(`/room/${room.id}`);

  }

  return (
      <Grid item key={room.id} className="room" xs={12} sm={6} md={4} lg={3}>
        <Box p={4}>
          <div className="room__item" onClick={() => handleShowDetailRoom(room)}>
            <p> 
              Room Id: {room.id}
              <br/>
              Lớp: {room.lop}
              <br/>
              Vị trí: {room.location}
              <br/>
              Ngày dạy: {room.day_can_teach}
              <br/>
              Parent Id: {room.parent}
              <br/>
              Yêu cầu khác: {room.other_require}
            </p>
            {String(type_tutor) === "true" &&
              renderThem(
              room.id,
              list_room_waiting,
              list_room_invited,
              list_room_try_teaching
            ) ? (
            <button onClick={(e) => addToWaitingList(e, room.id)}><IoIosAddCircle /></button>
          ) : null}
          {String(type_tutor) === "true" &&
              !renderThem(
              room.id,
              list_room_waiting,
              list_room_invited,
              list_room_try_teaching
            ) ? (
              <h5>Đã thêm</h5>
          ) : null}
          {room.parent === id_of_user ? (
            <button onClick={(e) => handleDeleteRoom(e, room.id)}><TiDelete /></button>
          ) : null}
          </div>
        </Box>
      </Grid>
  );
}

export default Room;
