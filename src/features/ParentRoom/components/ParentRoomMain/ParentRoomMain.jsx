import { Grid, makeStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { selectId_of_user, selectToken, selectType_parent, selectType_tutor } from '../../../auth/authSlice';
import { selectInvitedListForRoom } from '../../invitedListForRoomSlice';
import { selectTeachingForRoom } from '../../teachingForRoomSlice';
import { selectTryTeachingForRoom } from '../../tryTeachingForRoomSlice';
import { selectWaitingListForRoom } from '../../waitingListForRoomSlice';
import Comment from './components/Comment';
import InvitedList from './components/InvitedList';
import RoomInfo from './components/RoomInfo';
import TeachingList from './components/TeachingList';
import TryTeachingList from './components/TryTeachingList';
import WaitingList from "./components/WaitingList";
import "./styles.scss";

ParentRoomMain.propTypes = {
    roomDetail: PropTypes.object,
};

const useStyles = makeStyles({
  root: {},
  "center-block" : {
    "border-radius": "4px",
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "height": "60vh",
    backgroundColor: '#E9E8EB',
    border: '0.5px solid rgba(0, 0, 0, 0.1)', 
  },
  block: {
    position: 'relative',
    height: '50%',
    "&>div": {
      overflow: "auto",
      "text-align": "center",
      backgroundColor: '#E9E8EB',
      border: '0.5px solid rgba(0, 0, 0, 0.1)',
      height: "100%",
      "border-radius": "4px",
    }
  },
  title: {
    position: "absolute",
    bottom: 7,
    left: 8,
    right: 8, 
    fontWeight: 500,
    backgroundColor: '#725eef',
    color: 'white',
    padding: "4px 0px",
    "z-index": 1,
    borderRadius: '0 0 4px 4px',
    textAlign: 'center',
  }
})

function ParentRoomMain( {roomDetail = {}, isLoading} ) {
    const token = useSelector(selectToken);
    const userId = useSelector(selectId_of_user);
    const typeParent = useSelector(selectType_parent);
    const typeTutor = useSelector(selectType_tutor);
    const [showComment, setShowComment] = useState(false);
    const {
      params: {roomId}
    } = useRouteMatch();
    const classes = useStyles();
    const waitingList = useSelector(selectWaitingListForRoom);
    const invitedList = useSelector(selectInvitedListForRoom);
    const tryTeachingList = useSelector(selectTryTeachingForRoom);
    const teachingList = useSelector(selectTeachingForRoom);
    const handleShowComment = () => {
      setShowComment(true);
    }
    const handleCloseComment = () => {
      setShowComment(false);
    }
    return (
        <Grid container spacing={3}>
        <Grid item xs={3} container direction="column" spacing={2}>
            <Grid item style={{flex: 1}} className={classes.block}>
              <div className={classes.relative}>
                {isLoading ? <Skeleton variant="rect" style={{width: "100%", height: "100%"}} />
                : <WaitingList 
                waitingList = {waitingList} 
                parent = {roomDetail.parent}
                roomId = {roomId}
                typeParent={typeParent}
                userId = {userId}
                token = {token}
                />}
              </div>
              <span className={classes.title}>Danh sách chờ</span>

            </Grid >
            <Grid item style={{flex: 1}} className={classes.block}>
              <div>
                {isLoading ? <Skeleton variant="rect" style={{width: "100%", height: "100%"}} />
                 :<InvitedList 
                    invitedList = {invitedList} 
                    parent = {roomDetail.parent}
                    roomId = {roomId}
                    typeTutor={typeTutor}
                    typeParent={typeParent}
                    userId = {userId}
                    token = {token}
                  />}
              </div>
              <span className={classes.title}>Danh sách mời</span>

            </Grid>
        </Grid>
        <Grid item xs={6}>
          <div className={classes['center-block']}>
              {isLoading && <Skeleton variant="rect" style={{width: "100%", height: "100%"}} />}
              {!showComment && !isLoading &&  <RoomInfo roomDetail={roomDetail} onClose={handleShowComment}/>}
              {showComment && !isLoading && <Comment onClose={handleCloseComment} />}
          </div>
        </Grid>
        <Grid item xs={3} container direction="column" spacing={2}>
            <Grid item style={{flex: 1}} className={classes.block}>
              <div>
                {isLoading ? <Skeleton variant="rect" style={{width: "100%", height: "100%"}} />
                : <TryTeachingList
                tryTeachingList = {tryTeachingList} 
                parent = {roomDetail.parent}
                roomId = {roomId}
                typeTutor={typeTutor}
                typeParent={typeParent}
                userId = {userId}
                token = {token}
                /> }
              </div>
              <span className={classes.title}>Danh sách dạy thử</span>
            </Grid >
            <Grid item style={{flex: 1}} className={classes.block}>
              <div>
                  {isLoading ? <Skeleton variant="rect" style={{width: "100%", height: "100%"}} />
                  :  <TeachingList 
                    teachingList={teachingList}
                  /> }
              </div>
              <span className={classes.title}>Danh sách dạy chính thức</span>
            </Grid>
        </Grid>
      </Grid>
    );
}

export default ParentRoomMain;