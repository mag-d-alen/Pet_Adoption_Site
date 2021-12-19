/** @format */
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import LogIn from './Components/LogIn';
import Home from './Components/Home';
import CreatePet from './Components/CreatePet';
import UpdatePet from './Components/UpdatePet';
import AdminHome from './Components/AdminHome';
import Search from './Components/Search';
import AppContext from './context/AppContext';
import './App.css';

require('dotenv').config();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [openSidebar, setOpenSidebar] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState('');

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        setOpenSidebar,
        openSidebar,
        currentUser,
        setCurrentUser,
        token,
        setToken,
      }}
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/searchpet' element={<Search />} />
          {token && currentUser.role === 'admin' && (
            <>
              <Route path='/admin' element={<AdminHome />} />
              <Route exact path='/admin/addPet' element={<CreatePet />} />
              {/* <Route path='/admin/updatePet/:id' element={<UpdatePet />} /> */}
            </>
          )}
          />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
