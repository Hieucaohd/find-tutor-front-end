import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import Location from "../../../location/Location"
import "./styles.scss";
import { AiFillCloseCircle } from "react-icons/ai";
import { Button, Grid } from '@material-ui/core';

FilterBar.propTypes = {
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
};

function FilterBar( {onClose = null, onSubmit = null}) {
    const { register, handleSubmit } = useForm();
    const [location, setLocation] = useState({
        province: 0,
        district: 0,
        ward: 0
    });
    const handleGetLocation = (data) => {
        setLocation(data);
    }

    const handleCloseFilterBar = () => {
        if(!onClose) return;
        onClose();
    }

    const classList = [1,2,3,4,5,6,7,8,9,10,11,12,13];
    const renderClassList = classList.map((lop) => {
        if(lop === 13) {
            return (
                <div key={13} className="filter__class__item filter__class__special"> 
                    <label> Đại học </label>
                    <input 
                        type="checkbox"
                        value="checked"
                        {...register(String(lop))}
                    />
                </div>  
            )
        } else {
            return (
                <div key={lop} className="filter__class__item"> 
                <label> {lop} </label>
                <input 
                    type="checkbox"
                    value="checked"
                    {...register(String(lop))}
                />
            </div>
            )
        }
      });


    const onSubmitSearch = (data) => {
        if(!onSubmit) return;
        const newFilter = {};
        let classCanTeach = []
        for(let i = 1; i<14; i++) {
            if(data[i]){
                classCanTeach.push(i);
            }
        }
        if(data.subject){
            newFilter["search"] = data.subject;
        }
        if(Number(location.province) !== 0) {
            newFilter["province_code"] = Number(location.province);
        }
        if(Number(location.district) !== 0) {
            newFilter["district_code"] = Number(location.district);
        }
        if(Number(location.ward) !== 0) {
            newFilter["province_code"] = Number(location.ward);
        }
        const filter = {};
        filter["params"] = newFilter;
        
        if(classCanTeach.length != 0) {
            filter["lop"] = classCanTeach;
        }
        onSubmit(filter);
    }
    
    return (
        <div className = "filter" > 
            <button className="filter__close" onClick={handleCloseFilterBar}>
                <AiFillCloseCircle />
            </button>
            <form onSubmit={handleSubmit(onSubmitSearch)}> 
                <div>
                    <label>Môn học</label>
                    <input 
                    type="text" 
                    {...register("subject")}
                    />
                </div>
                <div> 
                    <label>Chọn lớp dạy</label>
                    <div className="filter__class">
                        {renderClassList}
                    </div>
                </div>
                <div> 
                    <label>Vị trí dạy</label>
                    <Location onChange={handleGetLocation} />
                </div>
               <div> 
                <Button type="submit" variant="contained" color="primary"> Áp dụng</Button>
               </div>
            </form>
        </div>
    );
}

export default FilterBar;