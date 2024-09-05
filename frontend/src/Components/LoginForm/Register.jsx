import React, { useEffect, useState } from "react";
import "../LoginForm/LoginRegisterForm.css";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from "axios";
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");  // New state for success message

  const navigate = useNavigate();  // Initialize the useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {

        const res = await axios.post("/auth/signup", {
          email,
          password,
          confirmPassword,
        });
        console.log(res.data);
        setSuccessMessage("Account created successfully!");

        // Clear the form
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        
        // Set a timeout to navigate to the dashboard after showing the success message
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);  
      } catch (error) {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        if (error.response && error.response.data) {
          const errorData = error.response.data;
          if (errorData.field) {
            setErrors({ [errorData.field]: errorData.message });
          }
        }
      }
    } else {
      alert("Passwords do not match!");
    }
    console.log(email, password);
  };

  useEffect(() => {
    if (email) {
      setErrors(prevErrors => ({ ...prevErrors, email: "" }));
    }
  }, [email]);

  const navigateToLogin = () => {
    navigate('/login');  
  };

  return (

    <div className="bg">
    <div className="login-container">
      <div className="wrapper">
        <h1>Signup</h1>
        {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
        <form onSubmit={handleSubmit}>
          {errors.email && <p className="error-message">{errors.email}</p>}
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <MdEmail className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <FaLock className="icon" />
          </div>
          <button type="submit">Signup</button>
        </form>
        <div className="register-link">
          <p>
            Already have an account? <a href="#!" onClick={navigateToLogin}>Login</a> {/* Use onClick to navigate */}
          </p>
        </div>
      </div>
    </div>
    
    </div>
    
  );
};

export default Signup;
