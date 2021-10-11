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
  }, [token, userId]);

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
      <div className={classes.apply}>
        <h5 className={classes.applyLabel}>Phòng đã ứng tuyển</h5>
        {applyList?.length ? <Grid container>
        {applyList?.map((room)=> (
             <Room key={room.id} room={{...room.parent_room, id: room.id, roomId: room.parent_room.id}} onDelete={handleDeleteFromApplyList} type="userroom"/>
        ))}
        </Grid> : <h5 className={classes.none}>(Không có phòng nào)</h5>}
      </div>
      <div className={classes.teaching}>
        <h5 className={classes.teachingLabel}>Danh sách dạy học</h5>
        {teachingList?.length !== 0 ? <Grid container>
        {teachingList?.map((room)=> (
             <Room key={room.id} room={{...room.parent_room, id: room.id, roomId: room.parent_room.id}} onDelete={handleDeleteFromTeachingList} type="userroom"/>
        ))}
        </Grid> : <h5 className={classes.none}>(Không có phòng nào)</h5> }
      </div>
        
    </div>
  );
}

const useStyles = makeStyles( theme => ({
  root: {
    marginTop: "40px",
    [theme.breakpoints.down('xs')]: {
      padding: "52px 24px",
    },
    [theme.breakpoints.up('sm')]: {
      padding: "52px",
    },
    "&>h4": {
      margin: 0,
      marginTop: '32px',
      marginLeft: '24px',
    },
  },
  label: {
    
  },
  apply: {
    "background-image": "linear-gradient( 135deg, #3C8CE7 10%, #00EAFF 100%)",
    borderRadius: 8,
    marginBottom: 32,
  },
  applyLabel: {
    textAlign: "center",
    fontSize: 16,
    margin: 0,
    color: 'white',
    padding: 8,
    marginBottom: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  teaching: {
    "background-image": "linear-gradient( 135deg, #70F570 10%, #49C628 100%)",
    borderRadius: 8,
    marginBottom: 32,
  },
  teachingLabel: {
    textAlign: "center",
    fontSize: 16,
    margin: 0,
    color: 'white',
    padding: 8,
    marginBottom: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  none: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 300,
    margin: 0,
    fontStyle: 'italic',
  }
}))

export default TutorInfor;
