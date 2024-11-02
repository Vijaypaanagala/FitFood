import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Userhome.css';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/empty image.webp';
import Footer from './Footer'

const Userhome = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [email, setUserEmail] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const curUser = localStorage.getItem('userEmail');
    if (curUser) setUserEmail(curUser);
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (email) {
        try {
          const response = await axios.get(`http://localhost:3000/foods/getcart/${email}`);
          const existingCartIds = response.data.map((item) => item.foodid);
          setCartItems(existingCartIds);
        } catch (err) {
          console.error('Error fetching cart items:', err);
        }
      }
    };
    fetchCartItems();
  }, [email]);

  const handleAddToCart = (id) => {
    if (email) {
      const data = { email, id };
      axios.post('http://localhost:3000/foods/addcart', data)
        .then(() => {
          setCartItems([...cartItems, id]);
        })
        .catch((err) => {
          console.error('Error adding to cart:', err);
        });
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:3000/foods/all-restaurants');
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <div>
      <h1 >Restaurants and their Food Items</h1>
      {restaurants.length === 0 ? (
        <center><p style={{marginTop:'20px'}}>Loading...</p></center>
        
      ) : (
        restaurants.map((restaurant) => (
          <div key={restaurant._id} className="restaurant-container">
            <h3>{restaurant.name.split('@')[0]}</h3>
            <div className="food-items-container">
              {restaurant.fooditems.map((food) => (
                <div key={food._id} className="food-item">
                  <img
                    src={food.image ? `data:image/jpeg;base64,${food.image}` : avatar}
                    alt={food.title}
                    className="food-image"
                  />
                  <div className="food-details">
                    <h4>{food.title}</h4>
                    <p>Protein: {food.protein}</p>
                    <p>Calories: {food.cal}</p>
                    <p>Price: {food.price} /-</p>
                    <div>
                      <Link to={`/foods/details/${food._id}`}>
                        <button className="viewed">View</button>
                      </Link>
                      <button
                        onClick={() => handleAddToCart(food._id)}
                        className="add"
                        disabled={cartItems.includes(food._id)}
                      >
                        {cartItems.includes(food._id) ? 'Added' : 'Add'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
      <Footer/>
    </div>
  );
};

export default Userhome;
