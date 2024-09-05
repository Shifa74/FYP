// import { useNavigate } from 'react-router-dom';

import React, { useState,useEffect } from "react";
import "./LoginRegisterForm.css";
import EmailPopup from "./EmailPopup";
import OTPPopup from "./OTPPopup";
import NewPasswordPopup from "./NewPasswordPopup";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from 'react-router-dom';  // Import useNavigate

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isEmailPopupOpen, setIsEmailPopupOpen] = useState(false);
  const [isOTPPopupOpen, setIsOTPPopupOpen] = useState(false);
  const [isNewPasswordPopupOpen, setIsNewPasswordPopupOpen] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();  // Initialize the useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }
  
    try {
      const res = await axios.post("/auth/login", { email, password });
      console.log(res.data);
      // Assuming successful login, navigate to the dashboard
      navigate('/dashboard');
      if (onLogin) onLogin(); // Call onLogin to update authentication state in App
    } catch (error) {
      setEmail("");
      setPassword("");
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (errorData.field) {
          setErrors({ [errorData.field]: errorData.message });
        }
      }
    }
  };
  

  useEffect(() => {
    if (email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  }, [email]);

  useEffect(() => {
    if (password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  }, [password]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const openEmailPopup = () => {
    setIsEmailPopupOpen(true);
  };

  const closeEmailPopup = () => {
    setIsEmailPopupOpen(false);
  };

  const openOTPPopup = (message) => {
    setMessage(message);
    setIsEmailPopupOpen(false);
    setIsOTPPopupOpen(true);
  };

  const closeOTPPopup = () => {
    setIsOTPPopupOpen(false);
  };

  const openNewPasswordPopup = () => {
    setIsOTPPopupOpen(false);
    setIsNewPasswordPopupOpen(true);
  };

  const closeNewPasswordPopup = () => {
    setIsNewPasswordPopupOpen(false);
  };

  const handlePasswordUpdate = (error, message) => {
    setIsNewPasswordPopupOpen(false);
    if (error) {
      alert(error);
    } else if (message) {
      alert(message);
    }
  };

  const navigateToRegister = () => {
    navigate('/register');  // Navigate to the Register page
  };

  return (
   <div className="bg">
 <div className="wrapper login-container">
      <h1>Welcome Back!</h1>
      <form onSubmit={handleSubmit} autoComplete="off">
        <h2>Login to Your Account</h2>
        {errors.email && <p className="error-message">{errors.email}</p>}
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="off"
          />
          <FaEnvelope className="icon" />
        </div>
        {errors.password && <p className="error-message">{errors.password}</p>}
        <div className="input-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="off"
          />
          <FaLock className="icon" />
          <span
            onClick={togglePasswordVisibility}
            className="password-toggle-icon"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className="remember-forgot">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
          </label>
          <a href="#!" onClick={openEmailPopup}>
            Forgot password?
          </a>
        </div>
        <button type="submit">Login</button>
        <div className="register-link">
          <p>
            Don't have an account? <a href="#!" onClick={navigateToRegister}>Register</a>
          </p> {/* Add onClick to navigate */}
        </div>
      </form>

      {isEmailPopupOpen && (
        <EmailPopup onClose={closeEmailPopup} onNext={openOTPPopup} />
      )}
      {isOTPPopupOpen && (
        <OTPPopup onClose={closeOTPPopup} onNext={openNewPasswordPopup} message={message} />
      )}
      {isNewPasswordPopupOpen && (
        <NewPasswordPopup
          onClose={closeNewPasswordPopup}
          onPasswordUpdate={handlePasswordUpdate}
        />
      )}
    </div>
   </div>

   
  );
}

export default LoginForm;
