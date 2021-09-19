import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
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
            [theme.breakpoints.down('sm')]: {
                height: '55%',
              },
              [theme.breakpoints.up('md')]: {
                height: '100%',
            },
        },
        "& h3": {
            fontSize: '20px',
            "& span": {
                color: "#0076FE",
            }
        },
        "& h4": {
            margin: 0,
            marginBottom: 8,
        },
        padding: '0px 20px',
        "& button": {
            border: 'none',
            backgroundColor: 'white',
            padding: '15px',
            "& a": {
                color: '#0076FE',
            },
            fontWeight: 800,
            fontSize: '16px',
            borderRadius: '4px',
            opacity: 0.8,
            "&:hover": {
                cursor: "pointer",
                opacity: 1,
            }
        }
    }
}))

function Banner(props) {
    const classes = useStyles(isSignedIn());
    return (
        <div className={classes.root}>
            <div>
                <h3>Bạn muốn kiếm <span>công việc gia sư</span> hoặc <span>thuê gia sư</span> ?</h3>
                
                <h4>Đăng kí tài khoản ngay </h4>
                <button>
                    <Link to="/signin">
                    Đăng kí tài khoản
                    </Link>
                </button>

            </div>
            <img src="https://i.ibb.co/RPjyDCY/homeschooling-hero.png" alt="banner" />
        </div>
    );
}

export default Banner;