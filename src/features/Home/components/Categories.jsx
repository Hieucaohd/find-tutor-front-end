import { makeStyles } from '@material-ui/core/styles';
import { subject } from "components/Room/picture";
import React from 'react';
Categories.propTypes = {
    
};

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        height: 84,
        overflow: "auto",
        marginBottom: '32px',
    },
    list: {
        display: "flex",
        [theme.breakpoints.down('sm')]: {
            width: "760px",
          },
        [theme.breakpoints.up('md')]: {
        },

        "& img": {
            width: '24px',
            height: '24px',
            marginBottom: 8,
        },
        "& h5": {
            margin: 0,
            fontSize: 12,
        }
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginRight: 16,
        width: 60,
        height: 72,
        boxShadow: '0 1px 4px 0 #ccc',
        opacity: '0.7',
        backgroundColor: 'white',
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