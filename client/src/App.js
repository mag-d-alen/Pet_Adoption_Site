/** @format */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import LogIn from './Components/LogIn';
import Home from './Components/Home';
require('dotenv').config();

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LogIn />} />

          {/* <Route path='/' element={token ? <Home /> : <Login />} />
          <Route path='/signup' element={token ? <Profile /> : <SignUp />} />
          <Route path='/login' element={token ? <Home /> : <Login />} />

          {token && (
            <Route path='/profile' element={token ? <Profile /> : <Login />} />
          )} */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
