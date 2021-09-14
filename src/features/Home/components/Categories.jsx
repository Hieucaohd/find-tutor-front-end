import React from 'react';
import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import { subject } from "components/Room/picture";
import { chooseColor, gradientColor } from "components/Room/color";
Categories.propTypes = {
    
};

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        overflow: "auto",
        height: "40px",
        marginTop: '8px',
        marginBottom: '20px',
    },
    list: {
        display: "flex",
        justifyContent: "space-between",
        [theme.breakpoints.down('sm')]: {
            width: "1100px",
          },
        [theme.breakpoints.up('md')]: {
            margin: "0px 12px",
        },

        "& img": {
            width: '20px',
            height: '20px',
            marginRight: '2px',
        },
        "& h5": {
            margin: 0
        }
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        padding: '4px 12px',
        margin: '0px 8px',
        borderRadius: '30px',
        border: '0.5px solid rgba(0,0,0,0.1)',
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
                <div className={`${classes.item} active`} style={{"background-color": "#ccc"}}> 
                    <img src="https://i.ibb.co/7YyVn6m/all.png"/>
                    <h5>Tất cả</h5>
                </div>
                <div className={classes.item} style={{"background-color": chooseColor["Toán"]}}> 
                    <img src={subject["Toán"]} alt="toán"/>
                    <h5>Toán</h5>
                </div>
                <div className={classes.item} style={{"background-color": chooseColor["Ngữ Văn"]}}> 
                    <img src={subject["Ngữ Văn"]} alt="văn"/>
                    <h5>Ngữ Văn</h5>
                </div>
                <div className={classes.item} style={{"background-color": chooseColor["Tiếng Anh"]}}> 
                    <img src={subject["Tiếng Anh"]} alt="anh"/>
                    <h5>Tiếng Anh</h5>
                </div>
                <div className={classes.item} style={{"background-color": chooseColor["Vật Lý"]}}> 
                    <img src={subject["Vật Lý"]} alt="vat ly"/>
                    <h5>Vật Lý</h5>
                </div>
                <div className={classes.item} style={{"background-color": chooseColor["Hóa Học"]}}> 
                    <img src={subject["Hóa Học"]}/>
                    <h5>Hóa Học</h5>
                </div>
                <div className={classes.item} style={{"background-color": chooseColor["Sinh Học"]}}> 
                    <img src={subject["Sinh Học"]} alt="sinh"/>
                    <h5>Sinh Học</h5>
                </div>
                <div className={classes.item} style={{"background-color": chooseColor["Lịch Sử"]}}> 
                    <img src={subject["Lịch Sử"]} alt="su"/>
                    <h5>Lịch Sử</h5>
                </div>
                <div className={classes.item} style={{"background-color": chooseColor["Địa Lý"]}}> 
                    <img src={subject["Địa Lý"]} alt="dia ly"/>
                    <h5>Địa Lý</h5>
                </div>
                <div className={classes.item} style={{"background-color": chooseColor["Tiếng Việt"]}}> 
                    <img src={subject["Tiếng Việt"]} alt="tieng viet"/>
                    <h5>Tiếng Việt</h5>
                </div>
            </div>
        </div>
    );
}

export default Categories;