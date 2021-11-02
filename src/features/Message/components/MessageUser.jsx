import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';

MessageUser.propTypes = {
    
};

function MessageUser(props) {
    return (
        <div>
            <Avatar src={require("../../../assets/image/tutor.webp").default}/>
            <h4>Hiệp</h4>
        </div>
    );
}

export default MessageUser;