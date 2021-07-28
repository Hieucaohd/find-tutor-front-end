import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";

import CreateRoom from "./CreateRoom";

import {
  fetchRoomRelateTutor,
} from "../auth/roomRelateTutorSlice";

import { fetchRoomList, selectRoomList } from "./homeSlice";

import { logout } from "../auth/authSlice";

import Room from "./components/Room";

import {
  selectToken,
  selectId_of_user,
  selectType_tutor,
  selectType_parent,
} from "../auth/authSlice";

const selectWaitingListForTutor = (state) =>
  state.roomRelateTutor.list_room_waiting;
const selectInvitedListForTutor = (state) =>
  state.roomRelateTutor.list_room_invited;
const selectTryTeachingForTutor = (state) =>
  state.roomRelateTutor.list_room_try_teaching;

function Home() {
  let history = useHistory();
  const dispatch = useDispatch();

  const [isRenderCreateRoom, setIsRenderCreateRoom] = useState(false);
  const [isRefreshListRoom, setIsRefreshListRoom] = useState(false);

  const roomList = useSelector(selectRoomList);
  const list_room_waiting = useSelector(selectWaitingListForTutor);
  const list_room_invited = useSelector(selectInvitedListForTutor);
  const list_room_try_teaching = useSelector(selectTryTeachingForTutor);
  

  const token = useSelector(selectToken);
  const id_of_user = Number(useSelector(selectId_of_user));
  const type_tutor = useSelector(selectType_tutor);
  const type_parent = useSelector(selectType_parent);

  const dispatchSomething = () => {
    dispatch(fetchRoomList({ token: token }));
    dispatch(fetchRoomRelateTutor({ token: token }));
  };

  useEffect(() => {
    if (token) {
      dispatchSomething();
      setInterval(dispatchSomething, 1000 * 60 * 3);
    }

    if (!token) {
      history.push("/login");
    }
  }, [token, isRefreshListRoom]);

 
  const renderRoomList = roomList.map((room) => {
    return (
      <Room
        room={room}
        token={token}
        list_room_waiting={list_room_waiting}
        list_room_invited={list_room_invited}
        list_room_try_teaching={list_room_try_teaching}
        id_of_user={id_of_user}
        type_tutor={type_tutor}
      />
    );
    
  });

  const logoutPage = () => {
    
    dispatch(logout());
  };

  const showFormCreateRoom = () => {
    setIsRenderCreateRoom(true);
  };

  const closeFormCreateRoom = () => {
    setIsRenderCreateRoom(false);
  };

  const refreshListRoom = () => {
    setIsRefreshListRoom(!isRefreshListRoom);
  };

  return (
    <div>
      <button onClick={logoutPage}>Logout</button>

      <ul>{renderRoomList}</ul>

      <div>
        {type_parent ? (
          <button onClick={showFormCreateRoom}>Create Room</button>
        ) : null}
      </div>

      {isRenderCreateRoom && (
        <CreateRoom closeCreateRoom={closeFormCreateRoom} />
      )}

      <div>
        <button onClick={refreshListRoom}>More Room</button>
      </div>
    </div>
  );
}

export default Home;
