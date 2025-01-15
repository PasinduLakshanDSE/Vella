import React, { useState, useRef } from "react";
import { QRCode } from "react-qrcode-logo";
import html2canvas from "html2canvas"; // Library to capture HTML as an image
import "./assetRegister.css";

const AssetRegister = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const [name, setName] = useState(user?.username || "");
  const [company, setCompany] = useState("");
  const [department, setDepartment] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [assetName, setAssetName] = useState("");
  const [assetUpdateDate, setAssetUpdateDate] = useState("");
  const [qrCodeData, setQrCodeData] = useState(null);
  const [trackingId, setTrackingId] = useState("");

  const qrCodeContainerRef = useRef(); // Reference to the combined QR code and tracking ID container

  // Predefined categories
  const categories = ["Electronics", "Furniture", "Stationery", "Other"];

  // Function to generate a unique tracking ID
  const generateTrackingId = () => {
    return `${company}-${department}-${Date.now()}`;
  };

  const handleSubmit = () => {
    if (!name || !company || !department || !category || !assetName || !assetUpdateDate) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const finalCategory = category === "Other" ? customCategory : category;

    if (!finalCategory) {
      alert("Please specify a category.");
      return;
    }

    const uniqueTrackingId = generateTrackingId();
    setTrackingId(uniqueTrackingId);

    const assetData = {
      name,
      company,
      department,
      category: finalCategory,
      assetName,
      assetUpdateDate,
      trackingId: uniqueTrackingId,
    };

    console.log("Asset Data: ", assetData);
    alert("Asset Registered Successfully!");

    // Clear the input fields
    setName(user?.username || "");
    setCompany("");
    setDepartment("");
    setCategory("");
    setCustomCategory("");
    setAssetName("");
    setAssetUpdateDate("");
    setQrCodeData(null);
    setTrackingId("");
  };

  const handleGenerateQR = () => {
    if (!name || !company || !department || !category || !assetName || !assetUpdateDate) {
      alert("Please fill in all fields before generating the QR code.");
      return;
    }

    const finalCategory = category === "Other" ? customCategory : category;

    if (!finalCategory) {
      alert("Please specify a category.");
      return;
    }

    const uniqueTrackingId = trackingId || generateTrackingId();
    setTrackingId(uniqueTrackingId);

    const qrData = JSON.stringify({
      name,
      company,
      department,
      category: finalCategory,
      assetName,
      assetUpdateDate,
      trackingId: uniqueTrackingId,
    });

    setQrCodeData(qrData);
  };

  const handleDownloadCombinedImage = async () => {
    if (!qrCodeContainerRef.current) return;

    const canvas = await html2canvas(qrCodeContainerRef.current);
    const link = document.createElement("a");
    link.download = "QRCodeWithTrackingID.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div>
      <div className="asset-register">
        <div className="form-container">
          <h2>Asset Registration</h2>
          <div className="input-box">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your Name"
              readOnly={!!user}
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
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {category === "Other" && (
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Enter Category"
              />
            )}
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
              <div ref={qrCodeContainerRef} className="combined-qr-container">
                <QRCode
                  value={qrCodeData}
                  size={150}
                  qrStyle="squares"
                  logoImage="https://via.placeholder.com/30"
                  logoWidth={40}
                />
                <p>ID: {trackingId}</p>
              </div>
              <button className="button download-btn" onClick={handleDownloadCombinedImage}>
                Download
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssetRegister;
