import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { AiFillExperiment } from 'react-icons/ai';
import { IoMdSchool } from 'react-icons/io';
import { IoLocation } from 'react-icons/io5';
import { RiMedalFill } from 'react-icons/ri';

MoreInfoProfile.propTypes = {
    TutorInfo: PropTypes.object,
};

const useStyles = makeStyles(theme => ({
    root: {
        "& span": {
            fontWeight: 300,
        }
    },
    field: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#E9E8EB',
        border: '0.5px solid rgba(0, 0, 0, 0.1)',
        margin: '12px 0px',
        borderRadius: '12px',
        "& h4": {
            color: '#3b6997',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            fontWeight: '400',
            [theme.breakpoints.down('xs')]: {
                flex: 2,
                fontSize: '10px',
                marginRight: '12px',
            },
            [theme.breakpoints.up('sm')]: {
                flex: 1,
                marginRight: '56px',
                fontSize: '12px',
            },
            "& svg": {
                marginRight: '4px',
                fontSize: '24px',
            }
        },

        "& p": {
            [theme.breakpoints.down('xs')]: {
                flex: 10,
            },
            [theme.breakpoints.up('sm')]: {
                flex: 8,
            },
            fontWeight: '500',
        }

    
    },
}));

function MoreInfoProfile({tutorInfo}) {
    const classes = useStyles();

    // const getTeachLevelString = (arr) => {
    //     if(!arr || arr.length === 0) {
    //         return "";
    //     }
    //     const ans = arr.map( (item) => {
    //         return `Cấp ${item}`
    //     })
    //     return ans.join(', ')
    // }

    return (
        <div className={classes.root}>
            <div className={classes.field}>
                <h4> <IoMdSchool /></h4>
                <p><span>Học tại </span>{tutorInfo.university}</p>
            </div>
            <div className={classes.field}>
                <h4><RiMedalFill /></h4>
                <p>{tutorInfo.achievement}</p>
            </div>
            <div className={classes.field}>
                <h4><AiFillExperiment /></h4>
                <p>{tutorInfo.experience}</p>
            </div>
            <div className={classes.field}>
                <h4><IoLocation /></h4>
                <p> <span>Dạy học tại</span> {tutorInfo.khu_vuc_day}</p>
            </div>
            {/* <div className={classes.field}>
                <h4><GiBookCover /></h4>
                <p><span>Dạy môn </span>Toán, Hóa</p>
            </div> */}
        </div>
    );
}

export default MoreInfoProfile;