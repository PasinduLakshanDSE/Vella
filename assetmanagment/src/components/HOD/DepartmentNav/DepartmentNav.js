
import React from 'react';
import './DepartmentNav.css';
import { Link } from 'react-router-dom';

const DepartmentNav = ({ toggleNavBar }) => {
  
  return (
    <div className='main'>
      <div id="nav-bar">
        <input id="nav-toggle" type="checkbox" />
        <div id="nav-header">
          <a id="nav-title" href="https://www.vellaglobal.com/" target="_blank" rel="noopener noreferrer">
          Department
          </a>
          <label htmlFor="nav-toggle" style={{ marginRight: '30px' }} onClick={toggleNavBar}>
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
            <Link to="/DepartmentAssetRegister" className="nav-link"> Asset Register</Link>
          </div>
          <div className="nav-button">
            <i className="fas fa-user"></i>
            <a href="/DepartmentUsers" className="nav-link">Company Users</a>
          </div>
          <div className="nav-button">
            <i className="fas fa-handshake"></i>
            <a href="/ServiceInfo" className="nav-link">Service</a>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default DepartmentNav;
