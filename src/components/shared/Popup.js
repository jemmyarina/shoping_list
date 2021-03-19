import React from 'react';
import '../styles/popup.css';

const Popup = ({ hidePopup, children }) => {
    return (
        <>
            <div className="popup">
                {children}
            </div>
            <div className="popup-wrapper" onClick={hidePopup}></div>
        </>
    )
}

export default Popup
