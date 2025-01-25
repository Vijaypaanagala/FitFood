import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hometwo from './Hometwo';
import ShiningLoader from '../ShiningLoader';

function Home() {
  const [datas, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('userEmail');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setLoad(true);
      fetch(`http://localhost:3000/foods/${user}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setData(data);
          } else {
            setData([]); // Ensures it's an array
          }
          setLoad(false);
        })
        .catch((err) => {
          console.error(err);
          setLoad(false);
        });
    }
  }, [user]);

  return (
    <div>
        <h2 className='homeh1' style={{marginTop:'20px'}}>Your Food Items</h2>
      {load ? (
       <ShiningLoader count={10} height={250}/>
      ) : !user ? (
        <div>No user available</div>
      ) : datas.length === 0 ? (
        <div>No items yet</div>
      ) : (
        <>
      
        <Hometwo datas={datas} />
        </>
        
      )}
      

    </div>

  );
}

export default Home;
