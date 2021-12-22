/** @format */
//con ren in dialog
//material-theme
// create theme context wrpa app in it -> no need for consumer
//
import React, { useState, useContext } from 'react';
import {
  Dialog,
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  DialogContent,
} from '@mui/material';
import styled from '@emotion/styled';
import { Menu, Home } from '@mui/icons-material';
import SignUp from './SignUp';
import LogIn from './LogIn';
import AppContext from '../context/AppContext';
import Sidebar from './Sidebar';

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn, currentUser } = useContext(AppContext);
  const [open, setOpen] = React.useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleOpen = (event) => {
    console.log('handle open ');
    event.stopPropagation();

    setOpen(true);
  };
  const handleClose = (event) => {
    setOpen(false);
  };
  const handleBackdropClick = (event) => {
    event.stopPropagation();
    return false;
  };
  const handleSetIsRegistered = (value) => {
    setIsRegistered(value);
  };
  const handleOpenSidebar = (event) => {
    console.log('handle open sidebar');
    event.stopPropagation();
    setOpenSidebar(!openSidebar);
  };
  const handleLogout = (event) => {
    event.stopPropagation();
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Box>
      <StyledAppBar onClick={handleOpenSidebar}>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            onClick={handleOpenSidebar}
          >
            <Menu />
          </IconButton>
          {openSidebar && <Sidebar />}
          {!isLoggedIn && (
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              <Dialog
                open={open}
                onClose={handleClose}
                onBackdropClick={handleBackdropClick}
                disableEscapeKeyDown
              >
                <DialogContent>
                  {!isRegistered ? (
                    <SignUp
                      handleSetIsRegistered={handleSetIsRegistered}
                      handleClose={handleClose}
                    />
                  ) : (
                    <LogIn
                      handleSetIsRegistered={handleSetIsRegistered}
                      handleClose={handleClose}
                    />
                  )}
                </DialogContent>
              </Dialog>
            </Typography>
          )}
          {isLoggedIn ? (
            <>
              <StyledDiv>
                Welcome {currentUser.firstName} {currentUser.lastName}!
              </StyledDiv>
              <Button color='inherit' onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button color='inherit' onClick={handleOpen}>
              Login
            </Button>
          )}
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
}

const StyledAppBar = styled(AppBar)`
  position: 'relative';
  z-index: 1;
  background-color: #c4966a;
  color: rgb(255, 243, 230);
`;
const StyledDiv = styled('div')`
  margin-left: auto;
`;
