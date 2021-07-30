import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectId_of_user, selectToken } from "../auth/authSlice";
import {
  deleteInvitedListForTutorInfor,
  fetchInvitedListForTutorInfor, selectInvitedListForTutorInfor
} from "./invitedListForTutorInforSlice";
import {
  addTeachingForTutorInfor,
  addToTeachingTutorInfor,
  fetchTeachingForTutorInfor, selectTeachingForTutorInfor
} from "./teachingForTutorInforSlice";
import {
  addTryTeachingForTutorInfor,
  deleteTryTeachingForTutorInfor,
  fetchTryTeachingForTutorInfor, selectTryTeachingForTutorInfor
} from "./tryTeachingForTutorInforSlice";
import {
  deleteWaitingListForTutorInfor,
  fetchWaitingListForTutorInfor, selectWaitingListForTutorInfor
} from "./waitingListForTutorInforSlice";

function TutorInfor() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(selectToken);

  //thông tin người dùng
  const id_of_user = useSelector(selectId_of_user);

  if(!token) {
    history.push("/login");
  }

  useEffect(() => {
    if (token) {
      // dispatch something here.
      dispatch(fetchWaitingListForTutorInfor({ token }));
      dispatch(fetchInvitedListForTutorInfor({ token }));
      dispatch(fetchTryTeachingForTutorInfor({ token }));
      dispatch(fetchTeachingForTutorInfor({ token }));
    }
  }, [token]);

  //xóa khỏi danh sách đợi
  const handleDeleteWaiting = (waitingId) => {
    dispatch(deleteWaitingListForTutorInfor({waitingId: waitingId, token: token}));
  }

  //đồng ý dạy thử, thêm vào danh sách dạy thử
  const handleTryTeach = (invitedId) => {
    dispatch(addTryTeachingForTutorInfor({ invitedId: invitedId, token: token }));
  }

  //không đồng ý dạy thử, xóa khỏi danh sách mời
  const handleDontTryTeach = (invitedId) => {
    dispatch(deleteInvitedListForTutorInfor({ invitedId: invitedId, token: token}));
  }

  //đồng ý dạy chính thức
  const handleTeach = (tryTeachId) => {
    addToTeachingTutorInfor({try_teachingId: tryTeachId, token: token, dispatch: dispatch});
  }

  //không đồng ý dạy chính thức, xóa khỏi danh sách dạy thử
  const handleDontTeach = (tryTeachId) => {
    dispatch(deleteTryTeachingForTutorInfor({try_teachingId: tryTeachId, token: token}))
  }

  const waitingList = useSelector(selectWaitingListForTutorInfor);
  const renderWaitingList = waitingList.map((waiting) => {
    return (
      <div>
        <li key={waiting.id}>
          id: {waiting.id}, parent_room: {waiting.parent_room}
          <button onClick={() => handleDeleteWaiting(waiting.id)}>delete</button>
        </li>
      </div>
    );
  });

  const invitedList = useSelector(selectInvitedListForTutorInfor);
  const renderInvitedList = invitedList.map((invited) => {
    return (
      <div>
        <li key={invited.id}>
          id: {invited.id}, parent_room: {invited.parent_room}
          <button onClick={() => handleTryTeach(invited.id)}>Dong y day thu</button>
          <button onClick={() => handleDontTryTeach(invited.id)}>Khong dong y day thu</button>
        </li>
      </div>
    );
  });

  const tryTeaching = useSelector(selectTryTeachingForTutorInfor);
  const renderTryTeaching = tryTeaching.map((try_teaching) => {
    return (
      <div>
        <li key={try_teaching.id}>
          id: {try_teaching.id}, parent_room: {try_teaching.parent_room}
          
            {try_teaching.tutor_agree ? (
            <button onClick={() => handleTeach(try_teaching.id)}>
              Dong y day chinh thuc
            </button>
          ) : <button>Cho phu huynh dong y</button>}
          
          <button onClick = { () => handleDontTeach(try_teaching.id) }>Khong muon day tiep</button>
        </li>
      </div>
    );
  });

  const teaching = useSelector(selectTeachingForTutorInfor);
  const renderTeaching = teaching.map((teach) => {
    return (
      <div>
        <li key={teach.id}>
          id: {teach.id}, parent_room: {teach.parent_room}
        </li>
      </div>
    );
  });

  return (
    <div>
      <h3>Id user: {id_of_user}</h3>
      <h4>Danh sach cho</h4>
      <ul>{renderWaitingList}</ul>
      <h4>Danh sach moi</h4>
      <ul>{renderInvitedList}</ul>
      <h4>Danh sach day thu</h4>
      <ul>{renderTryTeaching}</ul>
      <h4>Danh sach dang day</h4>
      <ul>{renderTeaching}</ul>
    </div>
  );
}

export default TutorInfor;
