import { makeStyles } from '@material-ui/core';
import { SearchParent, SearchTutor } from 'graphql/SearchQueries';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import UserItem from './components/UserItem';

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 800,
        
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 801,
    },
    searchForm: {
        width: '440px',
        height: '260px',
        padding: '20px',
        borderRadius: '4px',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        zIndex: 802,
    },
    inputSearch: {
        
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #ccc',
        height: '32px',
        padding: '4px',
        '& input':{
            flex: 1,
            border: 'none',
            fontSize: '16px',
        },
        '& select': {
            borderRadius: '4px',
            height: '100%',
            marginRight: '2px',
        },
        '& svg': {
            fontSize: '24px',
            margin: '0px 4px',
            color: '#ccc',
        }
    },
    searchList : {
       flex: 1,
       padding: 0,
       margin: 0,
       overflow: 'auto',
       marginTop: '8px',
       "& li": {
           listStyleType: 'none',
       }
    },
    notify: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#777373',
    }
})  

function Search({onClose}) {
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = useState({
        search: '',
        type: 'tutor',
    });
    const typingTimeoutRef = useRef(null);
    const searchRef = useRef(null);
    const typeRef = useRef(null);
    const [searchList, setSearchList] = useState([]);
    const history = useHistory();
    function handleSearchForm (e) {
        
        if(typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout( () => {
            setSearchTerm({
                ...searchTerm ,
                search: searchRef.current.value,
                type: typeRef.current.value,
            })
        }, 500)
    };
    function handleSearchType () {
        setSearchTerm({
            ...searchTerm,
            search: searchRef.current.value,
            type: typeRef.current.value,
        }) 
    }
    const handleShowUser = (userId) => {
        if(searchTerm.type === 'tutor'){
            history.push(`/profile/tutor/${userId}`);
        } else {
            history.push(`/profile/parent/${userId}`);
        }
    }
    useEffect( () => {
        const getList = async (searchTerm) => {
            if(searchTerm.type === 'tutor') {
                const listSearch = await SearchTutor(searchTerm.search);
                setSearchList(listSearch || []);
            } else {
                const listSearch = await SearchParent(searchTerm.search);
                setSearchList(listSearch || []);
            }
        }
        if(searchTerm.search === "") {
            setSearchList([]);
        } else {
            getList(searchTerm);
        }
    }, [searchTerm]);
    const handleClose = () => {
        onClose();
    }
    return (
        <div className={classes.root}>
            <div className={classes.overlay} onClick={handleClose}></div>
            <div className={classes.searchForm}>
                <div className={classes.inputSearch}>
                    <AiOutlineSearch />
                    <input type="text" placeholder="Tìm kiếm" onChange = {handleSearchForm} ref={searchRef}/>
                    <select name="choosetype" id="choosetype" onChange = {handleSearchType} ref={typeRef}>
                      <option value="tutor">Gia Sư</option>
                      <option value="parent">Phụ Huynh</option>
                    </select>
                </div>
                {searchList.length !== 0 && <ul className={classes.searchList}>
                    {searchList.map((item)=> (
                        <li key={item.id}><UserItem userInfo={item} onShow={handleShowUser} onClose={handleClose}/></li>
                    ))} 
                </ul>}
                {searchList.length === 0 && <div className={classes.notify}> 
                    Không có kết quả tìm kiếm 
                </div>}
            </div>
        </div>
    );
}

export default Search;