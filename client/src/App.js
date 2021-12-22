/** @format */
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import LogIn from './Components/LogIn';
import Home from './Components/Home';
import CreatePet from './Components/CreatePet';
import PetPage from './Components/PetPage';
import AdminHome from './Components/AdminHome';
import Search from './Components/Search';
import AppContext from './context/AppContext';
import './App.css';

require('dotenv').config();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const token = localStorage.getItem('token');
  // useEffect(() => {
  //   !token && setIsLoggedIn(false);
  // }, [token]);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        setOpenSidebar,
        openSidebar,
        currentUser,
        token,
        setCurrentUser,
      }}
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/searchpet' element={<Search />} />
          <Route path='/searchpet/:id' element={<PetPage />} />
          {token && currentUser?.role === 'admin' && (
            <>
              <Route exact path='/admin' element={<AdminHome />} />
              <Route path='/admin/addPet' element={<CreatePet />} />
              {/* <Route path='/admin/updatePet/:id' element={<UpdatePet />} /> */}
            </>
          )}
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
