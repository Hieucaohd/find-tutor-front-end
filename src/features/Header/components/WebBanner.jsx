import { makeStyles } from '@material-ui/core/styles';
import { isSignedIn } from 'features/auth/cookies';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#E1EEFE',
        display: 'flex',
        marginBottom: '-40px',
        position: 'relative',

        [theme.breakpoints.down('xs')]: {
            paddingBottom: '20px',
            flexDirection: 'column',
            height: 440,
            paddingTop: 40,

        },
        [theme.breakpoints.up('sm')]: {
            padding: '0px 20px',
            paddingTop: 16,
            height: 400,
        },
        alignItems: 'center',
        justifyContent: 'center',
        "& img": {
            [theme.breakpoints.down('xs')]: {
                width: "316px",
              },
              [theme.breakpoints.up('sm')]: {
                width: '40%',
                marginRight: 24,
            },
            [theme.breakpoints.up('md')]: {
            },
            // position: 'absolute',
            
            bottom: 0,
        },
        "& h3": {
            [theme.breakpoints.down('sm')]: {
                fontSize: '20px',

              },
              [theme.breakpoints.up('md')]: {
                fontSize: '32px',
            },
            "& span": {
                color: "#5472EA",
            },
            margin: "16px 0",
        },
        "& h4": {
            margin: 0,
            marginBottom: 16,
            fontWeight: 500,
        },
        "& a": {
        },
        "& button": {
            border: 'none',
            backgroundColor: 'white',
            padding: '15px',
            fontWeight: 800,
            fontSize: '16px',
            borderRadius: '4px',
            opacity: 0.8,
            color: '#5472EA',
            "&:hover": {
                cursor: "pointer",
                opacity: 1,
            }
        }
    },
    slogan: {
        [theme.breakpoints.up('md')]: {
            // position: 'absolute',
            left: 48
        },
    },
}))

function Banner(props) {
    const classes = useStyles(isSignedIn());
    return (
        <div className={classes.root}>
            <img src={require("../../../assets/image/banner1.webp").default} alt="banner" />
            
            <div className={classes.slogan}>
                <h3>Bạn muốn kiếm <span>công việc gia sư</span> 
                <br/>
                hoặc <span>thuê gia sư</span> ?</h3>
                
                <h4>Đăng kí tài khoản ngay </h4>
                
                <Link to="/signup">
                    <button className={classes.button}>
                        Đăng kí tài khoản
                    </button>
                </Link>
            </div>
            
        </div>
    );
}

export default Banner;