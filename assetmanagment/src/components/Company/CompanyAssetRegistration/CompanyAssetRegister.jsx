import React, { useState, useRef } from "react";
import { QRCode } from "react-qrcode-logo";
import html2canvas from "html2canvas";
import "./CompanyAssetRegister.css";

const CompanyAssetRegister = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const [name, setName] = useState(user?.username || "");
  const [company, setCompany] = useState("");
  const [department, setDepartment] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [assetName, setAssetName] = useState("");
  const [assetUpdateDate, setAssetUpdateDate] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [qrCodeData, setQrCodeData] = useState(null);
  const [trackingId, setTrackingId] = useState("");

  const qrCodeContainerRef = useRef();

  const categories = ["Electronics", "Furniture", "Stationery", "Other"];
  const companys = ["Vella", "98 Acers", "Ravana Pool Club", "Flying Ravana", "Le Maas Tota", "Tea Factory"];
  const departments = ["IT", "HR", "Kitchen", "Front Office"];

  const companyAbbreviations = {
    "Vella": "V",
    "98 Acers": "98",
    "Ravana Pool Club": "RPC",
    "Flying Ravana": "FR",
    "Le Maas Tota": "LMT",
    "Tea Factory": "TF",
  };

  const departmentAbbreviations = {
    "IT": "IT",
    "HR": "HR",
    "Kitchen": "KT",
    "Front Office": "FO",
  };

 

const generateTrackingId = () => {
  const companyAbbr = companyAbbreviations[company] || company;
  const departmentAbbr = departmentAbbreviations[department] || department;

  const randomNum = String(Math.floor(Math.random() * 100000)).padStart(5, "0");


  if (serialNumber) {
    const serialSuffix = serialNumber.slice(-4).padStart(4, "0");
    return `${companyAbbr}-${departmentAbbr}-${serialSuffix}`;
  }

  return `${companyAbbr}-${departmentAbbr}-${randomNum}`;
};


  const handleSubmit = () => {
    if (!name || !company || !department || !category || !assetName || !assetUpdateDate) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    if (category === "Electronics" && !serialNumber) {
      alert("Please enter a Serial Number for Electronics.");
      return;
    }

    const finalCategory = category === "Other" ? customCategory : category;

    if (!finalCategory) {
      alert("Please specify a category.");
      return;
    }

    if (!trackingId || !qrCodeData) {
      alert("Please generate a Tracking ID and QR Code before submitting.");
      return;
    }

    const assetData = {
      name,
      company,
      department,
      category: finalCategory,
      assetName,
      assetUpdateDate,
      serialNumber: category === "Electronics" ? serialNumber : null,
      trackingId,
    };

    console.log("Asset Data: ", assetData);
    alert("Asset Registered Successfully!");

    setName(user?.username || "");
    setCompany("");
    setDepartment("");
    setCategory("");
    setCustomCategory("");
    setAssetName("");
    setAssetUpdateDate("");
    setSerialNumber("");
    setQrCodeData(null);
    setTrackingId("");
  };

  const handleGenerateQR = () => {
    if (!name || !company || !department || !category || !assetName || !assetUpdateDate) {
      alert("Please fill in all fields before generating the QR code.");
      return;
    }

    if (category === "Electronics" && !serialNumber) {
      alert("Please enter a Serial Number for Electronics.");
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
      serialNumber: category === "Electronics" ? serialNumber : null,
      trackingId: uniqueTrackingId,
    });

    setQrCodeData(qrData);
  };

  const handleDownloadCombinedImage = async () => {
    try {
      if (!qrCodeContainerRef.current) return;

      const canvas = await html2canvas(qrCodeContainerRef.current);
      const link = document.createElement("a");
      link.download = "QRCodeWithTrackingID.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Failed to download the QR code image:", error);
      alert("Error occurred while downloading the QR code. Please try again.");
    }
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
              readOnly={Boolean(user)}
            />
            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            >
              <option value="">Select Company</option>
              {companys.map((com) => (
                <option key={com} value={com}>
                  {com}
                </option>
              ))}
            </select>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep} value={dep}>
                  {dep}
                </option>
              ))}
            </select>
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
            {category === "Electronics" && (
              <input
                type="text"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                placeholder="Enter Serial Number"
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

export default CompanyAssetRegister;
