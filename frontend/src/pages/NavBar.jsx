import React from 'react'
import {Link} from 'react-router-dom'
import { useState,useEffect } from 'react'

function NavBar({ setCustomView }) {
  const [userEmail,setuserEmail]=new useState(null)
  useEffect(()=>{
    const curUser=localStorage.getItem('userEmail')
    if(curUser){
      setuserEmail(curUser);
    }
  },[])
  const logouthandle=()=>{
    setuserEmail(null)
    localStorage.removeItem('userEmail')
    ocalStorage.removeItem('resturantName')
    
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" >FitFoods</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link  to='/restaurant' className="nav-link active" aria-current="page" >Home</Link>
        </li>
        <li className="nav-item">
          <Link  to='/foods/add' className="nav-link" >Add Meal</Link>
        </li>
        <li className="nav-item">
          <Link  to='/restaurant/youritems' className="nav-link" >Your Food Items</Link>
        </li>
        <li className="nav-item">
          <Link to='/' className="nav-link" >become customer</Link>
        </li>
        {userEmail?(
          <>
           <li className="nav-item">
          <span className="nav-link" >{userEmail}</span>
        </li>
        <li className="nav-item">
          <button    onClick={logouthandle} className="nav-link" >Logout</button>
        </li>
          </>
        ):(
          <>
            <li className="nav-item">
          <Link  to='/login' className="nav-link" >login</Link>
        </li>
        <li className="nav-item">
          <Link  to='/signup' className="nav-link" >sign up</Link>
        </li>
          </>
        )}
      
        
   
        
      </ul>
      

      
    </div>
  </div>
</nav>
  )
}

export default NavBar