import React, { useState } from "react";
import "./assetCategorization.css";

const Categorization = () => {
  const [category, setCategory] = useState(""); // State for selected category
  const [customCategory, setCustomCategory] = useState(""); // Custom category input
  const [types, setTypes] = useState(""); // State for selected type
  const [customType, setCustomType] = useState(""); // Custom type input
  const [selectedParts, setSelectedParts] = useState([]); // State for selected computer parts

  const categories = ["Electronics", "Furniture", "Stationery", "Other"];

  // Define types based on the selected category
  const getTypesByCategory = (category) => {
    switch (category) {
      case "Electronics":
        return ["Computer", "Laptop", "Mobile Phone", "UPS", "Other"];
      case "Furniture":
        return ["Table", "Chair", "Sofa", "Cupboard", "Other"];
      case "Stationery":
        return ["Pen", "Notebook", "Marker", "Stapler", "Other"];
      default:
        return [];
    }
  };

  const typesList = getTypesByCategory(category);

  // Define computer parts for selection
  const computerParts = ["Full Pack", "Monitor", "Mouse"];

  // Handle checkbox changes
  const handlePartsChange = (part) => {
    setSelectedParts((prevSelectedParts) =>
      prevSelectedParts.includes(part)
        ? prevSelectedParts.filter((p) => p !== part) // Remove if already selected
        : [...prevSelectedParts, part] // Add if not selected
    );
  };

  return (
    <div className="body">
      <div className="asset-categorization">
        <div className="form-container">
          <h2>Asset Categorization</h2>
          <div className="input-box">
            {/* Category Dropdown */}
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value); // Update category
                setTypes(""); // Reset types when category changes
                setSelectedParts([]); // Reset selected parts
                setCustomCategory(""); // Reset custom category
                setCustomType(""); // Reset custom type
              }}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Input for custom category */}
            {category === "Other" && (
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Enter Category"
              />
            )}

            {/* Type Input or Dropdown */}
            {category && category !== "Other" && (
              <select
                value={types}
                onChange={(e) => {
                  setTypes(e.target.value);
                  setCustomType(""); // Reset custom type when type changes
                }}
              >
                <option value="">Select Type</option>
                {typesList.map((typ) => (
                  <option key={typ} value={typ}>
                    {typ}
                  </option>
                ))}
              </select>
            )}

            {category === "Other" && (
              <input
                type="text"
                value={customType}
                onChange={(e) => setCustomType(e.target.value)}
                placeholder="Enter Type"
              />
            )}

            {/* Input for custom type if "Other" is selected in the dropdown */}
            {types === "Other" && category !== "Other" && (
              <input
                type="text"
                value={customType}
                onChange={(e) => setCustomType(e.target.value)}
                placeholder="Enter Type"
              />
            )}

            {/* Display checkboxes for computer parts */}
            {types === "Computer" && (
              <div className="checkbox-group">
                <h3>Select Computer Parts</h3>
                {computerParts.map((part) => (
                  <div key={part}>
                    <input
                      type="checkbox"
                      value={part}
                      checked={selectedParts.includes(part)}
                      onChange={() => handlePartsChange(part)}
                    />
                    <label>{part}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categorization;
