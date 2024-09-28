import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Carteditems() {
  const { email } = useParams(); 
  const [foodDetails, setFoodDetails] = useState([]); 
  const [loading, setLoading] = useState(true);
  const handleDelToCart = async (foodid) => {
    try {
      const response = await axios.delete(`http://localhost:3000/foods/deletecartitem/${foodid}`);
      window.location.reload();
      console.log(response.data); 
    } catch (error) {
      console.error('Error deleting food item:', error);
    }
  };
  

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        
        const cartResponse = await axios.get(`http://localhost:3000/foods/getcart/${email}`);
        const foodIds = cartResponse.data;


        const foodDetailsPromises = foodIds.map(item =>
          axios.get(`http://localhost:3000/foods/fooditem/${item.foodid}`)
        );

        
        const foodDetailsResponses = await Promise.all(foodDetailsPromises);

        const foodItems = foodDetailsResponses.map(response => response.data);

        setFoodDetails(foodItems); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching food details:', error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [email]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : foodDetails.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        foodDetails.map((food) => (
          <div key={food._id}>
            <h4>{food.title}</h4>
            <p>Protein: {food.protien}</p>
            <p>Calories: {food.cal}</p>
            <p>Price: {food.price}</p>
            <button onClick={() => handleDelToCart(food._id)} className="add">Remove</button>

          </div>
        ))
      )}
    </div>
  );
}

export default Carteditems;
