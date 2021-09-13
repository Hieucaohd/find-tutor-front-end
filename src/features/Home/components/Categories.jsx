import React from 'react';
import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import { subject } from "components/Room/picture";
import { gradientColor } from "components/Room/color";
Categories.propTypes = {
    
};

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        overflow: "auto",
        height: "36px",
    },
    list: {
        display: "flex",
        margin: "0px 12px",
        justifyContent: "space-between",
        [theme.breakpoints.down('sm')]: {
            width: "1090px",
          },
          [theme.breakpoints.up('md')]: {
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
        borderRadius: '12px',
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
                <div className={classes.item} style={{"background-image": gradientColor["Toán"]}}> 
                    <img src={subject["Toán"]}/>
                    <h5>Toán</h5>
                </div>
                <div className={classes.item} style={{"background-image": gradientColor["Ngữ Văn"]}}> 
                    <img src={subject["Ngữ Văn"]}/>
                    <h5>Ngữ Văn</h5>
                </div>
                <div className={classes.item} style={{"background-image": gradientColor["Tiếng Anh"]}}> 
                    <img src={subject["Tiếng Anh"]}/>
                    <h5>Tiếng Anh</h5>
                </div>
                <div className={classes.item} style={{"background-image": gradientColor["Vật Lý"]}}> 
                    <img src={subject["Vật Lý"]}/>
                    <h5>Vật Lý</h5>
                </div>
                <div className={classes.item} style={{"background-image": gradientColor["Hóa Học"]}}> 
                    <img src={subject["Hóa Học"]}/>
                    <h5>Hóa Học</h5>
                </div>
                <div className={classes.item} style={{"background-image": gradientColor["Sinh Học"]}}> 
                    <img src={subject["Sinh Học"]}/>
                    <h5>Sinh Học</h5>
                </div>
                <div className={classes.item} style={{"background-image": gradientColor["Lịch Sử"]}}> 
                    <img src={subject["Lịch Sử"]}/>
                    <h5>Lịch Sử</h5>
                </div>
                <div className={classes.item} style={{"background-image": gradientColor["Địa Lý"]}}> 
                    <img src={subject["Địa Lý"]}/>
                    <h5>Địa Lý</h5>
                </div>
                <div className={classes.item} style={{"background-image": gradientColor["Tiếng Việt"]}}> 
                    <img src={subject["Tiếng Việt"]}/>
                    <h5>Tiếng Việt</h5>
                </div>
            </div>
        </div>
    );
}

export default Categories;