import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./NotificationsAndAlerts.css";
import axios from "axios";

const NotificationsAndAlerts = ({ setHasNotifications }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/notifications/employee/missing-info");
        setNotifications(res.data);
        setHasNotifications(res.data.length > 0); // Notify Navbar
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notifications", error.message);
        setLoading(false);
      }
    };
    fetchNotifications();
  }, [setHasNotifications]);

  return (
    <div className="notifications-dropdown">
      <h2>Notifications & Alerts</h2>
      <ul className="notifications-list">
        {loading ? (
          <li className="notification-item">Loading...</li>
        ) : notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <li key={index} className={`notification-item ${notification.type}`}>
              {notification.message}
            </li>
          ))
        ) : (
          <li className="notification-item">No notifications.</li>
        )}
      </ul>
    </div>
  );
};

NotificationsAndAlerts.propTypes = {
  setHasNotifications: PropTypes.func.isRequired,
};

export default NotificationsAndAlerts;
