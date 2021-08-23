import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  selectId_of_user, selectToken, selectType_parent, selectType_tutor
} from "../auth/authSlice";
import { fetchRoomList, fetchFilterRoomList } from "./getRoom";
import "./styles.scss";
import { RiFilterFill, RiFilterOffFill } from "react-icons/ri";
import FilterBar from "./components/FilterBar/FilterBar";
import Room from 'components/Room/Room';
import { addWaitingListForRoom } from "../parent_room/waitingListForRoomSlice";

const selectWaitingListForTutor = (state) =>
  state.roomRelateTutor.list_room_waiting;
const selectInvitedListForTutor = (state) =>
  state.roomRelateTutor.list_room_invited;
const selectTryTeachingForTutor = (state) =>
  state.roomRelateTutor.list_room_try_teaching;

function Home() {
  let history = useHistory();

  const [isRefreshListRoom, setIsRefreshListRoom] = useState(false); // refresh lại danh sách lớp học để cập nhật thêm các lớp học.
  const list_room_waiting = useSelector(selectWaitingListForTutor); // lấy danh sách các lớp học đã ứng tuyển của gia sư từ roomRelateTutorSlice.js
  const list_room_invited = useSelector(selectInvitedListForTutor); // lấy danh sách các lớp học đã được mời của gia sư từ roomRelateTutorSlice.js
  const list_room_try_teaching = useSelector(selectTryTeachingForTutor); // lấy danh sách các lớp học đang dạy thử của gia sư từ roomRelateTutorSlice.js
  const token = useSelector(selectToken); // lấy mã token từ authSlice.js
  const id_of_user = Number(useSelector(selectId_of_user)); // lấy id từ authSlice.js
  const type_tutor = useSelector(selectType_tutor); // lấy type_tutor từ authSlice.js
  const type_parent = useSelector(selectType_parent); // lấy type_parent từ authSlice.js
  const filterBar = useRef(null);
  const homeOverlay = useRef(null);
  const cancelFilter = useRef(null);
  const [filter, setFilter] = useState({}); //bộ lọc
  const [roomList, setRoomList] = useState([]);
  const dispatch = useDispatch();

  //chưa đăng kí là gia sư hay phụ huynh trả đến trang đăng kí
  if(type_tutor === false && type_parent === false) {
    history.push("/signup/chooserole")
  }

  useEffect(() => {
    // nếu người dùng đã đăng nhập thì nạp danh sách lớp học + thông tin về các lớp học của gia sư từ homeSlice.js và rooomRelateTutorSlice.js
    // if (token) {
    //   dispatchSomething();
    //   setInterval(dispatchSomething, 1000 * 60 * 3);
    // }
    // nếu người dùng chưa đăng nhập thì đưa người dùng về trang login.
    if (!token) {
      history.push("/login");
    }
  }, [token]);

  

  useEffect( () => {
    const getRoomList = async () => {
      const list = await fetchRoomList();
      setRoomList(list);
    }
    const getFilterRoomList = async (params) => {
      const filterRoomList = await fetchFilterRoomList(params);
      setRoomList(filterRoomList);
    }
    if(Object.keys(filter).length === 0) {
      getRoomList();
    }
    else {
      getFilterRoomList(filter);
    }
    
  }, [filter]);

  // const renderRoomList = roomList?.map((room) => {
  //   return (
  //     <Room
  //       room={room}
  //       token={token}
  //       list_room_waiting={list_room_waiting}
  //       list_room_invited={list_room_invited}
  //       list_room_try_teaching={list_room_try_teaching}
  //       id_of_user={id_of_user}
  //       type_tutor={type_tutor}
  //     />
  //   );
  // });

  const refreshListRoom = () => {
    setIsRefreshListRoom(!isRefreshListRoom);
  };

  const handleShowFilterBar = () => {
    filterBar.current.style.display = "flex";
    homeOverlay.current.style.display = "block";
  }

  const handleCloseFilterBar = () => {
    filterBar.current.style.display = "none";
    homeOverlay.current.style.display = "none";
  }

  const handleCancelFilter = () => {
    setFilter({});
  }

  const onSubmitSearch = (newFilter) => {
    console.log('newfilter', newFilter)
    setFilter(newFilter);
    //close filter bar
    handleCloseFilterBar();
    cancelFilter.current.style.display = "block"
  }

  const handleAddRoom = (id) => {
    dispatch(addWaitingListForRoom({ roomId: id, token: token }));
    alert("Đã thêm phòng");
  }

  return (
    <div className = "home">
      <button className="home__toggle__filter" onClick={handleShowFilterBar}> <RiFilterFill /> <br/> Lọc </button>
      <button className="home__toggle__cancel" onClick={handleCancelFilter} ref={cancelFilter} style={{display: "none"}}> <RiFilterOffFill /> <br /> Hủy</button>
      <Grid container spacing={2}>{
        roomList.map((room)=>(
          <Room room={room} color="white" typeTutor = {type_tutor} onCheck={type_tutor && handleAddRoom} onHome={true}/>
        ))}
      </Grid>

      <div ref={filterBar} className="home__filter"> 
        <FilterBar onClose={handleCloseFilterBar} onSubmit={onSubmitSearch}/>
      </div>
      
      <div>
        <Button onClick={refreshListRoom} color="primary">More Room</Button>
      </div>
      <div className="home__overlay" ref={homeOverlay} onClick={handleCloseFilterBar}> 

      </div>
    </div>
  );
}

export default Home;
