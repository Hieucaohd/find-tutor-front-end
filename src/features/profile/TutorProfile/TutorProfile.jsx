import { Avatar, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { AiFillFacebook, AiFillMail } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { FaBirthdayCake } from "react-icons/fa";
import { useRouteMatch } from 'react-router-dom';
import { formatBirthDay, getTutorProfile } from '../profile';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
        marginTop: '56px',
    },
    avatar: {
        
        [theme.breakpoints.down('sm')]: {
            width: 100,
            height: 100,
        },
        [theme.breakpoints.up('md')]: {
            width: 300,
            height: 300,
        },
    },
    wallpaper: {
        flex: 1,
        height: '100vh',
        backgroundColor: '#E9EBEE',
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: '24px 16px',
        },
        [theme.breakpoints.up('md')]: {
            flexDirection: 'column',
            justifyContent: 'center',
        },
        alignItems: 'center',
    },
    avatarCenter: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    wallpaperHead: {
        fontSize: '14px',
        fontWeight: 300,
        width: '160px',
    },
    wallpaperField: {
        display: 'flex',
        alignItems: 'center',
        '& svg': {
            marginRight: '4px',
            color: '#7E86B8',
        },
        '& a': {
            color: 'black',
            textDecoration: 'none',
        }
    },
    profile: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        [theme.breakpoints.down('sm')]: {
            padding: '0px 40px',
        },
        [theme.breakpoints.up('md')]: {
            padding: '50px 70px',
        },
    },
    profileField: {
        display: 'flex',
    },
    label: {
        marginRight: '8px',
        color: '#262D61',
    },
    profileLine: {
        marginTop: '2px',
        height: '0px',
        background: '#C4C4C4',
        border: '2px solid #9EA7E6',
    },
    experience: {
        display: 'flex',
        flexDirection: 'column',
    },
    expLine: {
        width: '90px',
        marginTop: '2px',
        height: '0px',
        background: '#C4C4C4',
        border: '2px solid #9EA7E6',
    },
    more: {
        display: 'flex',
        flexDirection: 'column',
    },
    moreLine: {
        width: '165px',
        marginTop: '2px',
        height: '0px',
        background: '#C4C4C4',
        border: '2px solid #9EA7E6',
    },
    name: {
        fontWeight: 400,
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            fontSize: '20px',
            margin: 0,
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '24px',
        },
    }
}));

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
        <div className={classes.root}> 
            <div className={classes.wallpaper}>
                <div className={classes.avatarCenter}>
                <Avatar alt="Travis Howard" className={classes.avatar} src="https://laptrinhcuocsong.com/images/lap-trinh-vien.png" />
                <h3 className={classes.name}>{tutorInfo.first_name} {tutorInfo.last_name}</h3>
                </div>
                <div className={classes.wallpaperHead}>
                    <div className={classes.wallpaperField}>
                       <BsFillPersonFill /> 
                       <div>Nam</div>
                    </div>
                    <div className={classes.wallpaperField}> 
                        <FaBirthdayCake /> 
                        <div>{formatBirthDay(tutorInfo.birthday)}</div>
                    </div>
                    <div className={classes.wallpaperField}> 
                        <AiFillFacebook /> 
                        <a href="#">facebook.com/abcabc</a>
                    </div>
                    <div className={classes.wallpaperField}> 
                        <AiFillMail />
                        <div> abc@gmail.com</div>
                    </div>     
                </div>
            </div>

            <div className={classes.profile}>
                <div> 
                    <p className={classes.profileField}> 
                        <span className={classes.label}>Nghề Nghiệp:     
                            <div className={classes.profileLine}></div>
                        </span> 
                          {tutorInfo.profession === 'sv' 
                            ? <div>Sinh Viên</div> : <div>Giáo Viên</div>}
                    </p>
                </div>
                <div> 
                    <p className={classes.profileField}> 
                        <span className={classes.label}>Học Vấn:     
                            <div className={classes.profileLine}></div>
                        </span> 
                          {tutorInfo.university}
                    </p>
                </div>
                <div> 
                    <p className={classes.profileField}> 
                        <span className={classes.label}>Khu vực dạy:     
                            <div className={classes.profileLine}></div>
                        </span> 
                          {tutorInfo.khu_vuc_day}
                    </p>
                </div>
                <div> 
                    <p className={classes.profileField}> 
                        <span className={classes.label}>Thành tích:     
                            <div className={classes.profileLine}></div>
                        </span> 
                          Từng đại giải quốc gia môn toán
                    </p>
                </div>
                <div> 
                    <p className={classes.experience}> 
                        <span className={classes.label}>Kinh nghiệm:     
                            <div className={classes.expLine}></div>
                        </span> 
                        <ul> 
                            <li>{tutorInfo.experience}</li>
                        </ul>
                    </p>
                </div>
                <div> 
                    <p className={classes.profileField}> 
                        <span className={classes.label}>Cấp dạy:     
                            <div className={classes.profileLine}></div>
                        </span> 
                          {getTeachLevelString(tutorInfo.cap_day)}
                    </p>
                </div>
                <div> 
                    <p className={classes.more}> 
                        <span className={classes.label}>Mô tả thêm về bản thân:     
                            <div className={classes.moreLine}></div>
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