import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';
import { makeStyles } from '@material-ui/core';

SearchBar.propTypes = {
    
};

const useStyles = makeStyles({
    root: {
        backgroundColor: "#F0F2F5",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "18px",
        padding: "6px",
        "&:hover": {
            cursor: "pointer",
        }
    },
    search: {
        display: "none"
    }
})

function SearchBar(props) {
    const classes = useStyles();
    const searchRef = useRef();
    const handleShowSearch = () => {

    }
    return (
        <div className={classes.root}>
            <AiOutlineSearch onClick={handleShowSearch}/>
            <input className={classes.search} type="text" />
        </div>
    );
}

export default SearchBar;