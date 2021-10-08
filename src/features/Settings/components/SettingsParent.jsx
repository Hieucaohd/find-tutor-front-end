import React from 'react';
import SettingsLocation from 'components/location/SettingsLocation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { selectId_of_user, selectToken } from 'features/auth/authSlice';
import { GetParentProfile } from 'graphql/ProfileQueries';
import { Fragment } from 'react';

SettingsParent.propTypes = {
    
};

function SettingsParent(props) {

    const [parentData, setParentData] = useState(null);
    const token = useSelector(selectToken);
    const userId = useSelector(selectId_of_user)
    useEffect(()=> {
        const getData = async () => {
            const data = await GetParentProfile(userId, token);
            setParentData(data);
        }
        getData();
    }, [token, userId])
    
    return (
        <Fragment>
        {parentData && <div className="settings__parent">
            <div className="settings__field">
                <label>Họ và tên</label>
                <input type="text" defaultValue={`${parentData?.first_name} ${parentData?.last_name}`}/>
            </div>
            <div className="settings__field">
                <label>Số điện thoại</label>
                <input type="number" defaultValue={parentData?.number_phone}/>
            </div>
            <div className="settings__field">
                <label>Ngày sinh</label>
                <input type="date" defaultValue={parentData?.birthday}/>
            </div>
            {/* <div className="settings__field">
                <label>Ảnh đại diện</label>
                <input type="file" />
            </div> */}
            <SettingsLocation defaultLocation={{province: parentData?.province_code, ward: parentData?.ward_code, district: parentData?.district_code}}/>
        </div>}
        </Fragment>
    );
}

export default SettingsParent;