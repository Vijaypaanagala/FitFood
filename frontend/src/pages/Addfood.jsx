import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AddFood.css';

function AddFood() {
  const [title, setTitle] = useState('');
  const [cal, setCal] = useState('');
  const [protein, setProtein] = useState('');
  const [price, setPrice] = useState('');
  const [user, setUser] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(''); // State for error message
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();

  useEffect(() => {
    const restaurant = localStorage.getItem('userEmail');
    if (restaurant) {
      setUser(restaurant);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check if the user is logged in
    if (!user) {
      setError('Please log in to add food items.');
      return navigate('/login');
    }

    // Check if all fields are filled
    if (!title || !cal || !protein || !price || !image) {
      setError('All fields are required, including the image.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    formData.append('protein', protein);
    formData.append('cal', cal);
    formData.append('price', price);
    formData.append('user', user);

    setLoading(true); // Start loading

    try {
      await axios.post('http://localhost:3000/foods', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Food item added successfully!');
      navigate('/restaurant');
    } catch (err) {
      console.error('Error adding food item:', err);
      setError('Failed to add food item. Please try again.');
    } finally {
      setLoading(false); // Stop loading after API call
    }
  };

  return (
    <>
      <center><h2 className="addfoodh2">Add Your Food Details</h2></center>
      
      <div className="add-food-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <label
  htmlFor="profileImage"
  className="register-label"
  style={{
    float: 'left',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#555', // Subtle gray color
    marginBottom: '-5px',
    marginTop: '5px',
    display: 'block', // Ensures it stays above the input
    padding: '5px 0',
  }}
>
  Upload your item image
</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <input
            type="text"
            placeholder="Protein"
            onChange={(e) => setProtein(e.target.value)}
            value={protein}
          />
          <input
            type="text"
            placeholder="Calories"
            onChange={(e) => setCal(e.target.value)}
            value={cal}
          />
          <input
            type="text"
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
          {error && <center><p className="error-message">{error}</p></center>}
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </>
  );
}

export default AddFood;
