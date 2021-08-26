import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { getDistrictList, getProvinceList, getWardList } from './getLocation';
import { makeStyles } from '@material-ui/core';

Location.propTypes = {
    onChange: PropTypes.func,
};

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
    },
    field: {
        padding: "8px 2px",
        border: "1px solid #ccc",
        marginBottom: "2px",
        borderRadius: "64px",
    }
})

function Location( {onChange = null}) {
    const classes = useStyles();
    const [provinceList, setProvinceList] = useState([]);
    const [provinceCode, setProvinceCode] = useState(0);
    const [districtList, setDistrictList] = useState([]);
    const [districtCode, setDistrictCode] = useState(0);
    const [wardList, setWardList] = useState([]);
    const selectProvince = useRef();
    const selectDistrict = useRef();
    const selectWard = useRef();

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
        (provinceCode!==0 && districtCode!==0) && getWards();
    }, [districtCode])

    const handleOnChangeProvinces = () => {
        if(selectProvince.current.value) {
            onChange({
                province: selectProvince.current.value,
                district: 0,
                ward: 0
            })
            setProvinceCode(selectProvince.current.value);
            
        }
    }

    const handleOnChangeDistricts = () => {
        if(selectDistrict.current.value) {
            onChange({
                province: provinceCode,
                district: selectDistrict.current.value,
                ward: 0,
            })
            setDistrictCode(selectDistrict.current.value);
        }
    }

    const handleOnChangeWard = () => {
        if(selectWard.current.value) {
            onChange({
                province: provinceCode,
                district: districtCode,
                ward: selectWard.current.value,
            })
            setDistrictCode(selectDistrict.current.value);
        }
    }

    return (
        <div class={classes.root}>
            <select class={classes.field} name="province" onChange={handleOnChangeProvinces} ref={selectProvince}> 
                    <option key={0} value={0}>
                        --Tỉnh, thành phố--
                    </option>
                {provinceList?.map( (province) => (
                    <option key={province.code} value={province.code}>
                        {province.name}
                    </option>
                ))}
            </select>
            <select class={classes.field} name="district" onChange={handleOnChangeDistricts} ref={selectDistrict}> 
                    <option key={0} value={0}>
                        --Quận, huyện--
                    </option>
                {districtList?.map( (district) => (
                    <option key={district.code} value={district.code}>
                        {district.name}
                    </option>
                ))}
            </select>
            <select class={classes.field} name="ward" onChange={handleOnChangeWard} ref={selectWard}> 
                <option key={0} value={0}>
                        --Xã Phường--
                </option>
                {wardList?.map( (ward) => (
                <option key={ward.code} value={ward.code}>
                    {ward.name}
                </option>
                ))}
            </select>
        </div>
    );
}

export default Location;