import React, { useState } from "react";
import "./OTPPopup.css";
import { FaCheckCircle } from "react-icons/fa"; // Font Awesome check circle icon
import axios from "axios";

const OTPPopup = ({ onNext, message }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [displayMessage, setDisplayMessage] = useState(message);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (displayMessage) {
      setDisplayMessage("");
    }
    if (/^\d*$/.test(value)) {
      setOtp(otp.map((digit, i) => (i === index ? value : digit)));
      if (index < otp.length - 1 && value !== "") {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    // Handle OTP verification logic here
    try {
      const response = await axios.post("/verify-otp", { otp: otpCode });
      const successMessage = response.data.message;
      alert(successMessage);
      onNext();
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="otp-popup">
      <div className="otp-popup-content">
        <div className="otp-heading">Verify Your Account</div>
        <div className="otp-icon">
          <FaCheckCircle size={50} color="#fff" />
        </div>
        {displayMessage && <p className="success-message">{displayMessage}</p>}
        {error && <p className="error-message">{error}</p>}
        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              className="otp-input"
              autoComplete="off"
            />
          ))}
        </div>
        <button className="verify-btn" onClick={handleVerify}>
          Verify OTP
        </button>
        <div className="go-back">
          <span>Go back to sign in ? </span>
          <a href="/sign-in" className="sign-in-link">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default OTPPopup;
