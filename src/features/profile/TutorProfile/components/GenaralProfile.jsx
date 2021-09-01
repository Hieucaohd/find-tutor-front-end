import { Avatar, makeStyles } from '@material-ui/core';
import { catchDistrictName, catchProvinceName } from 'components/location/getLocation';
import { formatBirthDay } from 'features/profile/profile';
import PropTypes from 'prop-types';
import React from 'react';
import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineLinkedin } from 'react-icons/ai';

GenaralProfile.propTypes = {
    TutorInfo: PropTypes.object,
};

const useStyles = makeStyles(theme => ({
    wallpaper: {
        flex: 1,
        height: '100vh',
        display: 'flex',
        padding: '24px 16px',
        "& h5": {
            margin: 0,
        },
        "& h4": {
            margin: 0,
        },
        "& h3": {
            margin: 0,
        },
        "& p": {
            margin: 0,
        }
    },
    
    name: {
        "& h3": {
            fontWeight: 600,
            [theme.breakpoints.down('sm')]: {
                fontSize: '20px',
                margin: 0,
            },
            [theme.breakpoints.up('md')]: {
                fontSize: '28px',
            },
        },
        "& h5": {
            color: '#3b6997',
        }
    },
    social: {
        marginTop: "20px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        "& button": {
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '24px',
            opacity: '0.6',
            "&:hover": {
                opacity: 1,
            }
        }
    },
    avatarContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        [theme.breakpoints.down('sm')]: {
            marginRight: '12px',
        },
        [theme.breakpoints.up('md')]: {
            marginRight: '56px',
        },
    },
    avatar: {
        [theme.breakpoints.down('sm')]: {
            width: '108px',
            height: '180px',
        },
        [theme.breakpoints.up('md')]: {
            width: '180px',
            height:' 220px',
        },
    },
    info: {
        flex: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        "& p": {
            color: '#5f5d5d',
            fontStyle: 'italic',
        },
    },
    generalInfo: {
        display: 'flex',
    },
    birth: {
        marginRight: '40px',
        "& span":{
            color: '#3b6997',
            fontSize: '12px',
            fontWeight: '400',
        }
    },
    address: {
        "& span":{
            color: '#3b6997',
            fontSize: '12px',
            fontWeight: '400',
        }
    },
    social: {
        "& a": {
            opacity: '0.6',
            [theme.breakpoints.down('sm')]: {
                fontSize: '24px',
            },
            [theme.breakpoints.up('md')]: {
                fontSize: '32px',
            },
            "&:hover":{
                color: '#3b6997',
                opacity: 1,
            },
            marginRight: '8px',
        }
    }
}))

const getJobName = (str) => {
    if(!str) return '';
    if(str === 'sv') return 'Sinh Viên';
    else if(str === 'gv') return 'Giáo Viên';
    else return 'Khác';
}

function GenaralProfile({tutorInfo}) {
    const classes = useStyles();
    return (
        <div className={classes.wallpaper}>
            <div className={classes.avatarContainer}>
                <Avatar alt="Travis Howard" variant="square" className={classes.avatar} src="https://laptrinhcuocsong.com/images/lap-trinh-vien.png" />
            </div>
            <div className={classes.info}>
                <div className={classes.name}>
                    <h3 className={classes.name}>{tutorInfo.first_name?.toUpperCase()} {tutorInfo.last_name?.toUpperCase()}</h3>
                    <h5>{getJobName(tutorInfo.profession)}</h5>
                </div>
                <p>Dạy học là đam mê</p>
                <div className={classes.generalInfo}>
                    <div className={classes.birth}>
                        <h4>{formatBirthDay(tutorInfo.birthday)}</h4>
                        <span>NGÀY SINH</span>
                    </div>
                    <div className={classes.address}>
                        <h4>{tutorInfo.address}</h4>
                        <span>ĐỊA CHỈ</span>
                    </div>
                </div>
                <div className={classes.social}>
                    <a><AiOutlineFacebook/></a>
                    <a><AiOutlineInstagram/></a>
                    <a><AiOutlineLinkedin /></a>
                </div>
            </div>
        </div>
    );
}

export default GenaralProfile;