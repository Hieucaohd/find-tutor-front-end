import { makeStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';
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
    backgroundColor: "#9EA7E6", 
  },
  block: {
    overflow: "auto",
    "&>div": {
      overflow: "auto",
      "text-align": "center",
      backgroundColor: "#9EA7E6", 
      height: "100%",
      "border-radius": "4px",
    }
  },
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
              <div>
                Danh sách chờ
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
              <div>
                Danh sách mời
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
                Room Id: {roomDetail.id}
                  <br/>
                  Môn học: {roomDetail.subject}
                  <br/> 
                  Lớp: {roomDetail.lop}
                  <br/>
                  Vị trí: {roomDetail.province_code} , {roomDetail.district_code} , {roomDetail.ward_code}
                  <br/>
                  Ngày dạy: {roomDetail.day_can_teach}
                  <br/>
                  Parent Id: {roomDetail.parent}
                  <br/>
                  Yêu cầu khác: {roomDetail.other_require}
          </div>
        </Grid>
        <Grid item xs={3} container direction="column" spacing={2}>
            <Grid item style={{flex: 1}} className={classes.block}>
              <div>
                Danh sách dạy thử
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
              <div>
                Danh sách dạy chính thức
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