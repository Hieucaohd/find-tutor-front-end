import { makeStyles } from "@material-ui/core";
import { catchDistrictName, catchProvinceName, getDistrictName, getProvinceName, getWardName } from "components/location/getLocation";
import { selectToken, selectType_parent } from "features/auth/authSlice";
import { addToApplyList, addToTeachingList } from "graphql/mutationGraphQl";
import { GetParentRoomDetail } from "graphql/RoomQueries";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import ParentRoomMain from "./components/ParentRoomMain/ParentRoomMain";
import { deleteFromWaitingList, deleteTutorFromTeachingList } from "./parentroom";


const useStyles = makeStyles(theme=>({
    root: {
      [theme.breakpoints.down('sm')]: {
        padding: "80px 12px",
      },
      [theme.breakpoints.up('md')]: {
        padding: "52px 48px",
      },
    }
}));

function ParentRoom(props) {
  const classes = useStyles();
  const token = useSelector(selectToken);
  const {
    params: {roomId}
  } = useRouteMatch();
  const [applyList, setApplyList] = useState([]);
  // const [parentInvitedList, setParentInvitedList] = useState([]);
  const [teaching, setTeaching] = useState(null);
  const [roomDetail, setRoomDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const typeParent = useSelector(selectType_parent);
  useEffect(()=> {
    const getRoomDetail = async () => {
      const newRoomDetail = await GetParentRoomDetail(roomId);
      const provinceName = await getProvinceName(newRoomDetail?.province_code || 0);
      const districtName = await getDistrictName({
        provinceCode: newRoomDetail?.province_code || 0,
        districtCode: newRoomDetail?.district_code || 0,
      });
      const wardName = await getWardName({
        districtCode: newRoomDetail?.district_code || 0,
        wardCode: newRoomDetail?.ward_code || 0,
      });
      const parentProvinceName = await getProvinceName(newRoomDetail?.parent?.province_code || 0);
      const parentDistrictName = await getDistrictName({
        provinceCode: newRoomDetail?.parent?.province_code || 0,
        districtCode: newRoomDetail?.parent?.district_code || 0,
      })

      setApplyList(newRoomDetail?.waitingtutormodel_set || []);
      // setParentInvitedList(newRoomDetail?.tryteachingmodel_set || []);
      setTeaching(newRoomDetail?.tutorteachingmodel);

      setRoomDetail({
        ...newRoomDetail,
        parent: {
          id: newRoomDetail.parent.user.id,
          username: newRoomDetail.parent.user.username,
          first_name: newRoomDetail.parent.first_name,
          last_name: newRoomDetail.parent.last_name,
          avatar: newRoomDetail?.parent.user.imageprivateusermodel?.avatar,
          birthday: newRoomDetail?.parent.birthday,
          address: `${catchDistrictName(parentDistrictName)}, ${catchProvinceName(parentProvinceName)}`,
        },
        pricemodel_set: newRoomDetail.pricemodel_set[0].money_per_day,
        timeoneday: newRoomDetail.pricemodel_set[0].time_in_one_day,
        sexteacher: newRoomDetail.pricemodel_set[0].sex_of_teacher,
        typeteacher: newRoomDetail.pricemodel_set[0].type_teacher,
        address: `${wardName}, ${catchDistrictName(districtName)}, ${catchProvinceName(provinceName)}`
      });

      setLoading(false);
    }
    getRoomDetail();
  }, []);
  
  const handleDelFromApplyList = async (waitingId) => {
    try {
      const response = await deleteFromWaitingList({waitingId: waitingId, token: token});
      if(response) {
        const newList = [];
        await applyList.forEach((item) => {
          if(Number(item.id) !== Number(waitingId)){
            newList.push(item);
          }
        })
        await setApplyList(newList);
      }
    } catch (error) {

    }
  }

  const handleDelFromTeachingList = async (teachingId) => {
    try {
      const response = await deleteTutorFromTeachingList({teachingId: teachingId, token: token});
      if(response) {
        await setTeaching(null);
      }
    } catch (error) {

    }
  }

  const handleAddToApplyList = async () => {
    try {
      const response = await addToApplyList({token: token, parentRoomId: roomId});
      console.log('response', response)
      setApplyList([
        ...applyList,
        response,
      ])
    }
    catch (error) {

    }
  }

  const handleAddToTeachingList = async (waitingId) => {
    const response = await addToTeachingList({id: waitingId, token:token});
    const newList = [];
    await applyList.forEach((item) => {
      if(Number(item.id) !== Number(waitingId)){
        newList.push(item);
      }
    })
    await setApplyList(newList);
    await setTeaching(response);
  }

  return (
    <div className={classes.root}>
      <ParentRoomMain 
        roomDetail={roomDetail} 
        className={classes.main} 
        isLoading={loading}
        applyList={applyList} 
        // parentInvitedList={parentInvitedList}
        teaching={teaching}
        addToTeaching = {handleAddToTeachingList}
        deleteFromApplyList = {handleDelFromApplyList}
        deleteFromTeachingList = {handleDelFromTeachingList}
        addToApplyList = {handleAddToApplyList}
        typeParent={typeParent}
      />
    </div>
  );
}

export default ParentRoom;