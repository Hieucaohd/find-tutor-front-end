import { Grid } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import Room from 'components/Room/Room';
import SkeletonPage from "components/Skeleton/SkeletonPage";
import { isSignedIn } from "features/auth/cookies";
import { GetAllRoom, GetFilterRoom } from "graphql/RoomQueries";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { RiFilter2Line, RiFilterOffLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addToApplyList } from "../../graphql/mutationGraphQl";
import {
  selectToken, selectType_parent, selectType_tutor
} from "../auth/authSlice";
import Categories from "./components/Categories";
import FilterBar from "./components/FilterBar/FilterBar";
import "./styles.scss";

function Home() {
  const history = useHistory();
  const type_tutor = useSelector(selectType_tutor); // lấy type_tutor từ authSlice.js
  const type_parent = useSelector(selectType_parent); // lấy type_parent từ authSlice.js
  const filterBar = useRef(null);
  const homeOverlay = useRef(null);
  const cancelFilter = useRef(null);
  const isSigned = isSignedIn();
  const [filter, setFilter] = useState({
    filterRoom: {},
    pages: 1,
  }); //bộ lọc
  const [roomList, setRoomList] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const token = useSelector(selectToken);



  const [pagination, setPagination] = useState(1);
  const [maxPagination, setMaxPagination] = useState(1);
  //chưa đăng kí là gia sư hay phụ huynh trả đến trang đăng kí
  if(type_tutor === false && type_parent === false) {
    history.push("/role/chooserole");
  }
  useEffect( () => {
    const getRoomList = async () => {
      setLoading(true);
      const list = await GetAllRoom(filter.pages, token); 
      setMaxPagination(list?.num_pages);
      setRoomList(list?.result);
      setLoading(false);
    }
    const getFilterRoomList = async (params) => { 
      setLoading(true);
      const filterRoomList = await GetFilterRoom({...params, token});
      setMaxPagination(filterRoomList?.num_pages);
      setRoomList(filterRoomList?.result);
      setLoading(false);
    }
    if(Object.keys(filter?.filterRoom).length === 0) {
      getRoomList(filter?.pages);
    }
    else {
      getFilterRoomList(filter);
    }
    
  }, [filter]);

  useEffect(()=> {
    setFilter({
      ...filter,
      pages: pagination,
    })
  }, [pagination])

  const handleShowFilterBar = () => {
    filterBar.current.style.display = "flex";
    homeOverlay.current.style.display = "block";
  }

  const handleCloseFilterBar = () => {
    filterBar.current.style.display = "none";
    homeOverlay.current.style.display = "none";
  }

  const handleCancelFilter = () => {
    setFilter({filterRoom: {}, pages: 1});
    cancelFilter.current.style.display = "none";
  }

  const onSubmitSearch = (newFilter) => {
    setFilter({filterRoom: newFilter, pages: 1});
    //close filter bar
    handleCloseFilterBar();
    cancelFilter.current.style.display = "block"
  }

  const handleAddRoom = async (id) => {
    if(isSigned){
      const response = await addToApplyList({token: token, parentRoomId: id});
      alert("Đã thêm phòng");
    } else {
      history.push("/signin");
    }
  }

  const handleShowCreateRoom = () => {
    history.push("/createroom");
  }

  const handleChangePage = (event, value) => {
    setPagination(Number(value));
  }

  return (
    <div className = "home">
      <Categories />
      {loading ? <SkeletonPage /> 
      : <Grid container>{
        roomList?.map((room)=>(
          <Room room={{...room, roomId: room.id}} typeTutor = {type_tutor} typeParent={type_parent} onCheck={handleAddRoom} type={"home"}/>
        ))}
      </Grid>}

      <div ref={filterBar} className="home__filter"> 
        <FilterBar onClose={handleCloseFilterBar} onSubmit={onSubmitSearch}/>
      </div>
      <div className="home__buttongroup">
        {isSigned && type_parent && <button onClick={handleShowCreateRoom}><AiOutlineAppstoreAdd /></button>}
        {isSigned && <button className="home__toggle__filter" onClick={handleShowFilterBar}> <RiFilter2Line /> </button>}
        <button className="home__toggle__cancel" onClick={handleCancelFilter} ref={cancelFilter} style={{display: "none"}}> <RiFilterOffLine /></button>
      </div>
        {maxPagination > 1 && <Pagination count={maxPagination} color="primary" className="home__pagination" onChange={handleChangePage}/>}
      <div className="home__overlay" ref={homeOverlay} onClick={handleCloseFilterBar}> </div>
    </div>
  );
}


export default Home;