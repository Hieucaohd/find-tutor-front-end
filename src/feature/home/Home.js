import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";

import CreateRoom from "./CreateRoom";

import {
  fetchRoomRelateTutor,
} from "../auth/roomRelateTutorSlice";

import { fetchRoomList, selectRoomList } from "./homeSlice";

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

  const [isRenderCreateRoom, setIsRenderCreateRoom] = useState(false);  // hiện thị form để tạo lớp học.
  const [isRefreshListRoom, setIsRefreshListRoom] = useState(false); // refresh lại danh sách lớp học để cập nhật thêm các lớp học.

  const roomList = useSelector(selectRoomList); // lấy danh sách lớp học từ homeSlice.js
  const list_room_waiting = useSelector(selectWaitingListForTutor); // lấy danh sách các lớp học đã ứng tuyển của gia sư từ roomRelateTutorSlice.js
  const list_room_invited = useSelector(selectInvitedListForTutor); // lấy danh sách các lớp học đã được mời của gia sư từ roomRelateTutorSlice.js
  const list_room_try_teaching = useSelector(selectTryTeachingForTutor); // lấy danh sách các lớp học đang dạy thử của gia sư từ roomRelateTutorSlice.js

  const token = useSelector(selectToken); // lấy mã token từ authSlice.js
  const id_of_user = Number(useSelector(selectId_of_user)); // lấy id từ authSlice.js
  const type_tutor = useSelector(selectType_tutor); // lấy type_tutor từ authSlice.js
  const type_parent = useSelector(selectType_parent); // lấy type_parent từ authSlice.js


  // dispatch để nạp danh sách lớp học + thông tin về các lớp học của gia sư từ homeSlice.js và rooomRelateTutorSlice.js
  const dispatchSomething = () => {
    dispatch(fetchRoomList({ token: token }));
    dispatch(fetchRoomRelateTutor({ token: token }));
  };

  useEffect(() => {
    // nếu người dùng đã đăng nhập thì nạp danh sách lớp học + thông tin về các lớp học của gia sư từ homeSlice.js và rooomRelateTutorSlice.js
    if (token) {
      dispatchSomething();
      setInterval(dispatchSomething, 1000 * 60 * 3);
    }

    // nếu người dùng chưa đăng nhập thì đưa người dùng về trang login.
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
      {/* <button onClick={() => dispatch(logout())}>Logout</button> */}

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
