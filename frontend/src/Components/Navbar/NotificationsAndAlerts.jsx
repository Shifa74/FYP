import React, { useState, useEffect } from 'react';
import './NotificationsAndAlerts.css';

const NotificationsAndAlerts = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications from the server or generate dummy data
    const fetchNotifications = async () => {
      // Example data
      const data = [
        { id: 1, type: 'reminder', message: 'Upcoming salary payment due in 3 days' },
        { id: 2, type: 'alert', message: 'Missing information for Employee ID: 1023' },
        { id: 3, type: 'task', message: 'Pending task: Approve leave requests' },
      ];
      setNotifications(data);
    };

    fetchNotifications();
  }, []);

  return (
    <div className="notifications-container">
      <h2>Notifications & Alerts</h2>
      <ul className="notifications-list">
        {notifications.map((notification) => (
          <li key={notification.id} className={`notification-item ${notification.type}`}>
            {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsAndAlerts;
