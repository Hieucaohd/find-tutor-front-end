import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ParentProfile from './components/ParentProfile/ParentProfile';
import TutorProfile from './components/TutorProfile/TutorProfile';

Profile.propTypes = {
    
};

function Profile(props) {
    return (
        <div>
            <Switch> 
                <Route exact="/profile/tutor/:tutorId" component={TutorProfile}/>
                <Route exact="/profile/parent/:parentId" component={ParentProfile}/>
            </Switch>
        </div>
    );
}

export default Profile;