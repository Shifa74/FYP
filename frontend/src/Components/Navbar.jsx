import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Navbar.css";
import { FaSignInAlt, FaSearch,FaBell  } from "react-icons/fa"; // Import FaSearch icon
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
      navigate("/register");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
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
              <div className="position-relative ">
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
          <li className="nav-item">
              <a href="/notifications" className="nav-link">
                <FaBell className="icon" /> {/* Notification icon */}
              </a>
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
