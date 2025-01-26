import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Homes/Home';
import Add from './pages/Add'
import Updatefood from './pages/Updatefood';
import Deletefood from './pages/Updatefood';
import Getfood from './pages/Getfood';
import Allfood from './pages/Allfood';
import UserNavBar from './pages/UserNavBar';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Userhome from './pages/Userhome';
import Carteditems from './pages/Carteditems';
import NavBar from './pages/NavBar';
import CustomerInterface from './pages/CustomerInterface';
import ClientInterface from './pages/ClientInterface';


function App() {
  const location = useLocation();

  // Show NavBar for restaurant-related paths; otherwise, show UserNavBar
  const isRestaurantPath = location.pathname.startsWith('/restaurant') || location.pathname.startsWith('/foods');

  return (
    <>
      {isRestaurantPath ? <NavBar /> : <UserNavBar />}

      <Routes>
        <Route path="/items" element={<Userhome />} />
        <Route path="/" element={<CustomerInterface />} />
        <Route path="/foods/add" element={<Add/>} />
        <Route path="/foods/edit/:id" element={<Updatefood />} />
        <Route path="/foods/delete/:id" element={<Deletefood />} />
        <Route path="/foods/details/:id" element={<Getfood />} />
        {/* <Route path="/foods" element={<Allfood />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/cart/:email" element={<Carteditems />} />
        <Route path="/restaurant/youritems" element={<Home />} />
        <Route path="/restaurant" element={<ClientInterface />} />
      </Routes>
    </>
  );
}

export default App;
