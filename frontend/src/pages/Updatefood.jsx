import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/UpdateFood.css'; // Import the CSS file

function Updatefood() {
  const [title, setTitle] = useState('');
  const [cal, setCal] = useState('');
  const [protein, setProtein] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://fitfood-bi0e.onrender.com/foods/fooditem/${id}`).then((res) => {
      console.log(res);
      setTitle(res.data.title);
      setProtein(res.data.protein);
      setCal(res.data.cal);
      setPrice(res.data.price);
    }).catch((err) => {
      console.log(err);
    });
  }, [id]);

  const handle = () => {
    const newData = {
      title,
      protein,
      cal,
      price
    };
    axios.put(`https://fitfood-bi0e.onrender.com/foods/fooditem/${id}`, newData).then(() => {
      console.log("success");
      navigate('/restaurant');
      window.location.reload();
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="update-food-container">
      <h1 className="update-food-title">Edit Food</h1>
      <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} /> <br />
      <input type="text" placeholder='Protein' value={protein} onChange={(e) => setProtein(e.target.value)} /> <br />
      <input type="text" placeholder='Calories' value={cal} onChange={(e) => setCal(e.target.value)} /> <br />
      <input type="text" placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} /> <br />
      <button onClick={handle}>Submit</button>
    </div>
  );
}

export default Updatefood;
