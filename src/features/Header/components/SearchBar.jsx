import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

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
        "&:hover": {
            cursor: "pointer",
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
            <AiOutlineSearch onClick={handleShowSearch}/> 
        </div>
    );
}

export default SearchBar;