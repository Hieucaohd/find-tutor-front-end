import React from 'react';
import PropTypes from 'prop-types';
import { IoLocation, IoSchoolOutline } from 'react-icons/io5';
import { IoMdSchool } from 'react-icons/io';
import { RiMedalFill, RiNumbersFill } from 'react-icons/ri';
import { AiFillExperiment } from 'react-icons/ai';
import { GiBookCover } from 'react-icons/gi';
import { makeStyles } from '@material-ui/core';

MoreInfoProfile.propTypes = {
    TutorInfo: PropTypes.object,
};

const useStyles = makeStyles(theme => ({
    root: {

    },
    field: {
        display: 'flex',
        alignItems: 'center',
        "& h4": {
            flex: 1,
            color: '#3b6997',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            fontWeight: '400',
            [theme.breakpoints.down('sm')]: {
                fontSize: '10px',
                marginRight: '12px',
            },
            [theme.breakpoints.up('md')]: {
                marginRight: '56px',
                fontSize: '12px',
            },
            "& svg": {
                marginRight: '4px',
                fontSize: '24px',
            }
        },

        "& p": {
            flex: 3,
            fontWeight: '500',
        }

    
    },
}));

function MoreInfoProfile({tutorInfo}) {
    console.log(tutorInfo);
    const classes = useStyles();

    const getTeachLevelString = (arr) => {
        if(!arr || arr.length === 0) {
            return "";
        }
        const ans = arr.map( (item) => {
            return `Cấp ${item}`
        })
        return ans.join(', ')
    }

    return (
        <div>
            <div className={classes.field}>
                <h4> <IoMdSchool />HỌC VẤN</h4>
                <p>{tutorInfo.university}</p>
            </div>
            <div className={classes.field}>
                <h4><RiMedalFill />THÀNH TỰU</h4>
                <p>{tutorInfo.achievement}</p>
            </div>
            <div className={classes.field}>
                <h4><AiFillExperiment />KINH NGHIỆM</h4>
                <p>{tutorInfo.experience}</p>
            </div>
            <div className={classes.field}>
                <h4><IoLocation />KHU VỰC DẠY</h4>
                <p>{tutorInfo.khu_vuc_day}</p>
            </div>
            <div className={classes.field}>
                <h4><RiNumbersFill />CẤP DẠY</h4>
                <p>{getTeachLevelString(tutorInfo.cap_day)}</p>
            </div>
            <div className={classes.field}>
                <h4><GiBookCover />MÔN DẠY</h4>
                <p>Toán, Hóa</p>
            </div>
        </div>
    );
}

export default MoreInfoProfile;