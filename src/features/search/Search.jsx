import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { searchUser } from './searchuser';

Search.propTypes = {
    
};

function Search(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const typingTimeoutRef = useRef(null);

    function handleSearchForm (e) {

        const value = e.target.value;
        setSearchTerm(value);
        
        if(typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout( () => {
            searchUser ({"name": value});
        }, 300)
    }
    return (
        <div>
            <input type="text" onChange = {handleSearchForm}/>
        </div>
    );
}

export default Search;