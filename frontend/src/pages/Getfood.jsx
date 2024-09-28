import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function GetFood() {
  const [food, setFood] = useState(null); // Initialize with null to differentiate from empty object
  const [loading, setLoading] = useState(true); // Initialize with true
  const [error, setError] = useState(null); // State to hold error messages
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/foods/fooditem/${id}`)
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
        setError(err.message); // Store the error message
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {food ? (
        <div>
          <h1>{food.title}</h1>
          <p>Food_id: {food._id}</p>
          <p>Protien: {food.protien}</p>
          <p>Calories: {food.cal}</p>
          <p>Price: {food.price} /-</p>
          
        </div>
      ) : (
        <div>Food not found</div>
      )}
    </div>
  );
}

export default GetFood;
