import React, { useState } from 'react';
import "./styles.scss";

function Categories(props) {
    const [currentActive, setCurrentActive] = useState(1);
    const handleOnClick = (num) => {
        setCurrentActive(num);
    }
    return (
        <div className="categories">
            <div className="categories__list">
                <div className={currentActive === 1 ? "currentActive" : ""} onClick={() => handleOnClick(1)}> 
                    {/* <img src="https://i.ibb.co/7YyVn6m/all.png" alt="all"/> */}
                    <h5>Tất cả</h5>
                </div>
                <div className={currentActive === 2 ? "currentActive" : ""} onClick={() => handleOnClick(2) }> 
                    {/* <img src={subject["Toán"]} alt="toán"/> */}
                    <h5>Toán</h5>
                </div>
                <div className={currentActive === 3 ? "currentActive" : ""} onClick={() => handleOnClick(3) }> 
                    {/* <img src={subject["Ngữ Văn"]} alt="văn"/> */}
                    <h5>Ngữ Văn</h5>
                </div>
                <div className={currentActive === 4 ? "currentActive" : ""}  onClick={() => handleOnClick(4) }> 
                    {/* <img src={subject["Tiếng Anh"]} alt="anh"/> */}
                    <h5>Tiếng Anh</h5>
                </div>
                <div className={currentActive === 5 ? "currentActive" : ""}  onClick={() => handleOnClick(5) }> 
                    {/* <img src={subject["Vật Lý"]} alt="vat ly"/> */}
                    <h5>Vật Lý</h5>
                </div>
                <div className={currentActive === 6 ? "currentActive" : ""}  onClick={() => handleOnClick(6) }> 
                    {/* <img src={subject["Hóa Học"]} alt="hoa hoc"/> */}
                    <h5>Hóa Học</h5>
                </div>
                <div className={currentActive === 7 ? "currentActive" : ""} onClick={() => handleOnClick(7) }> 
                    {/* <img src={subject["Sinh Học"]} alt="sinh"/> */}
                    <h5>Sinh Học</h5>
                </div>
                <div className={currentActive === 8 ? "currentActive" : ""} onClick={() => handleOnClick(8) }> 
                    {/* <img src={subject["Lịch Sử"]} alt="su"/> */}
                    <h5>Lịch Sử</h5>
                </div>
                <div className={currentActive === 9 ? "currentActive" : ""} onClick={() => handleOnClick(9) }> 
                    {/* <img src={subject["Địa Lý"]} alt="dia ly"/> */}
                    <h5>Địa Lý</h5>
                </div>
                <div className={currentActive === 10 ? "currentActive" : ""} onClick={() => handleOnClick(10) }> 
                    {/* <img src={subject["Tiếng Việt"]} alt="tieng viet"/> */}
                    <h5>Tiếng Việt</h5>
                </div>
            </div>
        </div>
    );
}



export default Categories;