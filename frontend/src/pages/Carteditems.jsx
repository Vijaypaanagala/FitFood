import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import avatar from '../assets/empty image.webp';
import '../styles/CartedItems.css'; // Import the CSS file

function Carteditems() {
  const { email } = useParams(); 
  const [foodDetails, setFoodDetails] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleDelToCart = async (foodid) => {
    try {
      const response = await axios.delete(`https://fitfood-bi0e.onrender.com/foods/deletecartitem/${foodid}`);
      window.location.reload();
      console.log(response.data); 
    } catch (error) {
      console.error('Error deleting food item:', error);
    }
  }; 
  
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartResponse = await axios.get(`https://fitfood-bi0e.onrender.com/foods/getcart/${email}`);
        const foodIds = cartResponse.data;

        const foodDetailsPromises = foodIds.map(item =>
          
          axios.get(`https://fitfood-bi0e.onrender.com/foods/fooditem/${item.foodid}`),
          console.log(foodIds)
          
        );

        const foodDetailsResponses = await Promise.all(foodDetailsPromises);
        const foodItems = foodDetailsResponses.map(response => response.data);

        setFoodDetails(foodItems); 
        setLoading(false);
        const total = foodItems.reduce((sum, food) => sum + food.price, 0);
        setTotalPrice(total);
      } catch (error) {
        console.error('Error fetching food details:', error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [email]);

  return (
    <>
    <center> <h3 style={{marginTop:'20px'}}>Your Cart Items</h3></center>
   
    <div className="cart-container">

      {loading ? (
        <p className="cart-loading">Loading...</p>
      ) : foodDetails.length === 0 ? (
        <p className="cart-empty">No items in the cart</p>
      ) : (
        foodDetails.map((food) => (
          <div key={food._id} className="cart-item">
            <img 
              src={food.image ? `data:image/jpeg;base64,${food.image}` : avatar} 
              alt={food.title} 
              style={{ width: '120px', height: '100px' }} 
            />
            <div>
              <h4>{food.title}</h4>
              <p>Protein: {food.protein}</p>
              <p>Calories: {food.cal}</p>
              <p>Price: {food.price} /-</p>
            </div>
            <button onClick={() => handleDelToCart(food._id)} className="add">Remove</button>
          </div>
        ))
      )}
      <h3 className="cart-total">Total Amount: ₹{totalPrice}</h3>
    </div>
    </>
  );
}

export default Carteditems;
