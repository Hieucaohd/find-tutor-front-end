import Location from "components/location/Location.jsx";
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { AiFillCloseCircle } from "react-icons/ai";
import "./styles.scss";

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


    return (
        <div className = "filter" > 
            <button className="filter__close" onClick={handleCloseFilterBar}>
                <AiFillCloseCircle />
            </button>
            <form onSubmit={handleSubmit(onSubmitSearch)} className="filter__form"> 
                <div className="filter__form__control">
                    <label>Chọn giới tính gia sư</label>
                    <select name="sex" id="sex" {...register("sex")}>
                      <option value="both">--Không--</option>
                      <option value="nam">Nam</option>
                      <option value="nu">Nữ</option>
                    </select>
                </div>
                <div className="filter__form__control">
                    <label>Chọn loại gia sư</label>
                    <select name="job" id="job" {...register("job")}>
                      <option value="both">--Không--</option>
                      <option value="gv">Giáo viên</option>
                      <option value="sv">Sinh viên</option>
                    </select>
                </div>
                <div className="filter__form__control">
                    <label> Chọn cấp dạy</label>
                    <div className="filter__form__checkbox">
                        <div>
                            <span> Cấp 1 </span>
                            <input 
                                type="checkbox"
                                value="checked"
                                {...register("cap_1")}
                            />
                        </div>
                        <div>
                            <span> Cấp 2 </span>
                            <input 
                                type="checkbox"
                                value="checked"
                                {...register("cap_2")}
                            />
                        </div>
                        <div>
                            <span> Cấp 3 </span>
                            <input 
                                type="checkbox"
                                value="checked"
                                {...register("cap_3")}
                            />
                        </div>
                        <div>
                            <span> Đại học </span>
                            <input 
                                type="checkbox"
                                value="checked"
                                {...register("cap_4")}
                            />
                        </div>
                    </div>
                </div>
                <div> 
                    <label>Vị trí dạy</label>
                    <Location onChange={handleGetLocation} />
                </div>
                <div className="filter__form__control">
                    <label>Giá tiền</label>
                    <div className="filter__form__price">
                        <input type="number" placeholder="đ từ" {...register("price_from")}/>
                        <span></span>
                        <input type="number" placeholder="đ đến" {...register("price_to")}/>
                    </div>
                </div>
               <div> 
                <button type="submit" variant="contained" color="primary" className="filter__submit"> Áp dụng</button>
               </div>
            </form>
        </div>
    );
}

export default FilterBar;