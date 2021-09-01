import { makeStyles } from '@material-ui/core';
import { catchDistrictName, catchProvinceName, getDistrictName, getProvinceName } from 'components/location/getLocation';
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { getTutorProfile } from '../profile';
import GenaralProfile from './components/GenaralProfile';
import MoreInfoProfile from './components/MoreInfoProfile';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '80px',
        [theme.breakpoints.up('md')]: {
            padding: '0px 100px',
        },
    },
    
    profile: {
        flex: 1,
        [theme.breakpoints.down('sm')]: {
            padding: '0px 40px',
        },
        [theme.breakpoints.up('md')]: {
            padding: '50px 70px',
        },
    },
    profileField: {
        display: 'flex',
    },
    label: {
        marginRight: '8px',
        color: '#262D61',
    },
    profileLine: {
        marginTop: '2px',
        height: '0px',
        background: '#C4C4C4',
        border: '2px solid #9EA7E6',
    },
    experience: {
        display: 'flex',
        flexDirection: 'column',
    },
    expLine: {
        width: '90px',
        marginTop: '2px',
        height: '0px',
        background: '#C4C4C4',
        border: '2px solid #9EA7E6',
    },
    more: {
        display: 'flex',
        flexDirection: 'column',
    },
    moreLine: {
        width: '165px',
        marginTop: '2px',
        height: '0px',
        background: '#C4C4C4',
        border: '2px solid #9EA7E6',
    },
    
    
}));

function TutorProfile(props) {
    const match = useRouteMatch();
    const tutorId = Number(match.params.tutorId);
    const classes = useStyles();
    const [tutorInfo, setTutorInfo] = useState({});
    useEffect( () => {
        const getUserInfo = async () => {
            const info = await getTutorProfile( {id: tutorId});
            const provinceName = await getProvinceName(info.province_code) || "";
            const districtName = await getDistrictName({provinceCode: info.province_code, districtCode: info.district_code}) || "";
            info["address"] = `${catchDistrictName(districtName)}, ${catchProvinceName(provinceName)}`;
            setTutorInfo(info);
        }
        getUserInfo();
    }, [])

    return (
        <div className={classes.root}> 
            <GenaralProfile tutorInfo={tutorInfo} />

            <MoreInfoProfile tutorInfo={tutorInfo}/>
        </div>
        
    );
}

export default TutorProfile;