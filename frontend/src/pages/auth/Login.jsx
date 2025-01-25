import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/Login.css'; // Import the CSS file

function Login() {
  const [email, setemail] = useState("");
  const [password, setpass] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate();

  const rehandle = async () => {
    const data = {
      email,
      password
    };
    try {
      const response = await axios.post('https://fitfood-bi0e.onrender.com/user/login', data);
      localStorage.setItem('userEmail', email);
      navigate('/');
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred'); // Update error state
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <input
          type="text"
          className="login-input"
          placeholder='Email'
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          type="password"
          className="login-input"
          placeholder='Password'
          onChange={(e) => setpass(e.target.value)}
        />
          {error && <div className="login-error">{error}</div>}
        <button className="login-button" onClick={rehandle}>Login</button>
       {/* Display error message */}
      </div>
    </div>
  );
}

export default Login;
