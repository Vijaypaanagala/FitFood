import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import  { useState, useEffect } from 'react';
import Hometwo from './Hometwo';

function Home() {
  const [datas, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [user ,setuser]= useState(null)
  const restaurantName =localStorage.getItem('resturantName')
  const navigate=useNavigate()
  useEffect(() => {
    setLoad(true);
    const isuser=localStorage.getItem('userEmail')
  if(isuser){
    setuser(isuser)
  }
    fetch(`http://localhost:3000/foods/${restaurantName}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Log the data to inspect
        setData(data); // Store the fetched data in the state
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
        setLoad(false);
      });
  }, []);

  return (
    <>
    
<div>
      {load ? (
        <h1>Loading....</h1>
      ) : (
        !user ? (
          <div>no items yet</div>
          
        ):(
          <Hometwo datas={datas} />
        )
        
      )}
    </div>
</>
  )
}

export default Home