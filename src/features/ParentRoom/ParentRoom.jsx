import { makeStyles } from "@material-ui/core";
import { catchDistrictName, catchProvinceName, getDistrictName, getProvinceName, getWardName } from "components/location/getLocation";
import { GetParentRoomDetail } from "graphql/RoomQueries";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { selectToken } from "../auth/authSlice";
import ParentRoomMain from "./components/ParentRoomMain/ParentRoomMain";
import { getInvitedListForRoom } from "./invitedListForRoomSlice";
import { getTeachingListForRoom } from "./teachingForRoomSlice";
import { getTryTeachingListForRoom } from "./tryTeachingForRoomSlice";
import { getWaitingListForRoom } from "./waitingListForRoomSlice";


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
  const [loading, setLoading] = useState(true);
  useEffect(()=> {
    const getRoomDetail = async () => {
      const newRoomDetail = await GetParentRoomDetail(roomId);
      const provinceName = await getProvinceName(newRoomDetail.province_code || 0);
      const districtName = await getDistrictName({
        provinceCode: newRoomDetail.province_code || 0,
        districtCode: newRoomDetail.district_code || 0,
      });
      const wardName = await getWardName({
        districtCode: newRoomDetail.district_code || 0,
        wardCode: newRoomDetail.ward_code || 0,
      });
      dispatch(getWaitingListForRoom(newRoomDetail.waitingtutormodel_set || []));
      dispatch(getInvitedListForRoom(newRoomDetail.listinvitedmodel_set) || []);
      if(newRoomDetail.tryteachingmodel){
        dispatch(getTryTeachingListForRoom([newRoomDetail.tryteachingmodel]));
      }
      if(newRoomDetail.tutorteachingmodel) {
        dispatch(getTeachingListForRoom(newRoomDetail.tutorteachingmodel));
      }
      setRoomDetail({
        ...newRoomDetail,
        parent: {
          id: newRoomDetail.parent.user.id,
          first_name: newRoomDetail.parent.first_name,
          last_name: newRoomDetail.parent.last_name,
          avatar: newRoomDetail?.parent.user.imageprivateusermodel?.avatar,
        },
        pricemodel_set: newRoomDetail.pricemodel_set[0].money_per_day || 0,
        timeoneday: newRoomDetail.pricemodel_set[0].time_in_one_day || 0,
        typeteacher: newRoomDetail.pricemodel_set[0].type_teacher || 0,
        address: `${wardName}, ${catchDistrictName(districtName)}, ${catchProvinceName(provinceName)}`
      });
      setLoading(false);
    }
    getRoomDetail();
  }, []);
  
  return (
    <div className={classes.root}>
      <ParentRoomMain roomDetail={roomDetail} className={classes.main} isLoading={loading}/>
    </div>
  );
}

export default ParentRoom;