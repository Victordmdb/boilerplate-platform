
import React from 'react';

import logo from 'assets/logo.png';

const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    // width: 49,
    padding: 9
}

const MainLogo = () => 
        <div style={containerStyle}>
                {/* <div className="mini-logo">
                    <img className="mini-logo-img" alt='Adible' src='assets/images/icon.png'/>
                    <img className="mini-logo-img-hover" alt='Adible' src='assets/images/logoCL.png'/>
                </div> */}
            <img alt='Prototype' style={{height: 30, maxWidth: "100%"}} src={logo}/>
        </div>

export default MainLogo;