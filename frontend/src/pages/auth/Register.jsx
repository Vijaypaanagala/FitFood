import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resturant, setresturant] = useState("");
  const navigate= useNavigate()

  const regHandle = async () => {
    const data = {
      email,
      password
    };

    try {
      const response = await axios.post('http://localhost:3000/user/register', data);
      localStorage.setItem('userEmail',email)
      localStorage.setItem('resturantName',resturant)
      navigate('/')
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder='resurant name' 
        onChange={(e) => setresturant(e.target.value)} 
      /> 
      <br />
      <input 
        type="email" 
        placeholder='Email' 
        onChange={(e) => setEmail(e.target.value)} 
      /> 
      <br />
      <input 
        type="password"  // Changed to password type
        placeholder='Password' 
        onChange={(e) => setPassword(e.target.value)} 
      /> 
      <br />
      <button onClick={regHandle}>Sign Up</button>
    </div>
  );
}

export default Register;
