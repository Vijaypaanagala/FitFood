import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Userhome.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const Userhome = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [email, setuserEmail] = useState(null);

  useEffect(() => {
    const curUser = localStorage.getItem('userEmail');
    if (curUser) {
      setuserEmail(curUser);
    }
  }, []);

  const handleAddToCart = (id) => {
    if (email) {
      const data = {
        email,
        id,
      };

      axios.post('http://localhost:3000/foods/addcart', data)
        .then(() => {
          console.log('Cart updated successfully');
        })
        .catch((err) => {
          console.error('Error adding to cart:', err);
        });
    } else {
      console.error('User email not available');
    }
  };

  // Fetch restaurants and food items on component mount
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:3000/foods/all-restaurants'); // Adjust the API path if necessary
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div>
      <h1>Restaurants and their Food Items</h1>
      {restaurants.length === 0 ? (
        <p>Loading...</p>
      ) : (
        restaurants.map((restaurant) => (
          <div key={restaurant._id} className="restaurant-container">
            <h2>{restaurant.name}</h2>
            <div className="food-items-container">
              {restaurant.fooditems.map((food) => (
                <div key={food._id} className="food-item">
                  <h4>{food.title}</h4>
                  <p>Protein: {food.protien}</p>
                  <p>Calories: {food.cal}</p>
                  <p>Price: {food.price}</p>
                  <div>
                    <Link to={`/foods/details/${food._id}`}>
                      <button className="view">View</button>
                    </Link>
                    <button onClick={() => handleAddToCart(food._id)} className="add">
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Userhome;
