import { getProvinceList } from "components/location/getLocation";
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import Select from 'react-select';
import "./styles.scss";

const sexOptions = [
    { value: 'male', label: 'Gia sư nam' },
    { value: 'female', label: 'Gia sư nữ' },
    { value: 'both', label: 'Tất cả' },
]

const typeOptions = [
    { value: 'teacher', label: 'Giáo viên' },
    { value: 'student', label: 'Sinh viên' },
    { value: 'both', label: 'Tất cả' },
]

const priceOptions = [
    { value: 'teacher', label: '< 150k' },
    { value: 'student', label: '150k - 300k' },
    { value: 'both', label: '300k - 500k' },
    { value: 'both', label: '> 500k' },
]

const classOptions = [
    { value: 1, label: 'Cấp 1' },
    { value: 2, label: 'Cấp 2' },
    { value: 3, label: 'Cấp 3' },
    { value: 4, label: 'Đại học' },
    { value: 0, label: 'Tất cả' },    
]





function FilterBar( {onClose = null, onSubmit = null}) {
    const { register, handleSubmit } = useForm();
    const [location, setLocation] = useState({
        province: 0,
        district: 0,
        ward: 0
    });
    const [provinceOptions, setProvinceOptions] = useState([]);
    
    const handleGetLocation = (data) => {
        setLocation(data);
    }

    const handleCloseFilterBar = () => {
        if(!onClose) return;
        onClose();
    }

    const getClassCanTeach = (cap1, cap2, cap3, cap4) => {
        let classArr = [];
        if(cap1 === "checked") {
            classArr.push(1,2,3,4,5);
        }
        if(cap2 === "checked") {
            classArr.push(6,7,8,9);
        }
        if(cap3 === "checked") {
            classArr.push(10,11,12);
        }
        if(cap4 === "checked") {
            classArr.push(13);
        }
        return classArr;
    }

    const onSubmitSearch = (data) => {
        if(!onSubmit) return;
        const newFilter = {};
        let classCanTeach = getClassCanTeach(data.cap_1, data.cap_2, data.cap_3, data.cap_4);
        if(data.subject){
            newFilter["subject"] = data.subject;
        }
        if(Number(location.province) !== 0) {
            newFilter["province_code"] = Number(location.province);
        }
        if(Number(location.district) !== 0) {
            newFilter["district_code"] = Number(location.district);
        }
        if(Number(location.ward) !== 0) {
            newFilter["ward_code"] = Number(location.ward);
        }
        if(classCanTeach.length !== 0){
            newFilter["lop"] = classCanTeach;
        }
        if(data.sex !== "both") {
            newFilter["sex"] = data.sex;
        }
        if(data.job !== "both") {
            newFilter["job"] = data.job;
        }
        if(data.price_from === "" && data.price_to !== "") {
            newFilter["price"] = [0, data.price_to];
        }
        if(data.price_from !== "" && data.price_to === "") {
            newFilter["price"] = [data.price_from, 9999999];
        }
        if(data.price_from !== "" && data.price_to !== "") {
            newFilter["price"] = [data.price_from, data.price_to];
        }
        onSubmit(newFilter);
    }

    useEffect(()=>{
        const getProvinces = async () => {
            const list = await getProvinceList();
            console.log('list', list);
            const listOptions = await list.map((province) => {
                return {value: province.code, label: province.name}
            })
            setProvinceOptions(listOptions);
        }
        getProvinces();
    }, [])

    return (
        <div className = "filter" > 
            <div className="filter__field">
                <label>Giới tính</label>
                <Select options={sexOptions} isClearable/>
            </div>
            <div className="filter__field">
                <label>Loại gia sư</label>
                <Select options={typeOptions} isClearable/>
            </div>
            <div className="filter__field">
                <label>Giá phòng</label>
                <Select options={priceOptions} isClearable/>
            </div>
            <div className="filter__field">
                <label>Cấp dạy </label>
                <Select options={classOptions} isClearable/>
            </div>
            <div className="filter__field">
                <label>Khu vực </label>
                <Select options={provinceOptions} isClearable/>
            </div>
        </div>
    );
}

export default FilterBar;