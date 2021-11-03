import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
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
    const location = useLocation();
    const history = useHistory();
    const queryString = require('query-string');
    const currentFilter = queryString.parse(location.search);

    const [isShowFilter, setIsShowFilter] = useState(( 
        "lop" in currentFilter )
        || ("sex" in currentFilter )
        || ("price" in currentFilter)
        || ("job" in currentFilter)
        || ("province_code" in currentFilter));
    const showFilterBar = () => {
        setIsShowFilter(!isShowFilter);
    }
    const handleChangeSort = (value) => {
        const currentLocation = queryString.parse(location.search);
        const newLocation = {
            ...currentLocation,
            sort: value.value,
        }
        history.push(`/?${queryString.stringify(newLocation)}`)
    }
    return (
        <div className="homebar">
            <div className="homebar__top">
                <Select className="homebar__top__select" 
                    options={options} 
                    defaultValue={currentFilter.sort ? options.find((item) => item.value === currentFilter.sort) : options[0]} 
                    onChange={handleChangeSort}
                />
                <Categories />
                <button
                    className="homebar__top__filter" onClick={showFilterBar}>
                    <RiFilter3Fill />
                    Lọc
                </button>
            </div>

            <AnimatePresence initial={false}>
                {isShowFilter && (
                <motion.section
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 }
                    }}
                    transition={{ duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }}
                     >
                    <FilterBar currentFilter={currentFilter}/>
                </motion.section>
                )}
            </AnimatePresence>

      </div>
    );
}

export default HomeBar;