import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { IoSearchSharp } from 'react-icons/io5';

SearchBar.propTypes = {
    
};

const useStyles = makeStyles({
    root: {
        // backgroundColor: "#F0F2F5",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
        padding: "6px",
        color: "#797575",
        "&:hover": {
            cursor: "pointer",
            color: "#5472EA",
        }
    },
    search: {
        display: "none"
    }
})

function SearchBar({onShow}) {
    const classes = useStyles();
    const handleShowSearch = () => {
        onShow();
    }
    return (
        <div className={classes.root} onClick={handleShowSearch}>
            <IoSearchSharp onClick={handleShowSearch}/> 
        </div>
    );
}

export default SearchBar;