import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { isSignedIn } from 'features/auth/cookies';

Banner.propTypes = {
    
};

const useStyles = makeStyles(theme => ({
    root: {
        height: 400,
        backgroundColor: '#E1EEFE',
        display: 'flex',
        marginBottom: '-40px',
        position: 'relative',
        [theme.breakpoints.down('xs')]: {
            paddingTop: '60px',
            flexDirection: 'column',
            justifyContent: 'space-between',
          },
          [theme.breakpoints.up('sm')]: {
            paddingTop: '20px',
        },
        alignItems: 'center',
        justifyContent: 'center',
        "& img": {
            [theme.breakpoints.down('xs')]: {
                height: '46%',
                
              },
              [theme.breakpoints.up('sm')]: {
                height: '76%',
                right: '48px',
            },
            [theme.breakpoints.up('md')]: {
                right: '48px',
            },
            position: 'absolute',
            
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
                color: "#0076FE",
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
        padding: '0px 20px',
        "& button": {
            border: 'none',
            backgroundColor: 'white',
            padding: '15px',
            fontWeight: 800,
            fontSize: '16px',
            borderRadius: '4px',
            opacity: 0.8,
            color: '#0076FE',
            "&:hover": {
                cursor: "pointer",
                opacity: 1,
            }
        }
    },
    slogan: {
        position: "absolute",
        left: 48
    },
    
}))

function Banner(props) {
    const classes = useStyles(isSignedIn());
    return (
        <div className={classes.root}>
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
            <img src="https://i.ibb.co/d4TqFW2/homeschooling-hero.webp" alt="banner" />
        </div>
    );
}

export default Banner;