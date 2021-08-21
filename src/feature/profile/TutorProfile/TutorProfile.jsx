import { Avatar, Grid, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import "./styles.scss";
import { FaBirthdayCake } from "react-icons/fa";
import { AiFillMail, AiFillFacebook } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { useEffect } from 'react';
import { formatBirthDay, getTutorProfile } from '../profile';

const useStyles = makeStyles({
    root: {},
    avatar: {
        width: 300,
        height: 300,
    }

  });

function TutorProfile(props) {
    const match = useRouteMatch();
    const tutorId = Number(match.params.tutorId);
    const classes = useStyles();
    const [tutorInfo, setTutorInfo] = useState({});

    useEffect( () => {
        const getUserInfo = async () => {
            const info = await getTutorProfile( {id: tutorId});
            setTutorInfo(info);
        }
        getUserInfo();
    }, [])
    const getTeachLevelString = (arr) => {
        if(!arr || arr.length === 0) {
            return "";
        }
        const ans = arr.map( (item) => {
            return `Cấp ${item}`
        })
        return ans.join(', ')
    }
    return (
        <div className="tutor"> 
            <div className="tutor__wallpaper">
                <Avatar alt="Travis Howard" className={classes.avatar} src="https://laptrinhcuocsong.com/images/lap-trinh-vien.png" />
                <h3 className="tutor__wallpaper__name">{tutorInfo.first_name} {tutorInfo.last_name}</h3>
                <div className="tutor__wallpaper__more">
                    <div className="tutor__wallpaper__more__field">
                       <BsFillPersonFill /> 
                       <div>Nam</div>
                    </div>
                    <div className="tutor__wallpaper__more__field"> 
                        <FaBirthdayCake /> 
                        <div>{formatBirthDay(tutorInfo.birthday)}</div>
                    </div>
                    <div className="tutor__wallpaper__more__field"> 
                        <AiFillFacebook /> 
                        <a href="#">facebook.com/abcabc</a>
                    </div>
                    <div className="tutor__wallpaper__more__field"> 
                        <AiFillMail />
                        <div> abc@gmail.com</div>
                    </div>     
                </div>
            </div>

            <div className="tutor__profile">
                <div> 
                    <p className="tutor__profile__field"> 
                        <span className="tutor__profile__field__label">Nghề Nghiệp:     
                            <div className="tutor__profile__field__label__line"></div>
                        </span> 
                          {tutorInfo.profession === 'sv' 
                            ? <div>Sinh Viên</div> : <div>Giáo Viên</div>}
                    </p>
                </div>
                <div> 
                    <p className="tutor__profile__field"> 
                        <span className="tutor__profile__field__label">Học Vấn:     
                            <div className="tutor__profile__field__label__line"></div>
                        </span> 
                          {tutorInfo.university}
                    </p>
                </div>
                <div> 
                    <p className="tutor__profile__field"> 
                        <span className="tutor__profile__field__label">Khu vực dạy:     
                            <div className="tutor__profile__field__label__line"></div>
                        </span> 
                          {tutorInfo.khu_vuc_day}
                    </p>
                </div>
                <div> 
                    <p className="tutor__profile__field"> 
                        <span className="tutor__profile__field__label">Thành tích:     
                            <div className="tutor__profile__field__label__line"></div>
                        </span> 
                          Từng đại giải quốc gia môn toán
                    </p>
                </div>
                <div> 
                    <p className="tutor__profile__exp"> 
                        <span className="tutor__profile__exp__label">Kinh nghiệm:     
                            <div className="tutor__profile__exp__label__line"></div>
                        </span> 
                        <ul> 
                            <li>{tutorInfo.experience}</li>
                        </ul>
                    </p>
                </div>
                <div> 
                    <p className="tutor__profile__field"> 
                        <span className="tutor__profile__field__label">Cấp dạy:     
                            <div className="tutor__profile__field__label__line"></div>
                        </span> 
                          {getTeachLevelString(tutorInfo.cap_day)}
                    </p>
                </div>
                <div> 
                    <p className="tutor__profile__more"> 
                        <span className="tutor__profile__more__label">Mô tả thêm về bản thân:     
                            <div className="tutor__profile__more__label__line"></div>
                        </span> 
                          <p> 
                          
                          </p>
                    </p>
                </div>
            </div>
        </div>
        
    );
}

export default TutorProfile;