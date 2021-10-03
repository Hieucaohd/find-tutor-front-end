import { getProvinceList } from "components/location/getLocation";
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router";
import Select from 'react-select';
import "./styles.scss";

const sexOptions = [
    { value: 'nam', label: 'Gia sư nam' },
    { value: 'nu', label: 'Gia sư nữ' },
]

const typeOptions = [
    { value: 'gv', label: 'Giáo viên' },
    { value: 'sv', label: 'Sinh viên' },
]

const priceOptions = [
    { value: ['0', '150000'], label: '< 150k' },
    { value: ['150000', '300000'], label: '150k - 300k' },
    { value: ['300000', '500000'], label: '300k - 500k' },
    { value: ['500000', '99999999'], label: '> 500k' },
]

const classOptions = [
    { value: [1,2,3,4,5], label: 'Cấp 1' },
    { value: [6,7,8,9], label: 'Cấp 2' },
    { value: [10,11,12], label: 'Cấp 3' },
    { value: 13, label: 'Đại học' },
]

function FilterBar({currentFilter}) {
    const location = useLocation();
    const history = useHistory();
    const [provinceOptions, setProvinceOptions] = useState([]);
    
    

    useEffect(()=>{
        const getProvinces = async () => {
            const list = await getProvinceList();
            const listOptions = await list.map((province) => {
                return {value: province.code, label: province.name}
            })
            setProvinceOptions(listOptions);
        }
        getProvinces();
    }, [])
    const queryString = require('query-string');
    
    const handleEmptyFilter = (currentLocation) => {
        if(!("lop" in currentLocation )
            && !("sex" in currentLocation )
            && !("price" in currentLocation)
            && !("job" in currentLocation)
            && !("province_code" in currentLocation)
        ) {
            delete currentLocation.onFilter;
            history.push(`/?${queryString.stringify(currentLocation)}`)
        } else {
            history.push(`/?${queryString.stringify(currentLocation)}`)
        }
    }

    const handleChangeSex = (value) => {
        if(!value) {
            const currentLocation = queryString.parse(location.search);
            if(currentLocation.sex) {
                delete currentLocation.sex;
                handleEmptyFilter(currentLocation);
            }
        } else {
            const currentLocation = queryString.parse(location.search);
            const newLocation = {
                ...currentLocation,
                sex: value.value,
                pages: 1,
            }
            history.push(`/?${queryString.stringify(newLocation)}`)
        }
    }

    const handleChangeTypeTutor = (value) => {
        if(!value) {
            const currentLocation = queryString.parse(location.search);
            if(currentLocation.job) {
                delete currentLocation.job;
                handleEmptyFilter(currentLocation);
            }
        } else {
            const currentLocation = queryString.parse(location.search);
            const newLocation = {
                ...currentLocation,
                job: value.value,
                pages: 1,
            }
            history.push(`/?${queryString.stringify(newLocation)}`)
        }
    }

    const handleChangeClass = (value) => {
        if(!value) {
            const currentLocation = queryString.parse(location.search);
            if(currentLocation.lop) {
                delete currentLocation.lop;
                handleEmptyFilter(currentLocation);
            }
        } else {
            const currentLocation = queryString.parse(location.search);
            const newLocation = {
                ...currentLocation,
                lop: value.value,
                pages: 1,
            }
            history.push(`/?${queryString.stringify(newLocation)}`)
        }
    }

    const handleChangePrice = (value) => {
        if(!value) {
            const currentLocation = queryString.parse(location.search);
            if(currentLocation.price) {
                delete currentLocation.price;
                handleEmptyFilter(currentLocation);
            }
        } else {
            const currentLocation = queryString.parse(location.search);
            const newLocation = {
                ...currentLocation,
                price: value.value,
                pages: 1,
            }
            history.push(`/?${queryString.stringify(newLocation)}`)
        }
    }

    const handleChangeProvince = (value) => {
        if(!value) {
            const currentLocation = queryString.parse(location.search);
            if(currentLocation.province_code) {
                delete currentLocation.province_code;
                handleEmptyFilter(currentLocation);
            }
        } else {
            const currentLocation = queryString.parse(location.search);
            const newLocation = {
                ...currentLocation,
                province_code: value.value,
                pages: 1,
            }
            history.push(`/?${queryString.stringify(newLocation)}`)
        }
    }

    return (
        <div className = "filter" > 
            <div className="filter__field">
                <label>Giới tính</label>
                <Select 
                    options={sexOptions}
                    defaultValue={sexOptions.find((item) => item.value === currentFilter.sex)}
                    onChange={handleChangeSex} isClearable />
            </div>
            <div className="filter__field">
                <label>Loại gia sư</label>
                <Select 
                    options={typeOptions} 
                    defaultValue={typeOptions.find((item) => item.value === currentFilter.job)}
                    onChange={handleChangeTypeTutor} isClearable/>
            </div>
            <div className="filter__field">
                <label>Giá phòng</label>
                <Select 
                    options={priceOptions} 
                    defaultValue={currentFilter.price ? priceOptions.find((item) => item.value[0] === currentFilter.price[0]) : null}
                    isClearable onChange={handleChangePrice} />
            </div>
            <div className="filter__field">
                <label>Cấp dạy </label>
                <Select 
                    defaultValue={classOptions.find((item) => item.value === currentFilter.lop)}
                    options={classOptions} 
                    isClearable onChange={handleChangeClass}/>
            </div>
            <div className="filter__field">
                <label>Khu vực </label>
                <Select 
                    defaultValue={provinceOptions.find((item) => item.value === currentFilter.province_code)}
                    options={provinceOptions} 
                    isClearable onChange={handleChangeProvince} />
            </div>
        </div>
    );
}

export default FilterBar;