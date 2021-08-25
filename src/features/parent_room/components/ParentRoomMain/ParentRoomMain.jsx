import { Grid, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { selectId_of_user, selectToken, selectType_parent, selectType_tutor } from '../../../auth/authSlice';
import { selectInvitedListForRoom } from '../../invitedListForRoomSlice';
import { selectTeachingForRoom } from '../../teachingForRoomSlice';
import { selectTryTeachingForRoom } from '../../tryTeachingForRoomSlice';
import { selectWaitingListForRoom } from '../../waitingListForRoomSlice';
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
    backgroundColor: "white", 
  },
  block: {
    overflow: "auto",
    "&>div": {
      overflow: "auto",
      "text-align": "center",
      backgroundColor: "white", 
      height: "100%",
      "border-radius": "4px",
    }
  },
  relative: {
    position: 'relative',
  },
  title: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0, 
    fontWeight: 300,
    backgroundColor: "#9EA7E6",
    padding: "4px 0px",
    "z-index": 1,
  }
})

function ParentRoomMain( {roomDetail = {}} ) {
    const token = useSelector(selectToken);
    const userId = useSelector(selectId_of_user);
    const typeParent = useSelector(selectType_parent);
    const typeTutor = useSelector(selectType_tutor);
    const {
      params: {roomId}
    } = useRouteMatch();
    const classes = useStyles();
    const waitingList = useSelector(selectWaitingListForRoom);
    const invitedList = useSelector(selectInvitedListForRoom);
    const tryTeachingList = useSelector(selectTryTeachingForRoom);
    const teachingList = useSelector(selectTeachingForRoom);

    return (
        <Grid container spacing={3}>
        <Grid item xs={3} container direction="column" spacing={2}>
            <Grid item style={{flex: 1}} className={classes.block}>
              <div className={classes.relative}>
                <span className={classes.title}>Danh sách chờ</span>
                <WaitingList 
                  waitingList = {waitingList} 
                  parentId = {roomDetail.parent}
                  roomId = {roomId}
                  typeParent={typeParent}
                  userId = {userId}
                  token = {token}
                />
              </div>
            </Grid >
            <Grid item style={{flex: 1}} className={classes.block}>
              <div className={classes.relative}>
                <span className={classes.title}>Danh sách mời</span>
                <InvitedList 
                  invitedList = {invitedList} 
                  typeTutor={typeTutor}
                  userId = {userId}
                  token = {token}
                />
              </div>
            </Grid>
        </Grid>
        <Grid item xs={6}>
          <div className={classes['center-block']}>
              <RoomInfo roomDetail={roomDetail}/>
          </div>
        </Grid>
        <Grid item xs={3} container direction="column" spacing={2}>
            <Grid item style={{flex: 1}} className={classes.block}>
              <div className={classes.relative}>
                <span className={classes.title}>Danh sách dạy thử</span>
                <TryTeachingList
                  tryTeachingList = {tryTeachingList}
                  token = {token}
                  userId = {userId}
                  typeTutor={typeTutor}
                  typeParent={typeParent}
                />
              </div>
            </Grid >
            <Grid item style={{flex: 1}} className={classes.block}>
              <div className={classes.relative}>
                  <span className={classes.title}>Danh sách dạy chính thức</span>
                  <TeachingList 
                    teachingList={teachingList}
                  />
              </div>
            </Grid>
        </Grid>
      </Grid>
    );
}

export default ParentRoomMain;