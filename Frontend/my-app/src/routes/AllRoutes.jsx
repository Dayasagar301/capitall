// src/routes/AllRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import SellItem from '../pages/SellItem/SellItem';
import UnsoldItems from '../pages/UnsoldItems/UnsoldItems';
import MyItems from '../pages/MyItems/MyItems';
import UpdateForm from '../updateForm/UpdateForm';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/sell" element={<SellItem />} />
      <Route path="/updateform/:itemId" element={<UpdateForm />} />
      <Route path="/unsold" element={<UnsoldItems />} />
      <Route path="/myitems" element={<MyItems />} />
    </Routes>
  );
};

export default AllRoutes;
