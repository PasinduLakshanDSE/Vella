import React from "react";

const AssetRegister = () =>{
    return (
        <div className="AssetQR">
          
          <div className="input-box">
            <div className="gen">
              <input
                type="text"
                onChange={(e) => setTemp1(e.target.value)}
                placeholder="Enter your Name"
              />
              <br></br>
    
              <input
                type="text"
                onChange={(e) => setTemp2(e.target.value)}
                placeholder="Enter  Company"
              />
              <br></br>
    
              <input
                type="text"
                onChange={(e) => setTemp3(e.target.value)}
                placeholder="Enter  Departmant"
              />
              <br></br>
              <button className="button" onClick={handleClick}>
                Generate
              </button>
            </div>
            
          </div>
          <div className="output-box">
            <img src={qrCode} alt="Generated QR Code" />
            <a href={qrCode} download="QRCode">
              <button type="button">Download</button>
            </a>
            <p><strong>Tracking Code:</strong> {trackingCode}</p>
          </div>
        </div>
      );

}

export default AssetRegister;



