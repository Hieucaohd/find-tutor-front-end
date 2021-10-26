import { Avatar, makeStyles } from '@material-ui/core';
import { catchDistrictName, catchProvinceName } from 'components/location/getLocation';
import { largerSubject } from 'components/Room/picture';
import { handleTime } from 'containers/date';
import { isOnList } from 'features/ParentRoom/parentroom';
import React from 'react';
import { FaBorderAll, FaCalendarDay, FaRegClock, FaTransgender } from "react-icons/fa";
import { MdAccessTime, MdAttachMoney, MdLocationOn, MdPerson, MdToday } from "react-icons/md";
import { useHistory } from 'react-router-dom';

function RoomInfo( {room, applyList, userId, addToApplyList, typeParent, teaching} ) {
    const classes = useStyles();
    const history = useHistory();
    const {provinceName, districtName, wardName} = room?.address;
    const getDayString = (daysStr) => {
        if(!daysStr || daysStr === "") return ;
        let days = "Thứ ";
        for(let i = 0; i<daysStr.length; i++) {
            days = days + daysStr[i] + ' ';
        }
        return days
    }
    const formatPriceString = (price) => {
        if(!price) return;
        const priceString = price.toString();
        let ans = "";
        const len = priceString.length;
        let count = 0;
        for(let i = len - 1; i >= 0; i--) {
          count++;
          ans = priceString[i] + ans;
          if(count % 3 ===0 && count !== len) {
            ans = "." + ans
          }
        }
        return ans;
    }
    const typeTutorString = (type) => {
        if(!type) return;
        if(type === "Giao Vien, Sinh Vien") {
            return null;
        } else if (type === "Giao Vien") {
            return "Giáo viên";
        } else if (type === "Sinh Vien") {
            return "Sinh viên"
        }
    }
    const sexTutorString = (sex) => {
        if(!sex) return;
        if(sex === "NU, NAM") {
            return null;
        } else if (sex === "NAM") {
            return "Gia sư nam";
        } else if (sex === "NU") {
            return "Gia sư nữ"
        }
    }
    const handleShowParentProfile = (id) => {
        history.push(`/profile/parent/${id}`)
    }
    const handleAddToApplyList = () => {
        addToApplyList();
    }
    return (
        <div className={classes.root}>
            <div className={classes.room}>
            <div className={classes.header}>
                <img src={largerSubject[room.subject.trim()].default || largerSubject["Mặc Định"].default} alt="mon hoc"/>
                <div className={classes.info}>
                    <h3>{room?.subject} {room?.lop}</h3>
                    <h4>{`${wardName ? `${wardName},` : ""} ${districtName ? `${catchDistrictName(districtName)},` : ""} ${ provinceName ? `${catchProvinceName(provinceName)}` : "" }`}</h4>
                    <div className={classes.infoField}>
                        <MdAttachMoney />
                        <span>{formatPriceString(room?.pricemodel_set)} đ/buổi</span>
                    </div>
                    {sexTutorString(room?.sexteacher) && <div className={classes.infoField}>
                        <FaTransgender />
                        <span>{sexTutorString(room?.sexteacher)}</span>
                    </div>}
                    {typeTutorString(room?.typeteacher) && <div className={classes.infoField}>
                        <MdPerson />
                        <span>{typeTutorString(room?.typeteacher)}</span>
                    </div>}
                    <div className={classes.infoField}>
                        <FaRegClock />
                        <span>{room?.timeoneday} tiếng/buổi</span>
                    </div>
                    <div className={classes.infoField}>
                        <MdToday />
                        <span>{getDayString(room?.day_can_teach)}</span>
                    </div>
                    <div className={classes.time}>
                        <MdAccessTime /> Được đăng {handleTime(room?.create_at)}
                    </div>
                    <div>
                        {(!isOnList(userId, applyList) && !teaching && !typeParent) && <button className={classes.apply} onClick={handleAddToApplyList}>Ứng tuyển</button>}
                    </div>
                </div>
            </div>
            <div>
                <h4>Yêu cầu khác</h4>
                <p>{room?.other_require === "" ? "Không" : room?.other_require }</p>
            </div>
            </div>
            <div className={classes.parentInfo}>
                <div className={classes.parent}>
                    <h4>Chủ phòng</h4>
                    <div className={classes.parentHeader}>
                        <Avatar src={room?.parent?.avatar || null}/>
                        <div>
                            <h5>{room?.parent?.first_name} {room?.parent?.last_name}</h5>
                            <span>{room?.parent?.username}</span>
                        </div>
                    </div>
                    
                    <div className={classes.infoField}>
                        <MdLocationOn />
                        <span>{room?.parent?.address}</span>
                    </div>
                    <div className={classes.infoField}>
                        <FaCalendarDay />
                        <span>{room?.parent?.birthday.slice(0,4)}</span>
                    </div>
                    <div className={classes.infoField}>
                        <FaBorderAll />
                        <span>Đã tạo 3 phòng</span>
                    </div>
                    <h5 className={classes.parentTime}>Tham gia 3 tháng trước</h5>
                    <button onClick={() => handleShowParentProfile(room.parent.id)}>Xem chi tiết</button>
                </div>
            </div>
            
        </div>
    );
}
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 32,
        },
        borderBottom: '1px solid #ccc',
    },
    header: {
        display: 'flex',
        marginBottom: 16,
        marginTop: 20,
        [theme.breakpoints.down('xs')]: {
            alignItems: 'flex-start',
        },
        [theme.breakpoints.up('sm')]: {
            alignItems: 'center',
        },
        flex: 3,
        "& img": {
            marginTop: 8,
            [theme.breakpoints.down('xs')]: {
                width: 40,
                height: 40,
                marginRight: 12,
              },
              [theme.breakpoints.up('sm')]: {
                width: 140,
                height: 140,
                marginRight: 28,
              },
        },
        "& h1": {
            margin: 0,
        },
        "& h2": {
            margin: 0,
        }
    },
    // room: {
    //     flex: 3,
    // },
    parentInfo: {
        marginBottom: 30,
        marginTop: 20,
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        "& h3": {
            margin: 0,
            fontSize: 28,
            fontWeight: 500,
            marginLeft: 4,
        },
        "& h4": {
            margin: 0,
            fontWeight: 400,
            marginLeft: 4,
            marginBottom: 16,
        }
    },
    infoField: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 4,
        fontSize: 16,
        fontWeight: 400,
        "& svg": {
            marginRight: 8,
            color: "#777777",
        }
    },
    time: {
        marginTop: 20,
        marginBottom: 16,
        display: 'flex',
        alignItems: 'center',
        color: "#777777",
        fontSize: 14,
        "& svg": {
            marginRight: 4,
            color: "#777777",
            fontSize: 16,
        }
    },
    apply: {
        border: 'none',
        backgroundColor: '#0061FF',
        color: 'white',
        fontWeight: 600,
        padding: '8px 16px',
        fontSize: 16,
        borderRadius: 4,
        opacity: '0.8',
        "&:hover": {
            opacity: 1,
            cursor: 'pointer',
        }
    },
    parent: {

        width: 220,
        padding: "12px 20px 56px 20px",
        height: 240,  
        flex: 2,
        boxShadow: '0 1px 4px 0 #ccc',
        borderRadius: 4,
        backgroundColor: 'white',
        "& h4": {
            textAlign: 'center',
            margin: 16,
            fontSize: 16,
            borderBottom: '1px solid #ccc',
        },
        "& button": {
            border: 'none',
            backgroundColor: '#d7d5d5',
            borderRadius: 4,
            width: "100%", 
            padding: 8,
            fontSize: 16,
            fontWeight: 600,
            opacity: 0.8,
            "&:hover": {
                opacity: 1,
                cursor: 'pointer',
            }
        }
    },
    parentHeader: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 16,
        "& .MuiAvatar-root": {
            width: 60,
            height: 60,
            marginRight: 8,
        },
        "&>div": {
            "& h5": {
                margin: 0,
                fontSize: 16,
                fontWeight: 500,
                marginBottom: 4,
            },
            "& span": {
                fontSize: 14,
            }
        },
    },
    parentTime: {
        fontSize: 14,
        color: '#777777',
        fontWeight: 400,
        margin: "12px 0px",
    }
}))

export default RoomInfo;