import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Departmentdashboard.css";

const DepartmentDashBoard = () => {
  const [bookings, setBookings] = useState([]);
  const [techniciansCount, setTechniciansCount] = useState(0);
  const [servicesCount, setServicesCount] = useState(0);
  const [usersCount, setUsers] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const bookingsResponse = await axios.get("/api/bookings/getallbookings");
        setBookings(bookingsResponse.data);

        const techniciansResponse = await axios.get("/api/technicians/gettechnician");
        setTechniciansCount(techniciansResponse.data.length);

        const usersResponse = await axios.get("/api/users/getallUsers");
        setUsers(usersResponse.data.length);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const cards = [
    { count: bookings.length, label: "Total Asset", color: "blue", icon: <i className="fas fa-calendar-days si"></i> },
    { count: techniciansCount, label: "Total categories  ", color: "green", icon: <i className="fas fa-gear si"></i> },
    { count: usersCount, label: "Total Users", color: "red", icon: <i className="fas fa-user si"></i> },
  ];

  return (
    <div>
      {/* Sidebar Navigation */}
      <div className="main">
        <div id="nav-bar">
          <input id="nav-toggle" type="checkbox" />
          <div id="nav-header">
            <a id="nav-title" href="https://www.vellaglobal.com/" target="_blank" rel="noopener noreferrer">
              Department
            </a>
            <label htmlFor="nav-toggle" style={{ marginRight: "30px" }}>
              <span id="nav-toggle-burger"></span>
            </label>
            <hr />
          </div>
          <div id="nav-content">
            <div className="nav-button">
              <i className="fas fa-palette"></i>
              <Link to="/DepartmentDashBoard" className="nav-link">Dashboard</Link>
            </div>
            <div className="nav-button">
              <i className="fas fa-gear"></i>
              <Link to="/DepartmentAssetRegister" className="nav-link">Asset Register</Link>
            </div>
            <div className="nav-button">
              <i className="fas fa-user"></i>
              <Link to="/DepartmentUsers" className="nav-link">Company Users</Link>
            </div>
            <div className="nav-button">
              <i className="fas fa-handshake"></i>
              <Link to="/ServiceInfo" className="nav-link">Service</Link>
            </div>
            <hr />
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="dashboard">
        <div className="dashboard-header">
          <h1 className="title">Dashboard</h1>
        </div>

        <div className="dashboard-cards">
          {cards.map((card, index) => (
            <div key={index} className="dashboard-card" style={{ backgroundColor: card.color }}>
              <div className="card-content">
                <h2>{card.count}</h2>
                <p>{card.label}</p>
              </div>
              <div className="card-icon">{card.icon}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentDashBoard;
