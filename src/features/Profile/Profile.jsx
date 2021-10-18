import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component'

const TutorProfile = loadable(() => import('./components/TutorProfile/TutorProfile'))
const ParentProfile = loadable(() => import('./components/ParentProfile/ParentProfile'))


function Profile() {
    return (
        <div>
            <Switch> 
                <Route exact path="/profile/tutor/:tutorId" component={TutorProfile}/>
                <Route exact path="/profile/parent/:parentId" component={ParentProfile}/>
            </Switch>
        </div>
    );
}

export default Profile;