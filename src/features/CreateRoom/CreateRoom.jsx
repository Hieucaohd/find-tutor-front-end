import { createTheme, makeStyles } from "@material-ui/core";
import Loading from "components/Loading/Loading";
import Location from "components/location/Location";
import { CreateParentRoom } from "graphql/mutationGraphQl";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectId_of_user, selectToken } from "../auth/authSlice";


const useStyles = makeStyles(theme => ({
  root: { 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    [theme.breakpoints.down('sm')]: {
      marginTop: 60,
    },
    [theme.breakpoints.up('md')]: {
      marginTop: "100px",
    },
    "& label": {
      fontSize: '12px',
      fontWeight: '500',
    },
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
    [theme.breakpoints.up('md')]: {
      width: '500px',
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
      display: 'flex',
      alignItems: 'center',
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
  },
  select: {
    padding: '8px 16px',
    borderRadius: '64px',
    border: '1px solid #ccc',
  },
}));

function CreateRoom(props) {
  const classes = useStyles();
  const days = [2, 3, 4, 5, 6, 7, 8];
  const history = useHistory();
  const token = useSelector(selectToken);
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [location, setLocation] = useState({
    province: 0,
    district: 0,
    ward: 0
  })
  const id = useSelector(selectId_of_user)
  const loadingRef = useRef(null);

  const handleGetLocation = (data) => {
    setLocation(data);
  }

  //handle submit
  const onSubmit = async (data) => {
    console.log(data);
    // get day can teach
    let dayCanTeach = []
    for(let i = 2; i<9; i++) {
      if(data[i]){
        dayCanTeach.push(i);
      }
    }
    const getTypeTeacher = (str) => {
      if(str === 'both') {
        return ["sv", "gv"];
      } else if (str === 'sv') {
        return ["sv"];
      } 
      return ["gv"];
    }
    const getGender = (str) => {
      if(str === 'both') {
        return ["nam", "nu"];
      } else if (str === 'nam') {
        return ["nam"];
      }
      return ["nu"];
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
      "time_in_one_day": Number(data.hours),
      "money_per_day": Number(data.price) < 1000 ? Number(data.price)*1000 : Number(data.price),
      "type_teacher": getTypeTeacher(data.job),
      "sex_of_teacher": getGender(data.gender),
    };

    
    try {
      loadingRef.current.style.display = "flex";
      await CreateParentRoom({token: token, roomInfo: roomInfor});
      history.push(`/parentInfo/${id}`)
    } catch (error){
      loadingRef.current.style.display = "none";
      console.log(error);
    }
  }

  return (
    <div className={classes.root}>
      <div ref={loadingRef} style={{display: 'none'}}>
        <Loading />
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
          <select name="subject" className={classes.select} {...register("subject", { required: true })}>
            <option value="Toán ">Toán</option>
            <option value="Ngữ Văn">Ngữ Văn</option>
            <option value="Hóa Học">Hóa Học</option>
            <option value="Vật Lý">Vật Lý</option>
            <option value="Sinh Học">Sinh Học</option>
            <option value="Địa Lý">Địa Lý</option>
            <option value="Lịch Sử">Lịch Sử</option>
            <option value="Tiếng Việt">Tiếng Việt</option>
          </select>
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
            <label>Giá tiền mỗi buổi (nghìn đồng)</label>
            <input 
              name="price" 
              type="number"
              {...register("price", { required: true })}
            />
            <span className={classes.error}>{errors.price && "Cần nhập giá tiền"}</span>
        </div>
        <div className={classes.field}>
            <label>Số giờ dạy mỗi buổi</label>
            <input 
              name="hours" 
              type="number"
              {...register("hours")}
            />
            <span className={classes.error}>{errors.hours && "Cần nhập số giờ"}</span>
        </div>
        <div className={classes.field}>
            <label>Giới tính gia sư</label>
            <select name="gender" className={classes.select} {...register("gender")}>
              <option value="both">Không</option>
              <option value="nam">Nam</option>
              <option value="nu">Nữ</option>
            </select>
        </div>
        <div className={classes.field}>
            <label>Loại gia sư</label>
            <select name="job" className={classes.select} {...register("job")}>
              <option value="both">Cả 2</option>
              <option value="sv">Sinh viên</option>
              <option value="gv">Giáo viên</option>
            </select>
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
            <span className={classes.error}>{errors.detailLocation && "Cần nhập chi tiết địa chỉ"}</span>
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