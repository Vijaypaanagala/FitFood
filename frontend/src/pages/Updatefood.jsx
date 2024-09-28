import React from 'react'
import { useState ,useEffect} from 'react'
import axios from 'axios'
import { useNavigate ,useParams} from 'react-router-dom'


function Updatefood() {
  const [title,setTitle] = useState('');
  const [cal,setCal] = useState('');
  const [protien,setProtien] = useState('');
  const [price,setPrice] = useState('');
  const navigate=useNavigate()
  const {id}=useParams()
useEffect(()=>{
axios.get(`http://localhost:3000/foods/fooditem/${id}`).then(
  (res)=>{
    console.log(res)

    setTitle(res.data.title),
    setProtien(res.data.protien),
    setCal(res.data.cal),
    setPrice(res.data.price)
  }
).catch((err)=>{
  console.log(err)
})
},[])
  const handle=()=>{
    const newData={
      title,
      protien,
      cal,
      price
    }
    axios.put(`http://localhost:3000/foods/fooditem/${id}`,newData).then(
      console.log("sucess"),
      navigate('/'),
      window.location.reload()
    ).catch((err)=>{
      console.log(err)
    })
  }
  return (
    <div>
      <h1>Edit Food</h1>
      <input type="text" placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)} /> <br />
      <input type="text" placeholder='Protien' value={protien} onChange={(e)=>setProtien(e.target.value)} /> <br />
      <input type="text" placeholder='Calories' value={cal} onChange={(e)=>setCal(e.target.value)} /> <br />
      <input type="text" placeholder='Price' value={price} onChange={(e)=>setPrice(e.target.value)} /> <br />
      <button onClick={handle}>submit</button>
    </div>
  )
}

export default Updatefood