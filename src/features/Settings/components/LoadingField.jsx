import Loader from "react-loader-spinner";
import React from 'react';

function LoadingField(props) {
    return (
        <div className="settings__tutor" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh'}}>
            <Loader type="Rings" color="#00BFFF" height={80} width={80} />
        </div>
    );
}

export default LoadingField;