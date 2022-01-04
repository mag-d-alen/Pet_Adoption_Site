/** @format */
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
// import Profile from './Components/Profile';
import Home from './Components/Home';
import CreatePet from './Components/CreatePet';
import PetPage from './Components/PetPage';
import AllUsers from './Components/AllUsers';
import AllPets from './Components/AllPets';
import AdminHome from './Components/AdminHome';
import Search from './Components/Search';
import MyPets from './Components/MyPets';
import AppContext from './context/AppContext';
import Profile from './Components/Profile';
import { makeStyles } from '@mui/styles';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiPaper-root': {
      backgroundColor: 'mui is weird',
    },
  },
}));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const token = localStorage.getItem('token');
  const classes = useStyles();
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
      className={classes.root}
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/searchpet' element={<Search />} />
          <Route path='/searchpet/:id' element={<PetPage />} />
          <Route path='/mypets' element={token ? <MyPets /> : <Home />} />
          <Route path='/mypets/:id' element={token ? <PetPage /> : <Home />} />
          <Route path='/profile' element={token ? <Profile /> : <Home />} />

          <Route
            exact
            path='/admin'
            element={
              token && currentUser?.role === 'admin' ? <AdminHome /> : <Home />
            }
          >
            <Route path='addpet' element={<CreatePet />} />
            <Route path='allusers' element={<AllUsers />} />
            <Route path='allpets' element={<AllPets />} />
            <Route path='allpets/:id' element={<PetPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
