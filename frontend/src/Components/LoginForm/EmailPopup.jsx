import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

function EmailPopup({ onClose, onNext }) {
  const emailRef = useRef(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const email = emailRef.current.value;
    try {
      const res = await axios.post("/request-pass-reset", { email });
      const message = res.data.message;
      setIsLoading(false);
      onNext(message); // Proceed to OTP popup
    } catch (error) {
      setIsLoading(false);
      emailRef.current.value = "";
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      }
    }
  };

  const handleChange = () => {
    setError("");
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <h2>Enter your email</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <input
            type="email"
            placeholder="Enter your email"
            ref={emailRef}
            required
            onChange={handleChange}
            disabled={isLoading}
          />
          <button type="submit">
            {isLoading ? "Sending OTP..." : "Submit"}
          </button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default EmailPopup;
