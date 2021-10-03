import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useState } from 'react';
import "./styles.scss";

function Categories(props) {
    const classes = useStyles();
    const [currentActive, setCurrentActive] = useState(1);
    const handleOnClick = (num) => {
        setCurrentActive(num);
    }
    return (
        <div className={classes.root}>
            <div className={classes.list}>
                <div className={currentActive === 1 ? "currentActive" : ""} onClick={() => handleOnClick(1)}> 
                    {/* <img src="https://i.ibb.co/7YyVn6m/all.png" alt="all"/> */}
                    <h5>Tất cả</h5>
                </div>
                <div className={currentActive === 2 ? "currentActive" : ""} onClick={() => handleOnClick(2) }> 
                    {/* <img src={subject["Toán"]} alt="toán"/> */}
                    <h5>Toán</h5>
                </div>
                <div className={currentActive === 3 ? "currentActive" : ""} onClick={() => handleOnClick(3) }> 
                    {/* <img src={subject["Ngữ Văn"]} alt="văn"/> */}
                    <h5>Ngữ Văn</h5>
                </div>
                <div className={currentActive === 4 ? "currentActive" : ""}  onClick={() => handleOnClick(4) }> 
                    {/* <img src={subject["Tiếng Anh"]} alt="anh"/> */}
                    <h5>Tiếng Anh</h5>
                </div>
                <div className={currentActive === 5 ? "currentActive" : ""}  onClick={() => handleOnClick(5) }> 
                    {/* <img src={subject["Vật Lý"]} alt="vat ly"/> */}
                    <h5>Vật Lý</h5>
                </div>
                <div className={currentActive === 6 ? "currentActive" : ""}  onClick={() => handleOnClick(6) }> 
                    {/* <img src={subject["Hóa Học"]} alt="hoa hoc"/> */}
                    <h5>Hóa Học</h5>
                </div>
                <div className={currentActive === 7 ? "currentActive" : ""} onClick={() => handleOnClick(7) }> 
                    {/* <img src={subject["Sinh Học"]} alt="sinh"/> */}
                    <h5>Sinh Học</h5>
                </div>
                <div className={currentActive === 8 ? "currentActive" : ""} onClick={() => handleOnClick(8) }> 
                    {/* <img src={subject["Lịch Sử"]} alt="su"/> */}
                    <h5>Lịch Sử</h5>
                </div>
                <div className={currentActive === 9 ? "currentActive" : ""} onClick={() => handleOnClick(9) }> 
                    {/* <img src={subject["Địa Lý"]} alt="dia ly"/> */}
                    <h5>Địa Lý</h5>
                </div>
                <div className={currentActive === 10 ? "currentActive" : ""} onClick={() => handleOnClick(10) }> 
                    {/* <img src={subject["Tiếng Việt"]} alt="tieng viet"/> */}
                    <h5>Tiếng Việt</h5>
                </div>
            </div>
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        // width: "100%",
        overflow: "auto",
    },
    list: {
        display: "flex",
        [theme.breakpoints.down('sm')]: {
            width: "760px",
          },
        [theme.breakpoints.up('md')]: {
        },
        "& div": {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            width: 80,
            margin: "4px 0px",
            height: 32,
            marginRight: 2,
            // boxShadow: '0 1px 4px 0 #ccc',
            opacity: '0.7',
            // backgroundColor: 'white',
            "&:hover": {
                opacity: "1",
                cursor: 'pointer',
            }
        },
        "& img": {
            width: '24px',
            height: '24px',
            marginBottom: 8,
        },
        "& h5": {
            margin: 0,
            fontSize: 13,
            color: "#535353",
        }
    },
    
}))

export default Categories;