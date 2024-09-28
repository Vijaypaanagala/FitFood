import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Homes/Home';
import Addfood from './pages/addfood';
import Updatefood from './pages/updatefood';
import Deletefood from './pages/deletefood';
import Getfood from './pages/getfood';
import Allfood from './pages/Allfood';
import UserNavBar from './pages/UserNavBar';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Userhome from './pages/Userhome';
import Carteditems from './pages/Carteditems';
import { useState } from 'react';
import NavBar from './pages/NavBar';

function App() {
  const [userface, changecostom] = useState(true);

  return (
    <>
      {userface ? (
        <UserNavBar setCustomView={changecostom} />
      ) : (
        <NavBar setCustomView={changecostom} />
      )}

      <Routes>
        {userface?(
           <Route path='/' element={<Userhome />} />
        ):(
          <Route path='/' element={<Home />} />
        )}
       
        
        <Route path='/foods/add' element={<Addfood />} />
        <Route path='/foods/edit/:id' element={<Updatefood />} />
        <Route path='/foods/delete/:id' element={<Deletefood />} />
        <Route path='/foods/details/:id' element={<Getfood />} />
        <Route path='/foods' element={<Allfood />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/cart/:email' element={<Carteditems />} />
      </Routes>
    </>
  );
}

export default App;
