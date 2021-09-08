import { Button, Grid } from "@material-ui/core";
import Room from 'components/Room/Room';
import SkeletonPage from "components/Skeleton/SkeletonPage";
import { isSignedIn } from "features/auth/cookies";
import { GetAllRoom, GetFilterRoom } from "graphql/RoomQueries";
import React, { useEffect, useRef, useState } from "react";
import { FcAddDatabase, FcClearFilters, FcFilledFilter } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  selectToken, selectType_parent, selectType_tutor
} from "../auth/authSlice";
import { addWaitingListForRoom } from "../ParentRoom/waitingListForRoomSlice";
import FilterBar from "./components/FilterBar/FilterBar";
import "./styles.scss";

function Home() {
  let history = useHistory();

  const [isRefreshListRoom, setIsRefreshListRoom] = useState(false); // refresh lại danh sách lớp học để cập nhật thêm các lớp học.
  const type_tutor = useSelector(selectType_tutor); // lấy type_tutor từ authSlice.js
  const type_parent = useSelector(selectType_parent); // lấy type_parent từ authSlice.js
  const filterBar = useRef(null);
  const homeOverlay = useRef(null);
  const cancelFilter = useRef(null);
  const [filter, setFilter] = useState({}); //bộ lọc
  const [roomList, setRoomList] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const token = useSelector(selectToken);

  //chưa đăng kí là gia sư hay phụ huynh trả đến trang đăng kí
  if(type_tutor === false && type_parent === false) {
    history.push("/role/chooserole");
  }

  if(!isSignedIn()){
    history.push("/signin");
  }


  useEffect( () => {
    const getRoomList = async () => {
      setLoading(true);
      const list = await GetAllRoom();  
      setRoomList(list);
      setLoading(false);
    }
    const getFilterRoomList = async (params) => {
      setLoading(true);
      const filterRoomList = await GetFilterRoom(params);
      setRoomList(filterRoomList);
      setLoading(false);
    }
    if(Object.keys(filter).length === 0) {
      getRoomList();
    }
    else {
      getFilterRoomList(filter);
    }
    
  }, [filter]);

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
    cancelFilter.current.style.display = "none";
  }

  const onSubmitSearch = (newFilter) => {
    setFilter(newFilter);
    //close filter bar
    handleCloseFilterBar();
    cancelFilter.current.style.display = "block"
  }

  const handleAddRoom = (id) => {
    dispatch(addWaitingListForRoom({ roomId: id, token: token }));
    alert("Đã thêm phòng");
  }

  const handleShowCreateRoom = () => {
    history.push("/createroom");
  }

  return (
    <div className = "home">
      {loading ? <SkeletonPage /> 
      : <Grid container spacing={2}>{
        roomList?.map((room)=>(
          <Room room={room} color="white" typeTutor = {type_tutor} onCheck={type_tutor && handleAddRoom} onHome={true}/>
        ))}
      </Grid>}

      <div ref={filterBar} className="home__filter"> 
        <FilterBar onClose={handleCloseFilterBar} onSubmit={onSubmitSearch}/>
      </div>

      

      <div className="home__buttongroup">
        {isSignedIn() && type_parent && <button onClick={handleShowCreateRoom}><FcAddDatabase /></button>}
        <button className="home__toggle__filter" onClick={handleShowFilterBar}> <FcFilledFilter /> </button>
        <button className="home__toggle__cancel" onClick={handleCancelFilter} ref={cancelFilter} style={{display: "none"}}> <FcClearFilters /></button>
      </div>
      
      <div>
        <Button onClick={refreshListRoom} color="primary">More Room</Button>
      </div>
      <div className="home__overlay" ref={homeOverlay} onClick={handleCloseFilterBar}> </div>
    </div>
  );
}

export default Home;