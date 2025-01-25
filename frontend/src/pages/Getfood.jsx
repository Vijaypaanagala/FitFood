import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import avatar from '../assets/empty image.webp';
import '../styles/View.css';

function GetFood() {
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`https://fitfood-bi0e.onrender.com/foods/fooditem/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setFood(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div><center style={{marginTop:'250px'}}>Loading...</center></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="view-card-container">
      {food ? (
        <div className="view-card">
          <h1 className="view-card-title">{food.title}</h1>
          <img
            src={food.image ? `data:image/jpeg;base64,${food.image}` : avatar}
            alt={food.title}
            className="view-card-image"
          />
          <p className="view-card-details">Protein: {food.protein}</p>
          <p className="view-card-details">Calories: {food.cal}</p>
          <p className="view-card-price">Price: {food.price} /-</p>
        </div>
      ) : (
        <div>Food not found</div>
      )}
    </div>
  );
}

export default GetFood;
