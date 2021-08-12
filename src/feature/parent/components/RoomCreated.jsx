import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteRoom } from "../../home/homeSlice";


function RoomCreated({ room ,token , parentid }){
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDeleteRoom = (roomId) => {
    dispatch(deleteRoom({ roomId: roomId, token: token }));
  };

  const handleShowDetailRoom = (room) => {
      //navigate to detail room
      history.push(`/room/${room.id}`);
  }

  return (
    <li key={room.id}>
        subject: {room.subject}, lop: {room.lop}, location: {room.location},
        parent_id: {room.parent}, other_require: {room.other_require},
        day_can_teach:{room.day_can_teach}
        <div>
          {room.parent === parentid ? (
            <button onClick={() => handleDeleteRoom(room.id)}>Delete</button>
          ) : null}
        </div>
        <div>
        <button onClick={ () => handleShowDetailRoom(room)}>show detail</button>
        </div>
      </li>
  );
}

export default RoomCreated;
