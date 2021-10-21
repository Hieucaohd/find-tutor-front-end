import { CircularProgress } from '@material-ui/core';
import React from 'react';

function LoadingField(props) {
    return (
        <div className="settings__tutor" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
            <CircularProgress />
        </div>
    );
}

export default LoadingField;