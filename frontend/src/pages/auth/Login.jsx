import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


function Login() {
 const  [email,setemail]=useState("")
  const [password,setpass]=useState("")
  const [resturant, setresturant] = useState("");
  const navigate= useNavigate()
  const rehandle=async ()=>{
    const data={
      email,
      password
    }
    try {
      const response = await axios.post('http://localhost:3000/user/login', data);
      localStorage.setItem('userEmail',email)
      localStorage.setItem('resturantName',resturant)
      navigate('/')
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.error || 'An error occurred');
    }

  }
  return (
    
      <div>
      <input 
        type="text" 
        placeholder='resurant name' 
        onChange={(e) => setresturant(e.target.value)} 
      /> 
      <br />
      <input type="text" placeholder='email' onChange={(e)=>setemail(e.target.value)} /> <br />
      <input type="text" placeholder='password' onChange={(e)=>setpass(e.target.value)} /> <br />
      <button onClick={rehandle}>Login</button>
    </div>
  )
}

export default Login