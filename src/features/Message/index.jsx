import React from 'react';
import { NavLink } from 'react-router-dom';
import MessageUser from './components/MessageUser';
import "./styles.scss";

function Message(props) {
    return (
        <div className="container">
            <div className="message">
                <div className="message__all">
                    <NavLink to="#"> 
                        <MessageUser />
                     </NavLink>
                     <NavLink to="#"> 
                        <MessageUser />
                     </NavLink>
                     <NavLink to="#"> 
                        <MessageUser />
                     </NavLink>
                     <NavLink to="#"> 
                        <MessageUser />
                     </NavLink>
                    
                </div>
                <div className="message__inbox">

                </div>
            </div>
        </div>
    );
}

export default Message;