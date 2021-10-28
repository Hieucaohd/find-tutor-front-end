import React from 'react';
import Loader from 'react-loader-spinner';


function LoadingThreeDots(props) {
    return (
        <div className="threedots">
            <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
        </div>
    );
}

export default LoadingThreeDots;