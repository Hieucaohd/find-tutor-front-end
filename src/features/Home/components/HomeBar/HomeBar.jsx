import React from 'react';
import { useRef } from 'react';
import { RiFilter3Fill } from 'react-icons/ri';
import { useHistory, useLocation } from 'react-router';
import Select from 'react-select';
import Categories from './components/Catergories/Categories';
import FilterBar from './components/FilterBar/FilterBar';
import "./styles.scss";


const options = [
    { value: 'create_at', label: 'Mới nhất ' },
    { value: 'price_asc', label: 'Giá thấp ↑' },
    { value: 'price_desc', label: 'Giá cao ↓' }
]

function HomeBar(props) {
    const filterRef = useRef();
    const location = useLocation();
    const history = useHistory();
    const queryString = require('query-string');
    const showFilterBar = () => {
        if(filterRef.current.style.display === "none") {
          filterRef.current.style.display = "block";
        } else {
          filterRef.current.style.display = "none";
        }
      }
    const handleChangeSort = (value) => {
        const currentLocation = queryString.parse(location.search);
        const newLocation = {
            ...currentLocation,
            sort: value.value,
        }
        history.push(`/?${queryString.stringify(newLocation)}`)
    }
    const currentFilter = queryString.parse(location.search);
    console.log(currentFilter);
    return (
        <div className="homebar">
            <div className="homebar__top">
                <Select className="homebar__top__select" 
                    options={options} 
                    defaultValue={options.find((item) => item.value === currentFilter.sort)} 
                    onChange={handleChangeSort}
                />
                <Categories />
                <button
                    className="homebar__top__filter" onClick={showFilterBar}>
                    <RiFilter3Fill />
                    Lọc
                </button>
            </div>
            <div className="homebar__filterbar" ref={filterRef}>
                <FilterBar currentFilter={currentFilter}/>
            </div>
      </div>
    );
}

export default HomeBar;