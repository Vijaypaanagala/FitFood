import React from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'


function Deletefood() {
  const {id}=useParams();
  const navigate=useNavigate()
  const handleDel=()=>{
    axios.delete(`http://localhost:3000/foods/fooditem/${id}`).then(
      console.log('sucess del'),
      navigate('/restaurant'),
      window.location.reload()
    ).catch((err)=>{
      console.log(err)
    })
  }
  const canc=()=>{
    navigate('/restaurant')
  }
  return (
    <div>
          <h1>Delete Food item</h1>
          <p>Are you sure to delete food item id has {id} </p>
          <button onClick={canc}>cancel</button>
          <button onClick={handleDel}>sure</button>
    </div>
  
  )
}

export default Deletefood