import { makeStyles } from "@material-ui/core";
import { catchDistrictName, catchProvinceName, getDistrictName, getProvinceName, getWardName } from "components/location/getLocation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { selectToken } from "../auth/authSlice";
import { fetchRoomList } from "../Home/getRoom";
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


const useStyles = makeStyles(theme=>({
    root: {
      height: "100vh",
      padding: "0px 48px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }
}));

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
      const provinceName = await getProvinceName(newRoomDetail.province_code);
      const districtName = await getDistrictName({
        provinceCode: newRoomDetail.province_code,
        districtCode: newRoomDetail.district_code,
      });
      const wardName = await getWardName({
        districtCode: newRoomDetail.district_code,
        wardCode: newRoomDetail.ward_code,
      })
      setRoomDetail({
        ...newRoomDetail,
        address: `${wardName}, ${catchDistrictName(districtName)}, ${catchProvinceName(provinceName)}`
      });
    }
    getRoomDetail();
  }, []);
  
  
  return (
    <div className={classes.root}>
      <ParentRoomMain roomDetail={roomDetail} className={classes.main}/>
      {/* <ParentRoomMobile roomDetail={roomDetail} className={classes.mobile}/> */}
    </div>
  );
}

export default ParentRoom;