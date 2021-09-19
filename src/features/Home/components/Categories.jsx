import { makeStyles } from '@material-ui/core';
import { gradientColor } from "components/Room/color";
import { subject } from "components/Room/picture";
import React from 'react';
Categories.propTypes = {
    
};

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        height: 104,
        overflow: "auto",
        marginBottom: '32px',
    },
    list: {
        display: "flex",
        [theme.breakpoints.down('sm')]: {
            width: "900px",
            height: 100,
          },
        [theme.breakpoints.up('md')]: {
        },

        "& img": {
            width: '40px',
            height: '40px',
            marginBottom: 8,
        },
        "& h5": {
            margin: 0
        }
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginRight: 16,
        width: 80,
        height: 92,
        border: '1px solid rgba(0,0,0,0.1)',
        opacity: '0.7',
        "&:hover": {
            opacity: "1",
            cursor: 'pointer',
        }
    }
}))

function Categories(props) {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <div className={classes.list}>
                <div className={`${classes.item} active`} > 
                    <img src="https://i.ibb.co/7YyVn6m/all.png" alt="all"/>
                    <h5>Tất cả</h5>
                </div>
                <div className={classes.item} > 
                    <img src={subject["Toán"]} alt="toán"/>
                    <h5>Toán</h5>
                </div>
                <div className={classes.item} > 
                    <img src={subject["Ngữ Văn"]} alt="văn"/>
                    <h5>Ngữ Văn</h5>
                </div>
                <div className={classes.item} > 
                    <img src={subject["Tiếng Anh"]} alt="anh"/>
                    <h5>Tiếng Anh</h5>
                </div>
                <div className={classes.item}> 
                    <img src={subject["Vật Lý"]} alt="vat ly"/>
                    <h5>Vật Lý</h5>
                </div>
                <div className={classes.item}> 
                    <img src={subject["Hóa Học"]} alt="hoa hoc"/>
                    <h5>Hóa Học</h5>
                </div>
                <div className={classes.item}> 
                    <img src={subject["Sinh Học"]} alt="sinh"/>
                    <h5>Sinh Học</h5>
                </div>
                <div className={classes.item}> 
                    <img src={subject["Lịch Sử"]} alt="su"/>
                    <h5>Lịch Sử</h5>
                </div>
                <div className={classes.item}> 
                    <img src={subject["Địa Lý"]} alt="dia ly"/>
                    <h5>Địa Lý</h5>
                </div>
                <div className={classes.item}> 
                    <img src={subject["Tiếng Việt"]} alt="tieng viet"/>
                    <h5>Tiếng Việt</h5>
                </div>
            </div>
        </div>
    );
}

export default Categories;