import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";

import CreateRoom from "./CreateRoom";

import {
  fetchRoomRelateTutor,
  // selectWaitingListForTutor,
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

const selectRoomListStatus = (state) => state.roomList.status;

const selectWaitingListForTutor = (state) =>
  state.roomRelateTutor.list_room_waiting;
const selectInvitedListForTutor = (state) =>
  state.roomRelateTutor.list_room_invited;
const selectTryTeachingForTutor = (state) =>
  state.roomRelateTutor.list_room_try_teaching;

// const selectToken = (state) => state.auth.token;
// const selectId_of_user = (state) => state.auth.id;
// const selectType_tutor = (state) => state.auth.type_tutor;
// const selectType_parent = (state) => state.auth.type_parent;

function Home() {
  let history = useHistory();
  const dispatch = useDispatch();

  const [isRenderCreateRoom, setIsRenderCreateRoom] = useState(false);
  const [isRefreshListRoom, setIsRefreshListRoom] = useState(false);

  const roomListStatus = useSelector(selectRoomListStatus);
  const roomList = useSelector(selectRoomList);
  const list_room_waiting = useSelector(selectWaitingListForTutor);
  const list_room_invited = useSelector(selectInvitedListForTutor);
  const list_room_try_teaching = useSelector(selectTryTeachingForTutor);
  // console.log(list_room_waiting);
  // console.log(roomList);
  // console.log(roomList.find((room) => room.id === 28))

  // const [cookies, setCookie, removeCookie] = useCookies([
  //   "id",
  //   "token",
  //   "type_tutor",
  //   "type_parent",
  // ]);

  // const token = cookies["token"];
  // const id_of_user = Number(cookies["id"]);
  // const type_tutor = cookies["type_tutor"];
  // const type_parent = cookies["type_parent"];

  const token = useSelector(selectToken);
  const id_of_user = Number(useSelector(selectId_of_user));
  const type_tutor = useSelector(selectType_tutor);
  const type_parent = useSelector(selectType_parent);

  // const [roomDetail, setRoomDetail] = useState(<div></div>);

  // useEffect(() => {
  //   if (cookies["token"]) {
  //     const token = cookies["token"];
  //     dispatch(fetchRoomList({ token: token }));
  //     dispatch(fetchRoomRelateTutor({ token: token }));
  //   }

  //   if (!cookies["token"]) {
  //     history.push("/login");
  //   }

  //   // dispatch(login({"username": "hieucao1", "password": "Caotrunghieu@192"}));
  // }, [cookies["token"]]);

  const dispatchSomething = () => {
    dispatch(fetchRoomList({ token: token }));
    dispatch(fetchRoomRelateTutor({ token: token }));
  };

  useEffect(() => {
    if (token) {
      dispatchSomething();
      // setInterval(dispatchSomething, 1000 * 1);
      setInterval(dispatchSomething, 1000 * 60 * 3);
    }

    if (!token) {
      history.push("/login");
    }
  }, [token, isRefreshListRoom]);

  // if (roomListStatus === "loading") {
  //   return <div>Loading Room List</div>;
  // }

  // const handleDeleteRoom = (roomId) => {
  //   dispatch(deleteRoom({ roomId: roomId, token: token }));
  // };

  // const showRoomDetail = (roomId) => {
  //   setRoomDetail(
  //     <ParentRoom
  //       roomId={roomId}
  //       token={token}
  //       userId={id_of_user}
  //       type_tutor={String(type_tutor)}
  //     />
  //   );
  // };

  // const addToWaitingList = (roomId) => {
  //   dispatch(addWaitingListForRoom({ roomId: roomId, token: token }));
  // };

  // const deleteFromWaitingList = (roomId) => {
  //   dispatch(deleteWaitingListForRoom({ roomId: roomId, token: token }));
  // };

  // const renderThem = (roomId) => {
  //   let isRender_1 = false;
  //   if (
  //     list_room_waiting &&
  //     !list_room_waiting.find((waitingId) => waitingId === roomId)
  //   ) {
  //     isRender_1 = true;
  //   }

  //   let isRender_2 = false;
  //   if (
  //     list_room_invited &&
  //     !list_room_invited.find((invitedId) => invitedId === roomId)
  //   ) {
  //     isRender_2 = true;
  //   }

  //   let isRender_3 = false;
  //   if (
  //     list_room_try_teaching &&
  //     !list_room_try_teaching.find(
  //       (try_teachingId) => try_teachingId === roomId
  //     )
  //   ) {
  //     isRender_3 = true;
  //   }

  //   return isRender_1 && isRender_2 && isRender_3;
  // };

  const renderRoomList = roomList.map((room) => {
    return (
      <Room
        room={room}
        token={token}
        // handleDeleteRoom={handleDeleteRoom}
        // showRoomDetail={showRoomDetail}
        // addToWaitingList={addToWaitingList}
        list_room_waiting={list_room_waiting}
        list_room_invited={list_room_invited}
        list_room_try_teaching={list_room_try_teaching}
        id_of_user={id_of_user}
        type_tutor={type_tutor}
        // renderThem={renderThem}
      />
    );
    // (
    //   <li key={room.id}>
    //     subject: {room.subject}, lop: {room.lop}, location: {room.location},
    //     parent_id: {room.parent}, other_require: {room.other_require},
    //     day_can_teach:{room.day_can_teach}
    //     <div>
    //       {room.parent === id_of_user ? (
    //         <button onClick={() => handleDeleteRoom(room.id)}>Delete</button>
    //       ) : null}
    //     </div>
    //     <div>
    //       {String(type_tutor) === "true" && renderThem(room.id, list_room_waiting, list_room_invited, list_room_try_teaching) ? (
    //         <button onClick={() => addToWaitingList(room.id)}>Them</button>
    //       ) : null}
    //     </div>
    //     <div>
    //       <button onClick={() => showRoomDetail(room.id)}>show detail</button>
    //     </div>
    //   </li>
    // );
  });

  const logoutPage = () => {
    // removeCookie("token");
    // removeCookie("id");
    // removeCookie("type_tutor");
    // removeCookie("type_parent");
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
