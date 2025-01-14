import React, { useState } from "react";
import { QRCode } from "react-qrcode-logo"; // Import QR Code library
import "./assetRegister.css"; // Import the CSS file for styling

const AssetRegister = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const [name, setName] = useState(user?.username || ""); // Default to logged-in user's username
  const [company, setCompany] = useState("");
  const [department, setDepartment] = useState("");
  const [category, setCategory] = useState("");
  const [assetName, setAssetName] = useState("");
  const [assetUpdateDate, setAssetUpdateDate] = useState(""); // Store asset update date
  const [qrCodeData, setQrCodeData] = useState(null); // Store QR code data

  const handleSubmit = () => {
    if (!name || !company || !department || !category || !assetName || !assetUpdateDate) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const assetData = {
      name,
      company,
      department,
      category,
      assetName,
      assetUpdateDate,
    };

    console.log("Asset Data: ", assetData);
    alert("Asset Registered Successfully!");

    // Clear the input fields
    setName(user?.username || ""); // Reset to the logged-in user's username
    setCompany("");
    setDepartment("");
    setCategory("");
    setAssetName("");
    setAssetUpdateDate("");
    setQrCodeData(null); // Reset QR code data
  };

  const handleGenerateQR = () => {
    if (!name || !company || !department || !category || !assetName || !assetUpdateDate) {
      alert("Please fill in all fields before generating the QR code.");
      return;
    }

    const qrData = JSON.stringify({
      name,
      company,
      department,
      category,
      assetName,
      assetUpdateDate,
    });

    setQrCodeData(qrData); // Set QR code data
  };

  return (
    <div className="asset-register">
      <div className="form-container">
        <h2>Asset Registration</h2>
        <div className="input-box">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your Name"
            readOnly={!!user} // Make read-only if the user is logged in
          />
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Enter Company"
          />
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Enter Department"
          />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter Asset Category"
          />
          <input
            type="text"
            value={assetName}
            onChange={(e) => setAssetName(e.target.value)}
            placeholder="Enter Asset Name"
          />
          <input
            type="date"
            value={assetUpdateDate}
            onChange={(e) => setAssetUpdateDate(e.target.value)}
            placeholder="Select Asset Update Date"
          />
          <div className="button-group">
            <button className="button" onClick={handleSubmit}>
              Submit
            </button>
            <button className="button generate-btn" onClick={handleGenerateQR}>
              Generate QR
            </button>
          </div>
        </div>
        {qrCodeData && (
          <div className="qr-container">
            <h3>Generated QR Code</h3>
            <QRCode
              value={qrCodeData}
              size={150}
              qrStyle="squares"
              logoImage="https://via.placeholder.com/30"
              logoWidth={40}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetRegister;
