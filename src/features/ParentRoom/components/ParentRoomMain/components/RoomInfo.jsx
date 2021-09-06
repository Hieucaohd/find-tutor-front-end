import { makeStyles } from '@material-ui/core';
import { subject } from 'components/Room/picture';
import PropTypes from 'prop-types';
import React from 'react';
import { FcDocument, FcHome, FcPlanner } from "react-icons/fc";

RoomInfo.propTypes = {
    roomDetail: PropTypes.object,
};

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
    },
    item: {
        flex: 1,
        padding: "8px",
        paddingBottom: '12px',
    },
    main: {
        height: "100%",
        borderRadius: "4px",
        display: 'flex',
        alignItems: 'center',
        "& h1": {
            fontSize: '46px',
            fontWeight: '200',
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
            "& h4": {
                margin: 0,
                flex: 4,
                fontWeight: 500,
            },
            "& div": {
                flex: 4,
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
    }
})

function RoomInfo( {roomDetail} ) {
    const classes = useStyles();
    
    const renderDay = (days) => {
        if(!days || days.length ===0) return;
        return (
            <ul className={classes.days}>
                {days.map((day)=> (
                   <li>{day}</li> 
                ))}
            </ul>
        )
    }

    return (
        <div className={classes.root}>
            <div className={classes.item}>
                <div className={classes.main}>
                    <img className={classes.img} 
                        src={subject[roomDetail.subject] || subject["Mặc Định"]} 
                        alt="môn học" 
                    />
                    <div className={classes.subject}>
                        <h1>{roomDetail.subject} <span>{roomDetail.lop}</span></h1>
                        <h5>150.000đ</h5>
                    </div>
                </div>
            </div>
            <div className={classes.item}>
                <div className={classes.detail}>
                    <div>
                        <span>
                            <FcHome />
                            <h5>Địa chỉ</h5>
                        </span> 
                        <h4>{roomDetail.address}</h4>
                    </div>
                    <div>
                        <span>
                            <FcPlanner />
                            <h5>Ngày dạy</h5>
                        </span>
                        <div> 
                            {renderDay(roomDetail.day_can_teach)} 
                        </div>   
                    </div>
                    <div>
                        <span>
                            <FcDocument />
                            <h5>Yêu cầu khác</h5>
                        </span> 
                        <h4>2 năm kinh nghiệm trở lên</h4> 
                    </div>
                </div>    
            </div>
        </div>
    );
}

export default RoomInfo;