
import { useEffect, useState } from "react";



function AssetRegistration() {
  const [temp1, setTemp1] = useState("");
  const [temp2, setTemp2] = useState("");
  const [temp3, setTemp3] = useState("");
  const [word, setWord] = useState("");
  const [size, setSize] = useState(400);
  const [bgColor, setBgColor] = useState("ffffff");
  const [qrCode, setQrCode] = useState("");
  const [trackingCode, setTrackingCode] = useState("");

  // Generate QR code URL when inputs or tracking code change
  useEffect(() => {
    const combinedData = `${word} | Tracking Code: ${trackingCode}`;
    setQrCode(
      `http://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
        combinedData
      )}&size=${size}x${size}&bgcolor=${bgColor}`
    );
  }, [word, size, bgColor, trackingCode]);

  // Generate a unique tracking code
  function generateTrackingCode() {
    const timestamp = new Date().toISOString();
    const uniqueID = Math.random().toString(36).substring(2, 10).toUpperCase();
    return `${timestamp}-${uniqueID}`;
  }

  // Concatenate the inputs and update the word and tracking state
  function handleClick() {
    const tracking = generateTrackingCode();
    setTrackingCode(tracking);
    setWord(`${temp1} | ${temp2} | ${temp3}`);
  }

  return (
    <div className="AssetQR">
      <h1>QR Code Generator with Tracking</h1>
      <div className="input-box">
        <div className="gen">
          <input
            type="text"
            onChange={(e) => setTemp1(e.target.value)}
            placeholder="Enter first data"
          />
          <br></br>

          <input
            type="text"
            onChange={(e) => setTemp2(e.target.value)}
            placeholder="Enter second data"
          />
          <br></br>

          <input
            type="text"
            onChange={(e) => setTemp3(e.target.value)}
            placeholder="Enter third data"
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

export default AssetRegistration;
