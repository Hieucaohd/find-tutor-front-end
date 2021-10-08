import { makeStyles } from "@material-ui/core/styles";
import Loading from "components/Loading/Loading";
import { catchDistrictName, catchProvinceName, getDistrictName, getProvinceName, getWardName } from "components/location/getLocation";
import { selectToken, selectType_parent } from "features/auth/authSlice";
import { isSignedIn } from "features/auth/cookies";
import { addToApplyList, addToTeachingList } from "graphql/mutationGraphQl";
import { GetParentRoomDetail } from "graphql/RoomQueries";
import { room_socket } from "namespace";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
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
  const history = useHistory();
  const {
    params: {roomId}
  } = useRouteMatch();
  const [applyList, setApplyList] = useState([]);
  // const [parentInvitedList, setParentInvitedList] = useState([]);
  const [teaching, setTeaching] = useState(null);
  const [roomDetail, setRoomDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const typeParent = useSelector(selectType_parent);
  const [isLoading, setIsLoading] = useState(false);

  const handleMessage = ({result, type_action, type_of_list}) => {
    if(type_action === "DELETE") {
      if(type_of_list === "waiting_list") {
        const newList = applyList.filter((item) => Number(item.id) !== Number(result.id) );
        setApplyList(newList);
      } else if(type_of_list === "tutor_teaching") {
        setTeaching(null);
      }
    } else if (type_action === "CREATE") {
      if(type_of_list === "waiting_list") {
        setApplyList([
          ...applyList,
          result,
        ])
      }
      if(type_of_list === "tutor_teaching") {
        const newList = applyList.filter((item) => Number(item.tutor.id) !== Number(result.tutor.id) );
        setApplyList(newList);
        setTeaching(result);
      }
    }
  }


  useEffect(() => {
    if(token.length !== 0) {
        let ws = new WebSocket(`${room_socket}${roomId}/`)

        ws.onopen = () => console.log('Websocket opened');
        ws.onclose = () => console.log('Websocket closed');

        ws.onmessage = e => {
          setIsLoading(false);
          const message = JSON.parse(e.data);
          console.log('e', message);
          handleMessage(message);
        };

        return () => {
          ws.close();
        }
    }
  }, [token, roomId]);

  useEffect(()=> {
    const getRoomDetail = async () => {
      const newRoomDetail = await GetParentRoomDetail(roomId, token);
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
  }, [roomId]);

  const handleAddToTeachingList = async (waitingId) => {
    setIsLoading(true);
    await addToTeachingList({id: waitingId, token:token});
    // const newList = [];
    // await applyList.forEach((item) => {
    //   if(Number(item.id) !== Number(waitingId)){
    //     newList.push(item);
    //   }
    // })
    // await setApplyList(newList);
    // await setTeaching(response);
  }

  const handleDelFromApplyList = async (waitingId) => {
    setIsLoading(true);
    try {
      await deleteFromWaitingList({waitingId: waitingId, token: token});
      // if(response) {
      //   const newList = [];
      //   await applyList.forEach((item) => {
      //     if(Number(item.id) !== Number(waitingId)){
      //       newList.push(item);
      //     }
      //   })
      //   await setApplyList(newList);
      // }
    } catch (error) {

    }
  }

  const handleDelFromTeachingList = async (teachingId) => {
    setIsLoading(true);
    try {
      await deleteTutorFromTeachingList({teachingId: teachingId, token: token});
      // if(response) {
      //   await setTeaching(null);
      // }
    } catch (error) {

    }
  }

  const handleAddToApplyList = async () => {
    if(!isSignedIn()) history.push("/signin");
    try {
      setIsLoading(true);
      await addToApplyList({token: token, parentRoomId: roomId});
      // setApplyList([
      //   ...applyList,
      //   response,
      // ])
    }
    catch (error) {

    }
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
      {isLoading && <Loading />}
    </div>
  );
}

export default ParentRoom;