import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/Register.css'; // Make sure to import the CSS file

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to hold error messages
  const navigate = useNavigate();

  const regHandle = async () => {
    const data = {
      email,
      password
    };

    try {
      const response = await axios.post('http://localhost:3000/user/register', data);
      console.log(response)
      localStorage.setItem('userEmail', email);
      navigate('/');
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred'); // Set error message
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create Account</h2>
        <input 
          type="email" 
          className="register-input" 
          placeholder='Email' 
          onChange={(e) => setEmail(e.target.value)} 
        /> 
        <br />
        <input 
          type="password" 
          className="register-input" 
          placeholder='Password' 
          onChange={(e) => setPassword(e.target.value)} 
        /> 
        <br />
        {error && <div className="register-error">{error}</div>} {/* Display error message */}
        <button className="register-button" onClick={regHandle}>Sign Up</button>
      </div>
    </div>
  );
}

export default Register;
