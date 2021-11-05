import { makeStyles } from '@material-ui/core/styles';
import { catchDistrictName, catchProvinceName, catchWardName, getDistrictName, getProvinceName, getWardName } from "components/location/getLocation";
import { selectId_of_user } from 'features/auth/authSlice';
import { GetParentProfile } from 'graphql/ProfileQueries';
import { GetAllParentRoom } from 'graphql/RoomQueries';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import GeneralProfile from './components/GeneralProfile';
import ParentRoomProfile from './components/ParentRoomProfile';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '80px',
        [theme.breakpoints.down('sm')]: {
            padding: '0px 12px',
            marginBottom: 40,
        },
        [theme.breakpoints.up('md')]: {
            padding: '0px 120px',
        },
    },
    empty: {
        fontStyle: 'italic',
        fontWeight: 200,
    }
}));

function ParentProfile(props) {
    const match = useRouteMatch("/profile/parent/:parentId");
    const parentId = Number(match.params.parentId);
    const userId = useSelector(selectId_of_user);  
    const classes = useStyles();
    const [parentInfo, setParentInfo] = useState({});
    const [parentRoom, setParentRoom] = useState([]);
    useEffect ( () => {
        const getParentInfo = async () => {
            const info = await GetParentProfile(parentId);
            const provinceName = await getProvinceName(info.province_code) || "";
            const districtName = await getDistrictName({provinceCode: info.province_code, districtCode: info.district_code}) || "";
            const wardName = await getWardName({districtCode: info.district_code, wardCode: info.ward_code});
            info["address"] = `${catchWardName(wardName)}, ${catchDistrictName(districtName)}, ${catchProvinceName(provinceName)}`;
            setParentInfo(info);
        }
        getParentInfo();
    }, [parentId]);

    useEffect (()=> {
        const getParentRoom = async (id) => {
            const listRoom = await GetAllParentRoom(id);
            setParentRoom(listRoom);
        }
        getParentRoom(parentId);
    }, [parentId]);
    
    return (
        <div className={classes.root}>
            <GeneralProfile tutorInfo={parentInfo} isUser={Number(parentId) === Number(userId)} type="parent"/>
            {parentRoom.length !== 0 ? <ParentRoomProfile parentRoom={parentRoom}/> : <h5 className={classes.empty}>(Phụ huynh chưa có phòng) </h5>}
        </div>
    );
}

export default ParentProfile;