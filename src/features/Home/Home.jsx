import { Grid } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import Modal from "components/Modal/Modal";
import Room from 'components/Room/Room';
import SkeletonPage from "components/Skeleton/SkeletonPage";
import { isSignedIn } from "features/auth/cookies";
import { GetAllRoom, GetFilterRoom } from "graphql/RoomQueries";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { RiFilter2Line, RiFilterOffLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [roomList, setRoomList] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector(selectToken);
  const [showFailModal, setShowFailModal] = useState(false);
  const [showCheckModal, setShowCheckModal] = useState(false);
  const [maxPagination, setMaxPagination] = useState(1);

  const queryString = require('query-string');

  //chưa đăng kí là gia sư hay phụ huynh trả đến trang đăng kí
  if(type_tutor === false && type_parent === false) {
    history.push("/role/chooserole");
  }

  useEffect( () => {
    const filter = queryString.parse(location.search)
    const getRoomList = async () => {
      setLoading(true);
      const pages = await filter.pages || 1;
      const list = await GetAllRoom(pages, token); 
      setMaxPagination(list?.num_pages);
      setRoomList(list?.result);
      setLoading(false);
    }
    const getFilterRoomList = async () => { 
      setLoading(true);
      const filter = await queryString.parse(location.search);
      const filterRoomList = await GetFilterRoom({filterRoom: {...filter}, token: token});
      setMaxPagination(filterRoomList?.num_pages);
      setRoomList(filterRoomList?.result);
      setLoading(false);
    }

    if(!filter?.onFilter) {
      getRoomList();
    }

    else {
      getFilterRoomList();
    }
    
  }, [location, token, queryString]);


  const handleShowFilterBar = () => {
    filterBar.current.style.display = "flex";
    homeOverlay.current.style.display = "block";
  }

  const handleCloseFilterBar = () => {
    filterBar.current.style.display = "none";
    homeOverlay.current.style.display = "none";
  }

  const handleCancelFilter = () => {
    history.push("/");
    cancelFilter.current.style.display = "none";
  }

  const onSubmitSearch = (newFilter) => {
    //close filter bar
    handleCloseFilterBar();
    cancelFilter.current.style.display = "block";
    
    history.push(`/?${queryString.stringify({...newFilter, pages: 1, onFilter: true})}`)
  }

  const handleAddRoom = async (id) => {
    if(isSigned){
      const response = await addToApplyList({token: token, parentRoomId: id});
      !response ? setShowFailModal(true) : setShowCheckModal(true);
    } else {
      history.push("/signin");
    }
  }

  const handleShowCreateRoom = () => {
    history.push("/createroom");
  }

  const handleChangePage = (event, value) => {
    const newSearch = {
      ...queryString.parse(location.search),
      pages: value,
    }
    history.push(`/?${queryString.stringify(newSearch)}`)
  }

  return (
    <div className = "home">
      <Categories />
      {loading ? <SkeletonPage /> 
      : <Grid container>{
        roomList?.map((room)=>(
          <Room key={room.id} room={{...room, roomId: room.id}} typeTutor = {type_tutor} typeParent={type_parent} onCheck={handleAddRoom} type={"home"}/>
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
      
      {showCheckModal && <Modal typeIcon="check" text="Ứng tuyển thành công" onAgree={() => setShowCheckModal(false)} />}
      {showFailModal && <Modal typeIcon="fail" text="Ứng tuyển không thành công" onAgree={() => setShowFailModal(false)} />}
    
    </div>
  );
}


export default Home;