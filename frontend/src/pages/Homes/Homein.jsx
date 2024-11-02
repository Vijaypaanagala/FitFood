import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../../assets/empty image.webp';
import '../../styles/Homein.css';

function Homein({ item }) {
  return (
    <div className="res-item-container" key={item._id}>
      <img className="res-item-image" src={item.image ? `data:image/jpeg;base64,${item.image}` : avatar} alt={item.title} />
      
      <div className="res-item-details-container">
        <h2 className="res-item-title">{item.title}</h2>
        <p className="res-item-details">Protein: {item.protein}</p>
        <p className="res-item-details">Calories: {item.cal}</p>
        <p className="res-item-details">Price: {item.price} /-</p>

        <div className="res-button-container">
          <Link to={`/foods/details/${item._id}`}>
            <button className="res-item-button view">View</button>
          </Link>
          <Link to={`/foods/edit/${item._id}`}>
            <button className="res-item-button update">Update</button>
          </Link>
          <Link to={`/foods/delete/${item._id}`}>
            <button className="res-item-button delete">Delete</button>
          </Link>
        </div>
      </div>
    </div>
  );
}


export default Homein;
