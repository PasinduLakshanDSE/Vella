import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "animate.css";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import AdminNavBar from "./components/Admin/AdminNav/AdminNav";
import DashBoard from "./components/Admin/AdminDashBoard/AdminDashboardPage";
import AddUsersRole from "./components/Admin/AddUserRole/AddUserRole";
//import AssetRegistration from "./components/Admin/AssetRegistration/AssetRegistration";
import CompanyDashBord from "./components/Company/CompanyDashBoard/CompanyDashBoard";
import CompanyNavBar from "./components/Company/CompanyNav/CompanyNav";
import Login from "./components/Login/Login";
import Users from "./components/Admin/Users/Users";
import AssetRegister from "./components/Admin/AssetRegistration/AssetRegister";
import Categorization from "./components/Admin/AssetCategorization/Assetcategorization";
import CompanyUserRole from "./components/Company/CompanyUserRole/CompanyUserRole";
import CompanyAssetRegister from "./components/Company/CompanyAssetRegistration/CompanyAssetRegister";
import CompanyUsers from "./components/Company/CompanyUsers/CompanyUsers";
import DepartmentAssetRegister from "./components/HOD/DepartmentAssetRegistration/DepartmentAssetRegister";
import DepartmentDashBoard from "./components/HOD/DepartmentDashBoard/DepartmentDashboardPage";
import DepartmentNavBar from "./components/HOD/DepartmentNav/DepartmentNav";
import DepartmentUsers from "./components/HOD/DepartmentUsers/DepartmentUsers";


//import Users from "./components/Users/Users";


function App() {
  return (
    <div className="App">
      <Routes>
        
        <Route path="/" element={<Home/>}/>
        <Route path="/AdminNavBar" element={<AdminNavBar/>}/>
        <Route path="/AdminDashboardPage"  element={<DashBoard/>}/>
        <Route path="/AddUsersRole"  element={<AddUsersRole/>}/>
        <Route path="/CompanyUserRole" element={<CompanyUserRole/>}/>
        <Route path="/CompanyDashBord"  element={<CompanyDashBord/>}/>
        <Route path="/CompanyNavBar"  element={<CompanyNavBar/>}/>
        <Route path="/CompanyAssetRegister" element={<CompanyAssetRegister/>}/>
        <Route path="/CompanyUsers" element={<CompanyUsers/>}/>
        <Route path="/Login"  element={<Login/>}/>
        <Route path="/Users"  element={<Users/>}/>
        <Route path="/AssetRegister" element={<AssetRegister/>}/>
        <Route path="/category" element={<Categorization/>}/>
        <Route path="/DepartmentAssetRegister" element={<DepartmentAssetRegister/>}/>
        <Route path="/DepartmentDashBoard" element={<DepartmentDashBoard/>}/>
        <Route path="/DepartmentNavBar" element={<DepartmentNavBar/>}/>
        <Route path="/DepartmentUsers" element={<DepartmentUsers/>}/>
      </Routes>
    </div>
  );
}

export default App;
