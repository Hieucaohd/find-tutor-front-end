import React from 'react';
import Loader from "react-loader-spinner";
import "./styles.scss";

function Loading({whiteBkg = false}) {
    return (
        <div className="spinner" style={{backgroundColor: whiteBkg ? '#F4F4F4' : 'rgba(0,0,0,0.5)'}}>
            <Loader type="Puff" color="#00BFFF" height={80} width={80} />
        </div>
    );
}

export default Loading;