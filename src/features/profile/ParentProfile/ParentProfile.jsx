import { Avatar, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { getDistrictName, getProvinceName, getWardName } from "components/location/getLocation";
import { formatBirthDay, getParentProfile } from '../profile';

const useStyles = makeStyles({
    root: {
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    avatar: {
        width: 250,
        height: 250,
    },
});

function ParentProfile(props) {
    const match = useRouteMatch();
    const parentId = Number(match.params.parentId);
    const classes = useStyles();
    const [parentInfo, setParentInfo] = useState({});
    useEffect ( () => {
        const getParentInfo = async () => {
            const info = await getParentProfile({id: parentId});
            const provinceName = await getProvinceName(info.province_code) || "";
            const districtName = await getDistrictName({provinceCode: info.province_code, districtCode: info.district_code}) || "";
            const wardName = await getWardName({districtCode: info.district_code, wardCode: info.ward_code});
            info["provinceName"] = provinceName;
            info["districtName"] = districtName;
            info["wardName"] = wardName;
            setParentInfo(info);
        }
        getParentInfo();
    }, [])
    return (
        <div className={classes.root}>
            <div> 
                <Avatar alt="Travis Howard" className={classes.avatar} src="https://laptrinhcuocsong.com/images/lap-trinh-vien.png" />
            </div>
            <div>
                <h3>{parentInfo.first_name} {parentInfo.last_name}</h3>
            </div>
            <div> 
                <div> 
                    FB: <a href="#">facebook.com/abc</a>
                </div>
                <div> 
                    Ngày sinh: {formatBirthDay(parentInfo.birthday)}
                </div>
                <div>
                    Email: abc@gmail.com
                </div>
                <div>
                    Địa chỉ: {parentInfo.wardName}, {parentInfo.districtName}, {parentInfo.provinceName}
                </div>
            </div>
        </div>
    );
}

export default ParentProfile;