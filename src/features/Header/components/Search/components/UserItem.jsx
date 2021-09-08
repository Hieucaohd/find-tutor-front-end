import { Avatar, makeStyles } from '@material-ui/core';
import React from 'react';

UserItem.propTypes = {
    
};

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        padding: '8px',
        borderRadius: '8px',
        "& h4": {
            margin: 0,
        },
        "& h5": {
            margin: 0,
            fontSize: '12px',
            fontWeight: '400',
        },
        '&:hover': {
            backgroundColor: '#ccc',
            cursor: 'pointer',
        }
    },
    avatar: {
        marginRight: '8px',
    }
})

function UserItem({userInfo, onShow, onClose}) {
    const classes = useStyles();
    const {user, first_name, last_name, profession} = userInfo;
    const getProfession = (job) => {
        if(job === 'sv'){
            return 'Sinh Viên';
        } else if(job === 'gv') {
            return 'Giáo Viên';
        }
        return 'Khác'
    }
    const handleShowUser = (id) => {
        onShow(id);
        onClose();
    }
    return (
        <div className={classes.root} onClick={() => handleShowUser(user.id)}>
            <Avatar className={classes.avatar} alt="avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH-hKqjdMBPMxy9KqzNx-xR_DWYJRkTmCY7w&usqp=CAU"/>
            <div> 
                <h4>{first_name} {last_name}</h4>
                <h5>{getProfession(profession)}</h5>
            </div>
        </div>
    );
}

export default UserItem;