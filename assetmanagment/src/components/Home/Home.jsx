import React from 'react'
import './home.css'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    
    <div className='main'>
      
      
      <div className="homepage" style={{ backgroundImage: `url('./Vella.jpg')` }}>


      {/* Navigation Bar */}

      <header className="navbar">
      <div className="logo">Asset Management System</div>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/DepartmentDashBoard">Products</Link>
          </li>
          <li>
            <Link to="/CompanyDashBord">About Us</Link>
          </li>
          <li>
            <Link to="/AdminDashboardPage">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Manage Your Assets Efficiently</h1>
          <p>Track, organize, and manage your assets with ease.</p>
          <button className="cta-button">
            <Link to="/Login">Get Started</Link>
          </button>
        </div>
      </section>

      {/* Features Section */}
<section id="features" className="features">
  <h2>Our Features</h2>
  <div className="feature-cards">
    <div className="feature-card">
      <img src="/assetmanagment/public/assRegicon.png" alt="Asset Register" />
      <h3>Asset Register</h3>
      <p>Keep all Aseet list  in one place.</p>
    </div>
    <div className="feature-card">
      <img src="/assetmanagment/public/OwershTrafen.png" alt="Ownership Transfer" />
      <h3>Ownership Transfer</h3>
      <p>Easily transfer asset ownership securely.</p>
    </div>
    <div className="feature-card">
      <img src="/assetmanagment/public/RetimeDasrd.png" alt="Real-time Dashboard" />
      <h3>Real-time Dashboard</h3>
      <p>View key metrics and insights instantly.</p>
    </div>
  </div>
</section>


      {/* Footer */}
      <footer className="footer">
        <p>© 2024 Asset Management System. All rights reserved.</p>
      </footer>
    </div>
    </div>
  )
}

export default Home;
