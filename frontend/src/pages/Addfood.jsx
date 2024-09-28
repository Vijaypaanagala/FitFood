import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function addfood() {
  const [title,setTitle] = useState('');
  const [cal,setCal] = useState('');
  const [protien,setProtien] = useState('');
  const [price,setPrice] = useState('');
  const [rest,setres] = useState('');
  const navigate=useNavigate()
  useEffect(()=>{
    const resturant=localStorage.getItem('resturantName')
    if(resturant){
      setres(resturant)
    }
  },[])
  const handle=()=>{
    const newData={
      title,
      protien,
      cal,
      price,
      rest
    }
    axios.post('http://localhost:3000/foods',newData).then(
      console.log("sucess"),
      navigate('/'),
      window.location.reload()
    ).catch((err)=>{
      console.log(err)
    })
  }
  return (
    <div>
      <input type="text" placeholder='Title' onChange={(e)=>setTitle(e.target.value)} /> <br />
      <input type="text" placeholder='Protien' onChange={(e)=>setProtien(e.target.value)} /> <br />
      <input type="text" placeholder='Calories' onChange={(e)=>setCal(e.target.value)} /> <br />
      <input type="text" placeholder='Price' onChange={(e)=>setPrice(e.target.value)} /> <br />
      <button onClick={handle}>submit</button>
    </div>
  )
}

export default addfood