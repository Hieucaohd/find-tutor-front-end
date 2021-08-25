import React, { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectId_of_user, selectToken } from "../auth/authSlice";
import { addRoom } from "../home/homeSlice";
import { Button, makeStyles } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { Alert, AlertTitle } from "@material-ui/lab";
import Location  from "components/location/Location";

const useStyles = makeStyles({
  root: {
    marginTop: "32px",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    width: "500px",
    marginBottom: "6px",
    "& label": {
        fontSize: "16px",
    },
    "& input": {
        padding: "4px 8px",
    },
  },
  day: {
    display: "flex",
    marginBottom: "6px",
    label: {
      fontSize: "16px",
    }
  },
  dayField: {
    marginRight: "8px",
  },
  error: {
    fontSize: "12px",
    color: "red",
    marginBottom: "2px",
  },
  success: {
    display: "none",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    "z-index": "1000",
        
  },
  addressInput: {
    width: "94%",
  }
})

function CreateRoom(props) {
  const classes = useStyles();
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
    <div className={classes.root}>
      <div className = {classes.success} ref={successRef}>
        <Alert severity="success" onClose={() => {history.push(`/parentinfo/${parentId}`)}}>
          <AlertTitle>Success</AlertTitle>
          Tạo phòng thành công
        </Alert>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}> 
        
        <div className = {classes.day}> 
        {days.map((day, index) => {
          return (
            <div className={classes.dayField}>
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

        <div className={classes.field}>
          <label for="subject">Môn học </label>
          <input
            type="text"
            id="subject" 
            list="subjects"
            {...register("subject", { required: true })}
          />
          <datalist id="subjects">
            <option value="Toán "/>
            <option value="Ngữ Văn"/>
            <option value="Hóa Học"/>
            <option value="Vật Lý"/>
            <option value="Sinh Học"/>
            <option value="Địa Lý"/>
            <option value="Lịch Sử"/>
            <option value="Tiếng Việt"/>
          </datalist>
          <span className={classes.error}>{errors.subject && "Cần nhập môn học"}</span>
        </div>
        <div className={classes.field}>
          <label for="lop">Lớp </label>
          <input
            type="number"
            id="lop" 
            min="0" max="15"
            {...register("class", { required: true })}
          />
          <span className={classes.error}>{errors.class && "Cần nhập lớp"}</span>
        </div>

        <div className={classes.field}>
            <label>Địa chỉ</label>
            <Location onChange={handleGetLocation} />
        </div>
        <div className={classes.field}>
            <label>Chi tiết địa chỉ</label>
            <input 
              name="detailLocation" 
              type="text"
              {...register("detailLocation")}
           />
        </div>

        <div className={classes.field}>
          <label for="other_require">Yêu cầu khác </label>
          <input
            type="text"
            id="other_require"
            {...register("other_require")}
          />
        </div>

        <div className={classes.field}>
          <Button type="submit" variant="contained" color="primary" >Tạo phòng</Button>
        </div>
      </form>
    </div>
  );
}

export default CreateRoom;