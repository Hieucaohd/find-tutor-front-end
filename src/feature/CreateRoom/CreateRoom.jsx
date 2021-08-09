import React, { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectId_of_user, selectToken } from "../auth/authSlice";
import { addRoom } from "../home/homeSlice";
import "./styles.scss";
import { Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { Alert, AlertTitle } from "@material-ui/lab";
import Location from "../location/Location";

function CreateRoom(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const days = [2, 3, 4, 5, 6, 7, 8];
  const token = useSelector(selectToken);
  const parentId = useSelector(selectId_of_user);
  const { register, formState: { errors }, handleSubmit } = useForm();
  let successRef = useRef(null);
  const [location, setLocation] = useState({
    province: 0,
    district: 0,
    ward: 0
  })
  //if not logged in, will be redirected to the login page
  if(!token) {
    history.push("/login")
  }

  const handleGetLocation = (data) => {
    setLocation(data);
  }

  //handle submit
  const onSubmit = (data) => {
    
    // get day can teach
    let dayCanTeach = []
    for(let i = 2; i<9; i++) {
      if(data[i]){
        dayCanTeach.push(i);
      }
    }

    const roomInfor = {
      "day_can_teach": dayCanTeach || null, 
      "subject": data.subject || null,
      "lop": data.class || null,
      "other_require": data.other_require || null,
      "province_code": Number(location.province),
      "district_code": Number(location.district),
      "ward_code": Number(location.ward),
      "detail_location": data.detailLocation || null,
    };
  
    const args = {
      roomInfor: roomInfor,
      token: token,
    };
    const action = addRoom(args);
    dispatch(action);
    successRef.current.style.display = "block";
  }

  return (
    <div className="createroom">
      <div className = "createroom__success" ref={successRef}>
        <Alert severity="success" onClose={() => {history.push(`/parentinfo/${parentId}`)}}>
          <AlertTitle>Success</AlertTitle>
          Tạo phòng thành công
        </Alert>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}> 
        
        <div className = "createroom__day"> 
        {days.map((day, index) => {
          return (
            <div className="createroom__day__field">
              <label for={index}>{day === 8 ? "Chủ nhật " : "Thứ " + day}</label>
              <input
                type="checkbox"
                value="checked"
                name={String(day)}
                id={index} 
                {...register(String(day))}
              />
            </div>
          );
        })}
        </div>

        <div className = "createroom__field">
          <label for="subject">Môn học </label>
          <input
            type="text"
            id="subject" 
            {...register("subject", { required: true })}
          />
          <span className="createroom__error">{errors.subject && "Cần nhập môn học"}</span>
        </div>
        <div className = "createroom__field">
          <label for="lop">Lớp </label>
          <input
            type="number"
            id="lop" 
            min="0" max="15"
            {...register("class", { required: true })}
          />
          <span className="createroom__error">{errors.class && "Cần nhập lớp"}</span>
        </div>

        <div className="createroom__field">
            <label>Địa chỉ</label>
            <Location onChange={handleGetLocation} />
        </div>
        <div className="register__tutor__form__control">
            <label>Chi tiết địa chỉ</label>
            <input 
              name="detailLocation" 
              type="text"
              {...register("detailLocation")}
           />
        </div>

        <div className = "createroom__field">
          <label for="other_require">Yêu cầu khác </label>
          <input
            type="text"
            id="other_require"
            {...register("other_require")}
          />
        </div>

        <div className = "createroom__field">
          <Button type="submit" variant="contained" color="primary" >Tạo phòng</Button>
        </div>
      </form>
    </div>
  );
}

export default CreateRoom;