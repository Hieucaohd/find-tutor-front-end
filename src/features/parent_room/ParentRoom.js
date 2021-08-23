import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { selectId_of_user, selectToken, selectType_tutor } from "../auth/authSlice";
import { fetchRoomList } from "../home/getRoom";
import { selectRoomList } from "../home/homeSlice";
import ParentRoomMain from "./components/ParentRoomMain/ParentRoomMain";
import {
  fetchInvitedListForRoom
} from "./invitedListForRoomSlice";
import {
  fetchTeachingForRoom
} from "./teachingForRoomSlice";
import {
  fetchTryTeachingForRoom
} from "./tryTeachingForRoomSlice";
import { fetchWaitingListForRoom } from "./waitingListForRoomSlice";


const useStyles = makeStyles({
    root: {
      height: "100vh",
      padding: "0px 48px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }

})

function ParentRoom(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    params: {roomId}
  } = useRouteMatch();

  const token = useSelector(selectToken);
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
    <div className={classes.root}>
      <ParentRoomMain roomDetail={roomDetail}/>
    </div>
  );
}

export default ParentRoom;