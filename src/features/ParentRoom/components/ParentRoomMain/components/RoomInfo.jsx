import { Avatar, makeStyles } from '@material-ui/core';
import { subject } from 'components/Room/picture';
import PropTypes from 'prop-types';
import React from 'react';
import { AiOutlineComment } from 'react-icons/ai';
import { FcDocument, FcHome, FcPlanner } from "react-icons/fc";
import { GiTeacher } from 'react-icons/gi';
import { IoMaleFemaleOutline } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

RoomInfo.propTypes = {
    roomDetail: PropTypes.object,
};

function RoomInfo( {roomDetail, onClose} ) {
    const classes = useStyles();
    const history = useHistory();
    const renderDay = (daysStr) => {
        if(!daysStr || daysStr === "") return ;
        let days = [];
        for(let i = 0; i<daysStr.length; i++) {
        const number = Number(daysStr[i]);
            if(number >=2 && number <= 8) {
                days.push(number);
            }
        }
        return (
            <ul className={classes.days}>
                {days.map((day)=> (
                   <li>{day}</li> 
                ))}
            </ul>
        )
    }
    const typeTutorString = (type) => {
        if(!type) return;
        if(type === "Giao Vien, Sinh Vien") {
            return "Giáo viên, Sinh viên";
        } else if (type === "Giao Vien") {
            return "Giáo viên";
        } else if (type === "Sinh Vien") {
            return "Sinh viên"
        }
    }
    const sexTutorString = (sex) => {
        if(!sex) return;
        if(sex === "NU, NAM") {
            return "Gia sư nam, Gia sư nữ";
        } else if (sex === "NAM") {
            return "Gia sư nam";
        } else if (sex === "NU") {
            return "Gia sư nữ"
        }
    }
    const handleShowParentProfile = (id) => {
        history.push(`/profile/parent/${id}`)
    }
    return (
        <div className={classes.root}>
            <div className={classes.comment} onClick={()=> onClose()}><AiOutlineComment />bình luận</div>
            <div className={classes.parent} onClick={() => handleShowParentProfile(roomDetail.parent.id)}>
                <Avatar src={roomDetail.parent.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_3I4Y2ydmFBosgWcdoqVBBCsYZksWAhHtjg&usqp=CAU"}/>
            </div>
            <div className={classes.item}>
                <div className={classes.main}>
                    <img className={classes.img} 
                        src={subject[roomDetail.subject] || subject["Mặc Định"]} 
                        alt="môn học" 
                    />
                    <div className={classes.subject}>
                        <h1>{roomDetail.subject} <span>{roomDetail.lop}</span></h1>
                        <h5>{roomDetail.pricemodel_set} đồng / buổi - {roomDetail.timeoneday} giờ</h5>
                    </div>
                </div>
            </div>
            <div className={classes.item}>
                <div className={classes.detail}>
                    <div>
                        <span>
                            <FcHome />
                        </span> 
                        <h4>{roomDetail.address}</h4>
                    </div>
                    <div>
                        <span>
                            <GiTeacher />
                        </span> 
                        <h4>{typeTutorString(roomDetail.typeteacher)}</h4>
                    </div>
                    <div>
                        <span>
                            <IoMaleFemaleOutline />
                        </span> 
                        <h4>{sexTutorString(roomDetail.sexteacher)}</h4>
                    </div>
                    <div>
                        <span>
                            <FcPlanner />
                        </span>
                        <div> 
                            {renderDay(roomDetail.day_can_teach)} 
                        </div>   
                    </div>
                    <div>
                        <span>
                            <FcDocument />
                        </span> 
                        <h4>2 năm kinh nghiệm trở lên</h4> 
                    </div>
                </div>    
            </div>
        </div>
    );
}
const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        position: 'relative',
    },
    item: {
        padding: "8px 0px",
        marginTop: '12px',
        paddingBottom: '12px',
    },
    main: {
        height: "100%",
        borderRadius: "4px",
        display: 'flex',
        alignItems: 'center',
        "& h1": {
            fontSize: '46px',
            fontWeight: '600',
            margin: 0,
            "& span": {
                fontSize: '56px',
            }
        },
        '& h5': {
            margin: 0,
            marginLeft: '8px',
            fontSize: '20px',
            fontWeight: 200,
        }
    },
    img: {
        width: '120px',
        marginLeft: "36px",
        marginRight: "24px",
    },
    subject: {
        height: '120px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    detail: {
        marginLeft: '48px',
        lineHeight: 1.5,
        "& div" : {
            display: 'flex',
            alignItems: 'center',
            marginBottom: "8px",
            "& h4": {
                margin: 0,
                flex: 12,
                fontWeight: 500,
            },
            "& div": {
                flex: 12,
            },
            "& span": {
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                marginRight: '20px',
                "& svg": {
                    marginRight: '4px',
                    color: '#F76E5F',
                },
                "& h5": {
                    margin: 0,
                    fontWeight: 400,
                    color: 'black',
                }
                
            }
        }
    },
    days: {
        display: 'flex',
        padding: 0,
        margin: 0,
        "& li": {
            'list-style-type': 'none',
            width: '24px',
            height: '24px',
            marginRight: '4px',
            backgroundColor: '#F44336',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            borderRadius: '50%',
        }
    },
    parent: {
        position: 'absolute',
        top: '4px',
        right: '8px',
        opacity: '0.6',
        "&:hover": {
            opacity: 1,
            cursor: 'pointer',
        }
    },
    comment: {
        position: 'absolute',
        bottom: 4,
        right: 4,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#C3C8E8',
        padding: '4px',
        borderRadius: '24px',
        fontSize: '12px',
        opacity: 0.8,
        "&:hover": {
            opacity: 1,
            cursor: "pointer",
        }
    }
})

export default RoomInfo;