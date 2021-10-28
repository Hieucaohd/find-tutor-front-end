import { makeStyles } from '@material-ui/core/styles';
import { catchDistrictName, catchProvinceName, catchWardName, getDistrictName, getProvinceName, getWardName } from 'components/location/getLocation';
import { selectId_of_user } from 'features/auth/authSlice';
import { GetTutorProfile } from 'graphql/ProfileQueries';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import GeneralProfile from './components/GeneralProfile';
import MoreInfoProfile from './components/MoreInfoProfile';
import ProfileSkeleton from './components/ProfileSkeleton';

const useStyles = makeStyles(theme => ({
    root1: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '80px',
        [theme.breakpoints.down('sm')]: {
            padding: '0px 12px',
            marginBottom: 40,
        },
        [theme.breakpoints.up('md')]: {
            padding: '0px 220px',
        },
    }, 
    root2: {
        display: 'flex',
        flexDirection: 'column',
        padding: "8px 12px",
        position: 'relative'
        // paddingTop: 48,
        // paddingBottom: 24,
        // [theme.breakpoints.down('sm')]: {
            
        // },
        // [theme.breakpoints.up('md')]: {
        //     padding: "48px 24px",
        // },
    }
}));

function TutorProfile({currentId}) {

    const match = useRouteMatch("/profile/tutor/:tutorId");
    const tutorId = currentId || Number(match.params.tutorId);
    const userId = useSelector(selectId_of_user); 
    const classes = useStyles();
    const [tutorInfo, setTutorInfo] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect( () => {
        const getUserInfo = async () => {
            const info = await GetTutorProfile(tutorId);
            info["address"] = "";
            setTutorInfo(info);
            setLoading(false);
            const provinceName = await getProvinceName(info.province_code) || "";
            const districtName = await getDistrictName({provinceCode: info.province_code, districtCode: info.district_code}) || "";
            const wardName = await getWardName({districtCode: info.district_code, wardCode: info.ward_code});
            info["address"] = `${catchWardName(wardName)}, ${catchDistrictName(districtName)}, ${catchProvinceName(provinceName)}`;
            setTutorInfo({...info});
        }
        getUserInfo();
    }, [tutorId]);

    return (
        <div className={currentId ? classes.root2 : classes.root1}>
            {loading ? <ProfileSkeleton isParentRoom={currentId ? true : false}/>
            :  <div>
                <GeneralProfile tutorInfo={tutorInfo} isUser={Number(tutorId) === Number(userId)} type="tutor"/>
                <MoreInfoProfile tutorInfo={tutorInfo}/> 
            </div>
        }
        </div>
        
    );
}

export default TutorProfile;