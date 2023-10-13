import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import RegistrationForm from './components/user/RegistrationForm';
import UserProfile from './components/user/UserProfile';
import Login from './components/user/Login';
import CreateAdminAccount from './components/user/CreateUserForAdmins';
import UserList from './components/user/UserList';
import UpdateUser from './components/user/UpdateUser';
import DeleteUser from './components/user/DeleteUser';

import CreateCategory from './components/Categories/CreateCategoryAdmin';
import CategoriesList from './components/Categories/CategoriesList';
import CategoryDetail from './components/Categories/CategoryDetail';
import UpdateCategory from './components/Categories/UpdateCategory';
import DeleteCategory from './components/Categories/DeleteCategory';

import CreateOffer from './components/offers/CreateOffer'
import OffersList from './components/offers/OffersList';
import OfferDetails from './components/offers/OfferDetails';
import UpdateOffer from './components/offers/UpdateOffer';
import DeleteOffer from './components/offers/DeleteOffer';

import CreateAdminOffer from './components/admin_offers/CreateAdminOffer';
import AdminOffers from './components/admin_offers/AdminOffers';
import GetAdminOffer from './components/admin_offers/GetAdminOffer';
import DeleteAdminOffer from './components/admin_offers/DeleteAdminOffer';
import EditAdminOffer from './components/admin_offers/EditAdminOffer';

import Navbar from './components/navbar/navbar';
import './App.css';



function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path='/create-offer' element={<CreateOffer />} />
        <Route path='/offers-list' element={<OffersList />} />
      </Routes>

    </div>
  );
}

export default App;
