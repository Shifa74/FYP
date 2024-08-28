import axios from "axios";
import React, { useRef, useEffect, useState } from "react";

function NewPasswordPopup({ onClose, onPasswordUpdate }) {
  const newPasswordRef = useRef(null);
  const cPasswordRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    newPasswordRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPassword = newPasswordRef.current.value;
    const confirmPassword = cPasswordRef.current.value;
    if (newPassword === confirmPassword) {
      try {
        const res = await axios.post("/reset-password", { newPassword });
        console.log(res.data);
        onPasswordUpdate(res.data.message); // Handle password update and close the popup
      } catch (error) {
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          onPasswordUpdate(errorMessage);
        }
      }
    } else {
      newPasswordRef.current.value = "";
      cPasswordRef.current.value = "";
      setError("Passwords do not match");
    }
  };

  const handleChange = () => {
    setError("");
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <h2>Set New Password</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <input
            type="password"
            placeholder="Enter new password"
            ref={newPasswordRef}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            ref={cPasswordRef}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default NewPasswordPopup;
