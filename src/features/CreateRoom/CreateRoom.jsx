import { makeStyles } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import Location from "components/location/Location";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectId_of_user, selectToken } from "../auth/authSlice";
import { addRoom } from "../home/homeSlice";

const useStyles = makeStyles(theme => ({
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
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
    [theme.breakpoints.up('md')]: {
      width: '500px',
    },
    marginBottom: "6px",
    "& label": {
        fontSize: "16px",
    },
    "& input": {
        padding: "8px 16px",
        border: "1px solid #ccc",
        borderRadius: "64px",
    },
  },
  day: {
    display: "flex",
    marginBottom: "6px",
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
    justifyContent: 'space-between',
    label: {
      fontSize: '12px',
      fontWeight: '500',
    }
  },
  dayField: {
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
      display: 'flex',
      alignItems: 'center',
      flexDirection: "column",
      '& label': {
        fontSize: '12px',
      }
    },
    [theme.breakpoints.up('md')]: {
      marginRight: "8px",
    },
    
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
  },
  submit: {
    backgroundColor: '#5037EC',
    color: 'white',
    border: 'none',
    borderRadius: '64px',
    padding: '10px 0px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  }
}));

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
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}> 
        
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
          <button className={classes.submit} type="submit" variant="contained" color="primary" >Tạo phòng</button>
        </div>
      </form>
    </div>
  );
}

export default CreateRoom;