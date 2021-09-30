import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { selectId_of_user } from '../../../auth/authSlice';
import RoomInfo from './components/RoomInfo';
import TutorItem from './components/TutorItem';
import "./styles.scss";


function ParentRoomMain( {roomDetail = {}, typeParent, applyList, teaching, addToTeaching, deleteFromApplyList, deleteFromTeachingList, addToApplyList} ) {
    const userId = useSelector(selectId_of_user);
    const {
      params: {roomId}
    } = useRouteMatch();
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
        <RoomInfo room={roomDetail} applyList={applyList} userId = {userId} addToApplyList={handleAddToApplyList} typeParent={typeParent}/>
        {applyList.length !== 0 && <h5 className={classes.title}>Danh sách ứng tuyển</h5> }
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
    );
}

const useStyles = makeStyles(theme => ({
  root: {
    
    [theme.breakpoints.up('md')]: {
      padding: "12px 48px", 
    },
  },
  title: {
    textAlign: "center",
  }
}))

export default ParentRoomMain;