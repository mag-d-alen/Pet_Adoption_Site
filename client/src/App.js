/** @format */
import React, { useContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import LogIn from './Components/LogIn';
import Home from './Components/Home';
import CreatePet from './Components/CreatePet';
import AppContext from './context/AppContext';

require('dotenv').config();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppContext.Provider
      value={{ isLoggedIn: isLoggedIn, setIsLoggedIn: setIsLoggedIn }}
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admin/addPet' element={<CreatePet />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
