import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaSignInAlt, FaBell } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
import "./Navbar.css";
import { FaMoneyCheckAlt } from "react-icons/fa";
import NotificationsAndAlerts from "./NotificationsAndAlerts";

export default function Navbar({ title, handleLogout }) {
  const [isNotificationsVisible, setIsNotificationsVisible] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(false);

  
  const toggleNotifications = () => {
    setIsNotificationsVisible(!isNotificationsVisible);
    if (isNotificationsVisible) {
      setHasNotifications(false); // Stop ringing when notifications are viewed
    }
  };

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="navbar-brand payroll_icon_header">
          <FaMoneyCheckAlt
            className="payroll_icon"
            style={{ marginRight: "0.5rem" }}
          />
          <span className="text">{title}</span> {/* Display the passed title */}
        </div>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item position-absolute">
            <span
              className="nav-link"
              onClick={toggleNotifications}
              style={{ cursor: "pointer" }}
            >
              <FaBell
                className={`noti_icon ${hasNotifications ? "ringing" : ""}`}
              />
            </span>
            {isNotificationsVisible && (
              <NotificationsAndAlerts
                setHasNotifications={setHasNotifications}
              />
            )}
          </li>
          <li className="logout_nav-item">
            <a href="/login" className="nav-link" onClick={handleLogout}>
              <FaSignInAlt className="logout_icon" /> Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,  // Validate the title prop type
  handleLogout: PropTypes.func.isRequired,  // Validate the handleLogout prop type
};
