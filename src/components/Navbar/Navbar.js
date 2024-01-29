import React, { useState } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = ({ isAuthenticated, navigationItems, location }) => {
  return (
    <nav className={`header__navigation ${isAuthenticated ? 'header__navigation_auth' : ''}`}>
      <ul className={`header__navigation-list ${isAuthenticated ? 'header__navigation-list_auth' : ''}`}>
        {navigationItems.map((item) => (
          <li key={item.title} className={`header__navigation-item ${isAuthenticated ? 'header__navigation-item_auth' : ''}`}>
            <NavLink
              to={item.link}
              className={`header__navigation-link ${isAuthenticated ? 'header__navigation-link_auth' : ''} ${location.pathname === item.link ? 'header__navigation-link_active' : ''}`}
            >
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

