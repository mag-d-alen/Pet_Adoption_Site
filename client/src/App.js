/** @format */
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import LogIn from './Components/LogIn';
import Home from './Components/Home';
import CreatePet from './Components/CreatePet';
import UpdatePet from './Components/UpdatePet';
import AdminHome from './Components/AdminHome';
import AppContext from './context/AppContext';
import './App.css';

require('dotenv').config();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [petList, setPetList] = useState('');
  const [openSidebar, setOpenSidebar] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        petList,
        setPetList,
        setOpenSidebar,
        openSidebar,
        currentUser,
        setCurrentUser,
      }}
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          {currentUser?.role == 'admin' && (
            <>
              <Route path='/admin' element={<AdminHome />} />
              <Route path='/admin/addPet' element={<CreatePet />} />
              <Route path='/admin/updatePet/:id' element={<UpdatePet />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
