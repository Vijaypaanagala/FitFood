import React from 'react'
import { Link } from 'react-router-dom'


function Homein({ item }) {
  return (
    <div  key={item._id}>
      <h2>{item.title}</h2>
      <p>Calories: {item.cal}</p>
      <p>Price: {item.price}</p>
      <p>Protein: {item.protien}</p>
      
      
      <div >
        <Link to={`/foods/details/${item._id}`}><button>View</button></Link>
        <Link to={`/foods/edit/${item._id}`}><button>Update</button></Link>
        <Link to={`/foods/delete/${item._id}`}><button>Delete</button></Link>
      </div>
    </div>
  )
}

export default Homein
