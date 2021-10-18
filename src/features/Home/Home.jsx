import { Grid } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import SkeletonPage from "components/Skeleton/SkeletonPage";
import { isSignedIn } from "features/auth/cookies";
import { GetFilterRoom } from "graphql/RoomQueries";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { addToApplyList } from "../../graphql/mutationGraphQl";
import {
  selectToken, selectType_parent, selectType_tutor
} from "../auth/authSlice";
import "./styles.scss";
import Room from "components/Room/Room";
import HomeBar from "./components/HomeBar/HomeBar";
import Modal from "components/Modal/Modal";

function Home() {
  const history = useHistory();
  const type_tutor = useSelector(selectType_tutor); // lấy type_tutor từ authSlice.js
  const type_parent = useSelector(selectType_parent); // lấy type_parent từ authSlice.js
  
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
    
    const getFilterRoomList = async () => { 
      setLoading(true);
      const filter = await queryString.parse(location.search);
      const filterRoomList = await GetFilterRoom({filterRoom: {...filter}, token: token});
      setMaxPagination(filterRoomList?.num_pages);
      setRoomList(filterRoomList?.result);
      setLoading(false);
    }

    getFilterRoomList();
    
  }, [location, token, queryString]);


  const handleAddRoom = async (id) => {
    if(isSigned){
      const response = await addToApplyList({token: token, parentRoomId: id});
      !response ? setShowFailModal(true) : setShowCheckModal(true);
    } else {
      history.push("/signin");
    }
  }

  // const handleShowCreateRoom = () => {
  //   history.push("/createroom");
  // }

  const handleChangePage = (event, value) => {
    const newSearch = {
      ...queryString.parse(location.search),
      pages: value,
    }
    history.push(`/?${queryString.stringify(newSearch)}`)
  }
  

  return (
    <div className = "home">
      <HomeBar />
      
      {loading ? <SkeletonPage /> 
      : <Grid container>{
        roomList?.map((room)=>(
          <Room key={room.id} room={{...room, roomId: room.id}} typeTutor = {type_tutor} typeParent={type_parent} onCheck={handleAddRoom} type={"home"}/>
        ))}
      </Grid>}

      {maxPagination > 1 && <Pagination count={maxPagination} color="primary" className="home__pagination" onChange={handleChangePage}/>}      
      {showCheckModal && <Modal typeIcon="check" text="Ứng tuyển thành công" onAgree={() => setShowCheckModal(false)}/>}
      {showFailModal && <Modal typeIcon="fail" text="Ứng tuyển không thành công" onAgree={() => setShowFailModal(false)} />}
    
    </div>
  );
}


export default Home;