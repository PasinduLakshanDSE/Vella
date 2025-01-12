import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedOption, setSelectedOption] = useState("Admin"); // Default option
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const validateForm = (e) => {
    e.preventDefault();
    if (!username || !password || !selectedOption) {
      setError("All fields are required.");
      setShowError(true);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(e)) return;

    try {
      const response = await axios.post('http://localhost:8000/api/users/login', {
        username,
        password,
        selectedOption, // Include selectedOption in the payload
      });

      const { selectedOption: role } = response.data;

      // Clear input fields
      setUsername("");
      setPassword("");
      setShowError(false);

      // Navigate based on role
      if (role === "Admin") {
        navigate('/AdminDashboardPage');
      } else if (role === "CompanyAdmin") {
        navigate('/CompanyDashBord');
      } else {
        setError("Unauthorized role.");
        setShowError(true);
      }
    } catch (error) {
      console.error(error);
      setError("Invalid username or password.");
      setShowError(true);
    }
  };

  return (
    <div className="main">
      <div className="container logmain">
        <div className="panel sign-in-panel">
          <h1 className="titleleft">Welcome to Asset Management System</h1>
        </div>
        <div className="panel sign-up-panel">
          <h1 className="titleright">Log In to Your Account</h1>
          <form className="signup-form" onSubmit={handleSubmit}>
            {showError && <p className="error-message">{error}</p>}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="role-dropdown"
            >
              <option value="Admin">Admin</option>
              <option value="CompanyAdmin">Company Admin</option>
            </select>
            <button type="submit" className="sign-up-button">
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
