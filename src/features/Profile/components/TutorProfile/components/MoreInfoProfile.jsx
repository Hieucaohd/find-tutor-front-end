import { makeStyles } from '@material-ui/core';
import { formatBirthDay } from 'features/Profile/profile';
import React from 'react';
import { AiFillExperiment } from 'react-icons/ai';
import { IoMdSchool } from 'react-icons/io';
import { IoLocation } from 'react-icons/io5';
import { MdToday } from 'react-icons/md';
import { RiFileInfoFill, RiMedalFill } from 'react-icons/ri';

const useStyles = makeStyles(theme => ({
    root: {
        "& span": {
            fontWeight: 300,
        },
        boxShadow: '0 2px 4px 0 #ccc',
        backgroundColor: 'white',
        borderRadius: 8,
    },
    field: {
        display: 'flex',
        alignItems: 'center',
        // backgroundColor: '#E9E8EB',
        // border: '0.5px solid rgba(0, 0, 0, 0.1)',
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
                marginRight: '24px',
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
        <div className={`${classes.root} py-2`}>
            <div className={`${classes.field} p-4`}>
                <h4> <MdToday /></h4>
                <p> <span>Sinh ngày</span> {formatBirthDay(tutorInfo.birthday)}</p>
            </div>
            <div className={`${classes.field} p-4`}>
                <h4> <IoLocation /></h4>
                <p> <span>Sống tại</span> {tutorInfo.address}</p>
            </div>
            <div className={`${classes.field} p-4`}>
                <h4> <IoMdSchool /></h4>
                <p><span>Học tại </span>{tutorInfo.university}</p>
            </div>
            
            <div className={`${classes.field} p-4`}>
                <h4><RiMedalFill /></h4>
                <p>{tutorInfo.achievement}</p>
            </div>
            <div className={`${classes.field} p-4`}>
                <h4><AiFillExperiment /></h4>
                <p>{tutorInfo.experience}</p>
            </div>
            <div className={`${classes.field} p-4`}>
                <h4><RiFileInfoFill /></h4>
                <p>Từng dạy học 12 lớp</p>
            </div>
            {/* <div className={`${classes.field} p-4`}>
                <h4><IoLocation /></h4>
                <p> <span>Dạy học tại</span> {tutorInfo.khu_vuc_day}</p>
            </div> */}
            {/* <div className={classes.field}>
                <h4><GiBookCover /></h4>
                <p><span>Dạy môn </span>Toán, Hóa</p>
            </div> */}
        </div>
    );
}

export default MoreInfoProfile;