import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { selectId_of_user, selectToken, selectType_tutor } from "../auth/authSlice";
import { fetchRoomList } from "../home/getRoom";
import { selectRoomList } from "../home/homeSlice";
import ParentRoomMain from "./components/ParentRoomMain/ParentRoomMain";
import {
  fetchInvitedListForRoom, selectInvitedListForRoom
} from "./invitedListForRoomSlice";
import "./styles.scss";
import {
  fetchTeachingForRoom, selectTeachingForRoom
} from "./teachingForRoomSlice";
import {
  fetchTryTeachingForRoom, selectTryTeachingForRoom
} from "./tryTeachingForRoomSlice";
import { fetchWaitingListForRoom, selectWaitingListForRoom } from "./waitingListForRoomSlice";


ParentRoom.propTypes = {
  
};

function ParentRoom(props) {
  const dispatch = useDispatch();
  const {
    params: {roomId}
  } = useRouteMatch();
  const token = useSelector(selectToken);

  const type_tutor = useSelector(selectType_tutor); 
  const roomList = useSelector(selectRoomList);
  const userId = Number(useSelector(selectId_of_user));
  const [roomDetail, setRoomDetail] = useState({});
  
  useEffect(() => {
    const args = {
      roomId: roomId,
      token: token
    }
    
    dispatch(fetchWaitingListForRoom(args));
    dispatch(fetchInvitedListForRoom(args));
    dispatch(fetchTryTeachingForRoom(args));
    dispatch(fetchTeachingForRoom(args));
  }, [])

  useEffect(()=> {
    const getRoomDetail = async () => {
      const roomList = await fetchRoomList();
      const newRoomDetail = await roomList.find((room) => room.id === Number(roomId) );
      setRoomDetail(newRoomDetail);
    }
    getRoomDetail();
  }, []);
  
  
  return (
    <div className="parentroom">
      <ParentRoomMain roomDetail={roomDetail}/>
    </div>
  );
}

export default ParentRoom;