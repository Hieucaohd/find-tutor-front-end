import { Grid, makeStyles } from "@material-ui/core";
import Room from "components/Room/Room";
import { deleteFromWaitingList, deleteTutorFromTeachingList } from "features/ParentRoom/parentroom";
import { getTutorRoomList } from "graphql/TutorRoomQueries";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectId_of_user, selectToken } from "../auth/authSlice";

function TutorInfor() {
  const token = useSelector(selectToken);
  const classes = useStyles();
  const userId = useSelector(selectId_of_user);
  const [applyList, setApplyList] = useState([]);
  const [teachingList, setTeachingList] = useState([]);
  
  useEffect(() => {
    const fetchRoomList = async () => {
      const listRoom = await getTutorRoomList(userId);
      await setApplyList(listRoom.waitingtutormodel_set);
      await setTeachingList(listRoom.tutorteachingmodel_set);
  }
  
    if (token) {
      // dispatch something here.
      fetchRoomList();
    }
  }, []);

  const handleDeleteFromApplyList = async (waitingId) => {
    try {
      await deleteFromWaitingList({token: token, waitingId: waitingId});
      const newList = [];
      await applyList.forEach((item) => {
        if(Number(item.id) !== Number(waitingId)) {
          newList.push(item);
        }
      });
      setApplyList(newList);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteFromTeachingList = async (teachingId) => {
    try {
      await deleteTutorFromTeachingList({token: token, teachingId: teachingId});
      const newList = [];
      await teachingList.forEach((item) => {
        if(Number(item.id) !== Number(teachingId)) {
          newList.push(item);
        }
      });
      setTeachingList(newList);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={classes.root}>
        <h5>Danh sách ứng tuyển</h5>
        <Grid container>
        {applyList?.map((room)=> (
             <Room key={room.id} room={{...room.parent_room, id: room.id, roomId: room.parent_room.id}} onDelete={handleDeleteFromApplyList} type="userroom"/>
        ))}
        </Grid> 
        <h5>Danh sách dạy học</h5>
        <Grid container>
        {teachingList?.map((room)=> (
             <Room key={room.id} room={{...room.parent_room, id: room.id, roomId: room.parent_room.id}} onDelete={handleDeleteFromTeachingList} type="userroom"/>
        ))}
        </Grid>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    marginTop: "40px",
    padding: "52px",
    "&>h4": {
      margin: 0,
      marginTop: '32px',
      marginLeft: '24px',
    }
  }
})

export default TutorInfor;
