import { makeStyles } from '@material-ui/core';
import { subject } from 'components/Room/picture';
import PropTypes from 'prop-types';
import React from 'react';

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
        backgroundColor: "#9EA7E6",
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
        "& span": {
            color: '#5b65a9',
        }
    }
})

function RoomInfo( {roomDetail} ) {
    const classes = useStyles();
    const getDayString = (arr) => {
        if(!arr) return;
        let str = arr.join(", ");
        return str;
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
                <p className={classes.detail}>
                    <span>Địa Điểm:</span> {roomDetail.address}
                    <br/>
                    <span>Ngày dạy:</span> {getDayString(roomDetail.day_can_teach)}
                    <br/>
                    <span>Yêu cầu khác:</span> 2 năm kinh nghiệm trở lên
                </p>    
            </div>
        </div>
    );
}

export default RoomInfo;