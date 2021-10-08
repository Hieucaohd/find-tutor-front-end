import SettingsLocation from 'components/location/SettingsLocation';
import { selectId_of_user, selectToken } from 'features/auth/authSlice';
import { GetTutorProfile } from 'graphql/ProfileQueries';
import React from 'react';
import { useEffect } from 'react';
import { Fragment } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';


function SettingsTutor(props) {

    const [tutorData, setTutorData] = useState(null);
    const token = useSelector(selectToken);
    const userId = useSelector(selectId_of_user)
    useEffect(()=> {
        const getData = async () => {
            const data = await GetTutorProfile(userId, token);
            setTutorData(data);
        }
        getData();
    }, [token, userId])

    const renderType = (type) => {
        if(type === "gv") {
            return (<select>
                <option value="sv">Sinh Viên</option>
                <option value="gv" selected>Giáo Viên</option>
                <option value="khac">Khác</option>
            </select>)
        } else if (type === 'sv') {
            return (<select>
                <option value="sv" selected>Sinh Viên</option>
                <option value="gv">Giáo Viên</option>
                <option value="khac">Khác</option>
            </select>)
        } else {
            return (<select>
                <option value="sv">Sinh Viên</option>
                <option value="gv">Giáo Viên</option>
                <option value="khac" selected>Khác</option>
            </select>)
        }
    }

    return (
        <Fragment>
        {tutorData && <div className="settings__tutor">
            <div className="settings__field">
                <label>Họ và tên</label>
                <input type="text" defaultValue={`${tutorData.first_name} ${tutorData.last_name}`}/>
            </div>
            <div className="settings__field">
                <label>Số điện thoại</label>
                <input type="number" defaultValue={tutorData.number_phone}/>
            </div>
            <div className="settings__field">
                <label>Ngày sinh</label>
                <input type="date" value={tutorData.birthday}/>
            </div>
            {/* <div className="settings__field">
                <label>Ảnh đại diện</label>
                <input type="file" />
            </div> */}
            <SettingsLocation defaultLocation={{province: tutorData.province_code, ward: tutorData.ward_code, district: tutorData.district_code}}/>
            <div className="settings__field">
                <label>Nghề nghiệp</label>
                {renderType(tutorData.profession)}
            </div>
            <div className="settings__field">
                <label>Khu vực dạy</label>
                <input 
                    type="text"
                    defaultValue={tutorData.khu_vuc_day}
                />
            </div>
            <div className="settings__field">
                <label>Kinh nghiệm </label>
                <textarea 
                    type="text"
                    rows = {3}
                    onChange={value => console.log(value.target.value)}
                    defaultValue={tutorData.experience}
                />
            </div>
            <div className="settings__field">
                <label>Thành tích nổi bật </label>
                <textarea 
                    type="text"
                    rows = {3}
                    onChange={value => console.log(value.target.value)}
                    defaultValue={tutorData.achievement}
                />
            </div>
            <div className="settings__field">
                <label>Mô tả bản thân </label>
                <textarea 
                    type="text"
                    rows = {3}
                    onChange={value => console.log(value.target.value)}
                />
            </div>
            <div className="settings__field">
                <label>Link Facebook</label>
                <input type="text"/>
            </div>
            <div className="settings__field">
                <label>Link Instagram</label>
                <input type="text"/>
            </div>
            <div className="settings__field">
                <label>Link Linkedin</label>
                <input type="text"/>
            </div>
        </div>}
        </Fragment>
    );
}

export default SettingsTutor;