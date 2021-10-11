import React, { useEffect, useState } from 'react';
import { getDistrictList, getProvinceList, getWardList } from './getLocation';
import "./styles.scss";

SettingsLocation.propTypes = {
    
};

function SettingsLocation({defaultLocation, onChange}) {
    const {province, district, ward} = defaultLocation;
    const [provinceList, setProvinceList] = useState([]);
    const [provinceCode, setProvinceCode] = useState(province);
    const [districtList, setDistrictList] = useState([]);
    const [districtCode, setDistrictCode] = useState(district);
    const [wardList, setWardList] = useState([]);
    useEffect(()=>{
        const getProvinces = async () => {
            const list = await getProvinceList();
            setProvinceList(list);
        }
        getProvinces();
    }, [])

    useEffect(()=>{
        const getDistricts = async () => {
            const list = await getDistrictList(provinceCode);
            setDistrictList(list.districts);
        }
        provinceCode!==0 && getDistricts();
    }, [provinceCode])

    useEffect(()=>{
        const getWards = async () => {
            const list = await getWardList(districtCode);
            setWardList(list.wards);
        }
        (districtCode!==0) && getWards();
    }, [districtCode])

    const renderList = (list, code) => {
        if(!list) return;
        return list.map( (item) => {
            if( Number(item.code) === Number(code) ) {
                return (<option key={item.code} value={item.code} selected>
                    {item.name}
                </option>)
            } else {
                return (<option key={item.code} value={item.code}>
                    {item.name}
                </option>) 
            }
        })
    }

    const handleChangeProvince = (e) => {
        setWardList([]);
        setProvinceCode(e.target.value);
        onChange({
            province_code: e.target.value,
        })
    }

    const handleChangeDistrict = (e) => {
        setDistrictCode(e.target.value);
        onChange({
            province_code: provinceCode,
            district_code: districtCode,
        })
    }

    const handleChangeWard = (e) => {
        onChange({
            province_code: provinceCode,
            district_code: districtCode,
            ward_code: e.target.value,
        })
    }

    return (
        <div className="location">
            <div className="location__field">
                <label>Tỉnh thành phố</label>
                <select name="province" onChange={handleChangeProvince}>
                    <option key={0} value={0}>
                        --Lựa chọn--
                    </option>
                    {renderList(provinceList, province)}
                </select>
            </div>
            <div className="location__field">
                <label>Quận, huyện</label>
                <select name="district" onChange={handleChangeDistrict}> 
                    <option key={0} value={0}>
                        --Lựa chọn--
                    </option>
                    {renderList(districtList, district)}
            </select>
            </div>
            <div className="location__field">
                <label>Xã phường</label>
                <select name="ward" onChange={handleChangeWard}> 
                    <option key={0} value={0}>
                        --Lựa chọn--
                    </option>
                    {renderList(wardList, ward)}
                </select>
            </div>
        </div>
    );
}


export default SettingsLocation;