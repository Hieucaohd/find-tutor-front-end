import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectId_of_user } from '../../../auth/authSlice';
import RoomInfo from './components/RoomInfo';
import RoomMap from './components/RoomMap';
import TutorItem from './components/TutorItem';
import "./styles.scss";


function ParentRoomMain( {roomDetail = {}, typeParent, applyList, teaching, addToTeaching, deleteFromApplyList, deleteFromTeachingList, addToApplyList} ) {
    const userId = useSelector(selectId_of_user);
    // const {
    //   params: {roomId}
    // } = useRouteMatch();
    const classes = useStyles();
    const isOwner = Number(userId) === Number(roomDetail?.parent?.id);

    const handleAddToApplyList = () => {
      if(!addToApplyList) return;
      addToApplyList();
    }

    const handleAddToTeaching = (id) => {
      addToTeaching(id);
    }

    const handleDeleteFromApplyList = (id) => {
      if(!deleteFromApplyList) return;
      deleteFromApplyList(id)
    }

    const handleDeleteFromTeachingList = (id) => {
      if(!deleteFromTeachingList) return;
      deleteFromTeachingList(id);
    }

    return (
      <div className={classes.root}>
        <RoomInfo room={roomDetail} applyList={applyList} userId = {userId} addToApplyList={handleAddToApplyList} typeParent={typeParent} teaching={teaching}/>
        
        <div className={classes.bottom}>
          <div className={classes.tutor}>
           <h5 className={`${classes.title} font-semibold mb-4`}>Danh sách ứng tuyển</h5> 
           {applyList.length === 0 && <p style={{fontStyle: 'italic', fontSize: 14, textAlign: 'center'}}>(Chưa có gia sư nào ứng tuyển)</p>} 
        {applyList?.map((item) => (
          <TutorItem key={item?.id} tutorInfo={item} isOwner={isOwner} onAdd={handleAddToTeaching} isTeaching={false} onDelete={handleDeleteFromApplyList} userId={userId}/>
        ))}
        {/* {parentInvitedList.length !== 0 && <h5 className={classes.title}>Danh sách được chọn</h5>}
        {parentInvitedList?.map((item) => (
          <TutorItem key={item.id} tutorInfo={item} isOwner={isOwner}/>
        ))} */}
        {teaching && <h5 className={classes.title}>Gia sư đang dạy</h5>}
        {teaching && <TutorItem key={teaching.id} tutorInfo={teaching} isOwner={isOwner} userId={userId} isTeaching={true} onDelete={handleDeleteFromTeachingList}/>}
          </div>
          <div className={classes.map}>
            <RoomMap address={roomDetail?.address}/> 
          </div>
        </div>
      </div>
    );
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'white',
    boxShadow: '0 2px 4px 0 #ccc',
    borderRadius: 8,
    [theme.breakpoints.down('sm')]: {
      padding: '0 12px', 
    },
    [theme.breakpoints.up('md')]: {
      padding: "12px 48px", 
    },
  },
  title: {
    textAlign: "center",
  },
  bottom: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column', 
    },
    
  },
  tutor: {
    marginTop: 20,
    flex: 7,
    [theme.breakpoints.up('md')]: {
      marginRight: 24,
    },
  },
  map: {
    flex: 3,
    marginTop: 24,
    [theme.breakpoints.down('sm')]: {
      margin: '0 16x',
      marginTop: 36,
    },
  }
}))

export default ParentRoomMain;