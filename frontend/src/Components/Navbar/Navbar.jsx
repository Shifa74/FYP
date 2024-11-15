import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaSignInAlt, FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";
import { FaMoneyCheckAlt } from 'react-icons/fa';
export default function Navbar(props) {
  const [isNotificationsVisible, setIsNotificationsVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
      navigate("/register");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = [
        { id: 1, type: "reminder", message: "Upcoming salary payment due in 3 days" },
        { id: 2, type: "alert", message: "Missing information for Employee ID: 1023" },
        { id: 3, type: "task", message: "Pending task: Approve leave requests" },
      ];
      setNotifications(data);
    };
    fetchNotifications();
  }, []);

  const toggleNotifications = () => {
    setIsNotificationsVisible(!isNotificationsVisible);
  };

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="navbar-brand payroll_icon_header">
          <FaMoneyCheckAlt className="payroll_icon" style={{ marginRight: '0.5rem'}} /> {/* Payroll icon */}
          
          <span className="text">Payroll</span>
        </div>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item position-absolute">
            <span className="nav-link" onClick={toggleNotifications} style={{ cursor: "pointer" }}>
              <FaBell className="noti_icon" />
            </span>
            {isNotificationsVisible && (
              <div className="notifications-dropdown">
                <h5>Notifications & Alerts</h5>
                <ul className="notifications-list">
                  {notifications.map((notification) => (
                    <li key={notification.id} className={`notification-item ${notification.type}`}>
                      {notification.message}
                    </li>
                  ))}
                </ul>
              </div>
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
  title: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: "set title here",
};
