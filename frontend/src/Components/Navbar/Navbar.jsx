import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaSignInAlt, FaSearch, FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";
// import NotificationsAndAlerts from "./NotificationsAndAlerts";

export default function Navbar(props) {
  const [isExpanded, setIsExpanded] = useState(false);
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

  // Fetch notifications when the component mounts
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
    <nav
      className={`navbar navbar-expand-lg bg-dark navbar-dark ${
        isExpanded ? "expanded" : ""
      }`}
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          style={{ width: "60px" }}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded={isExpanded}
          aria-label="Toggle navigation"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isExpanded ? "show" : ""}`}
          id="navbarSupportedContent"
        >



          
          <div className="mx-auto">
            <form className="d-flex" role="search">
              <div className="position-relative">
                <FaSearch
                  className="search-icon"
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "white",
                  }}
                />
                <input
                  className="form-control me-2 search-input"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </div>
              <button
                className="btn btn-outline-primary search-button"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>


          <ul className="navbar-nav">
            <li className="nav-item position-relative">
              <span className="nav-link" onClick={toggleNotifications} style={{ cursor: "pointer" }}>
                <FaBell className="icon" /> {/* Notification icon */}
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

            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={handleLogout}>
                <FaSignInAlt className="icon" /> Logout
              </a>
            </li>
          </ul>
        </div>
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
