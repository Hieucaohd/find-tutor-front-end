import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { selectRoomList } from "../home/homeSlice";

import { renderThem } from "../home/conditionFunctionToRender";

import {
  selectWaitingListForRoom,
  fetchWaitingListForRoom,
  addWaitingListForRoom,
  deleteWaitingListForRoom,
} from "./waitingListForRoomSlice";
import {
  selectInvitedListForRoom,
  fetchInvitedListForRoom,
  addInvitedListForRoom,
  deleteInvitedListForRoom,
  deleteForTryTeaching,
} from "./invitedListForRoomSlice";
import {
  selectTryTeachingForRoom,
  fetchTryTeachingForRoom,
  addTryTeachingForRoom,
  // addToTryTeachingForRoom,
  deleteForTeaching,
  deleteTryTeachingForRoom,
} from "./tryTeachingForRoomSlice";
import {
  selectTeachingForRoom,
  fetchTeachingForRoom,
  addTeachingForRoom,
  addToTeachingForRoom,
} from "./teachingForRoomSlice";

import {
  fetchRoomRelateTutor,
  selectWaitingListForTutor,
  selectInvitedListForTutor,
  selectTryTeachingForTutor,
  selectTeachingForTutor,
} from "../auth/roomRelateTutorSlice";

import WaitingList from "./component/WaitingList";
import InvitedList from "./component/InvitedList";

function ParentRoom(props) {
  const dispatch = useDispatch();

  const [roomId, setRoomId] = useState();
  const [userId, setUserId] = useState();
  // console.log(userId);

  const [type_tutor, setType_tutor] = useState("");
  const [token, setToken] = useState("");
  // const [list_room_waiting, setList_room_waiting] = useState([]);
  const list_room_waiting = useSelector(selectWaitingListForTutor);
  const list_room_invited = useSelector(selectInvitedListForTutor);
  const list_room_try_teaching = useSelector(selectTryTeachingForTutor);
  const list_room_teaching = useSelector(selectTeachingForTutor);

  const roomList = useSelector(selectRoomList);
  const [roomDetail, setRoomDetail] = useState(<div></div>);

  useEffect(() => {
    const args = {
      roomId: props.roomId,
      token: props.token,
    };

    dispatch(fetchWaitingListForRoom(args));
    dispatch(fetchInvitedListForRoom(args));
    dispatch(fetchTryTeachingForRoom(args));
    dispatch(fetchTeachingForRoom(args));

    setRoomId(props.roomId);
    setRoomDetail(roomList.find((room) => room.id === props.roomId));
    setUserId(props.userId);
    setType_tutor(props.type_tutor);
    setToken(props.token);
    // setList_room_waiting(props.list_room_waiting);
  }, [props.roomId]);

  const deleteFromWaitingList = (waitingId) => {
    dispatch(
      deleteWaitingListForRoom({
        waitingId: waitingId,
        roomId: roomId,
        token: token,
      })
    );
  };

  const addToInvitedList = (waitingId) => {
    dispatch(addInvitedListForRoom({ waitingId: waitingId, token: token }));
  };

  const waitingList = useSelector(selectWaitingListForRoom);
  const renderWaitingList = waitingList.map((waiting) => {
    // return (
    //   <li key={waiting.id}>
    //     id: {waiting.id}, tutor: {waiting.tutor}, parent_room_id:{" "}
    //     {waiting.parent_room}
    //     {waiting.parent_room === userId ? (
    //       <button onClick={() => addToInvitedList(waiting.id)}>invite</button>
    //     ) : null}
    //     {waiting.tutor === userId || waiting.parent_room === userId ? (
    //       <button onClick={() => deleteFromWaitingList(waiting.id)}>
    //         delete
    //       </button>
    //     ) : null}
    //   </li>
    // );
    return (
      <div>
        <WaitingList
          waiting={waiting}
          deleteFromWaitingList={deleteFromWaitingList}
          addToInvitedList={addToInvitedList}
          userId={userId}
        />
      </div>
    );
  });

  const deleteFromInvitedList = (invitedId) => {
    dispatch(deleteInvitedListForRoom({ invitedId: invitedId, token: token }));
  };

  const addToTryTeaching = (invitedId) => {
    dispatch(
      addTryTeachingForRoom({
        invitedId: invitedId,
        token: token,
      })
    );
  };

  const invitedList = useSelector(selectInvitedListForRoom);
  const renderInvitedList = invitedList.map((invited) => {
    // return (
    //   <li key={invited.id}>
    //     id: {invited.id}, tutor: {invited.tutor}, parent_invited:{" "}
    //     {invited.parent_room}
    //     {invited.tutor === userId ? (
    //       <button onClick={() => addToTryTeaching(invited.id)}>accept</button>
    //     ) : null}
    //     {invited.tutor === userId || invited.parent_room === userId ? (
    //       <button onClick={() => deleteFromInvitedList(invited.id)}>
    //         delete
    //       </button>
    //     ) : null}
    //   </li>
    // );
    return (
      <div>
        <InvitedList
          invited={invited}
          addToTryTeaching={addToTryTeaching}
          deleteFromInvitedList={deleteFromInvitedList}
          userId={userId}
        />
      </div>
    );
  });

  // const [showForParent, setShowForParent] = useState(false);
  // const [showForTutor, setShowForTutor] = useState(false);

  const addToTeaching = (try_teachingId) => {
    // dispatch(
    //   addTeachingForRoom({ try_teachingId: try_teachingId, token: token })
    // );
    // .then((response) => {
    //   // console.log(response);

    //   if (response.payload) {
    //     const tutor_agree = response.payload.tutor_agree;
    //     const parent_agree = response.payload.parent_agree;
    //     if (tutor_agree && parent_agree) {
    //       // setShowForParent(true);
    //       // setShowForTutor(true);
    //       dispatch(deleteForTeaching(try_teachingId));
    //     }
    //   }

    //   // else if (tutor_agree) {
    //   //   setShowForTutor(true);
    //   // } else {
    //   //   setShowForParent(true);
    //   // }
    // });
    addToTeachingForRoom({
      try_teachingId: try_teachingId,
      token: token,
      dispatch: dispatch,
    });
  };

  const deleteFromTryTeaching = (try_teachingId) => {
    dispatch(
      deleteTryTeachingForRoom({ try_teachingId: try_teachingId, token: token })
    );
  };

  const tryTeaching = useSelector(selectTryTeachingForRoom);
  const renderTryTeaching = tryTeaching.map((tryTeach) => {
    // console.log(tryTeach.parent_agree);
    // console.log(tryTeach.tutor_agree);
    return (
      <li key={tryTeach.id}>
        id: {tryTeach.id}, tutor: {tryTeach.tutor}, parent_try_teach:{" "}
        {tryTeach.parent_room}
        {tryTeach.parent_room === userId && !tryTeach.parent_agree ? (
          <button onClick={() => addToTeaching(tryTeach.id)}>
            Dong y thue
          </button>
        ) : null}
        {tryTeach.parent_agree && tryTeach.parent_room === userId ? (
          <button>Cho gia su dong y</button>
        ) : null}
        {tryTeach.tutor === userId && !tryTeach.tutor_agree ? (
          <button onClick={() => addToTeaching(tryTeach.id)}>
            Dong y day chinh thuc
          </button>
        ) : null}
        {tryTeach.tutor_agree && tryTeach.tutor === userId ? (
          <button>Cho phu huynh dong y</button>
        ) : null}
        {tryTeach.tutor === userId ? (
          <button onClick={() => deleteFromTryTeaching(tryTeach.id)}>
            Khong day tiep
          </button>
        ) : null}
        {tryTeach.parent_room === userId ? (
          <button onClick={() => deleteFromTryTeaching(tryTeach.id)}>
            Khong muon tiep tuc thue
          </button>
        ) : null}
      </li>
    );
  });

  const teaching = useSelector(selectTeachingForRoom);
  const renderTeaching = teaching.map((teach) => {
    return (
      <li key={teach.id}>
        id: {teach.id}, tutor: {teach.tutor}, parent_teach: {teach.parent_room}
      </li>
    );
  });

  const addToWaitingList = (roomId) => {
    dispatch(addWaitingListForRoom({ roomId: roomId, token: token }));
  };

  return (
    <div>
      <div>
        room detail: {roomDetail.id}, {roomDetail.location}
        {type_tutor === "true" &&
        renderThem(
          roomDetail.id,
          list_room_waiting,
          list_room_invited,
          list_room_try_teaching
        ) ? (
          <button onClick={() => addToWaitingList(roomDetail.id)}>them</button>
        ) : null}
      </div>
      waiting list: <ul>{renderWaitingList}</ul>
      invited list: <ul>{renderInvitedList}</ul>
      try teaching: <ul>{renderTryTeaching}</ul>
      teaching: <ul>{renderTeaching}</ul>
      <button onClick={props.closeRoomDetail}>Close</button>
    </div>
  );
}

export default ParentRoom;
