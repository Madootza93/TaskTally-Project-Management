import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { ThemeContext } from '../context/ThemeContext'; 
import Avatar from './Avatar';
import DashboardIcon from '../assets/dashboard_icon.svg';
import AddIcon from '../assets/add_icon.svg';


import './Sidebar.css';

export default function Sidebar() {
  const { user } = useAuthContext();
  const { sidebarColor } = useContext(ThemeContext);

  const sidebarStyle = {
    backgroundColor: sidebarColor,
  };
 

  return (
    <div className="sidebar" style={sidebarStyle}>
      <div className="sidebar-content">
        <div className="user">
          <Avatar src={user.photoURL} />
          <p>Hey, {user.displayName}!</p>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink exact to="/">
                <img src={DashboardIcon} alt="dashboard icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <img src={AddIcon} alt="add project icon" />
                <span>New Project</span>
              </NavLink>
             
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}