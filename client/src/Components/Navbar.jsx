/** @format */
//con ren in dialog
//material-theme
// create theme context wrpa app in it -> no need for consumer
//
import React, { useState } from 'react';
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
import { Menu } from '@mui/icons-material';
import SignUp from './SignUp';
import LogIn from './LogIn';

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleBackdropClick = (event) => {
    event.stopPropagation();
    return false;
  };
  const handleSetIsRegistered = (value) => {
    setIsRegistered(value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <Dialog
              open={open}
              onClose={handleClose}
              onBackdropClick={handleBackdropClick}
              disableEscapeKeyDown
            >
              <DialogContent>
                {!isRegistered ? (
                  <SignUp handleSetIsRegistered={handleSetIsRegistered} />
                ) : (
                  <LogIn handleSetIsRegistered={handleSetIsRegistered} />
                )}
              </DialogContent>
            </Dialog>
          </Typography>
          <Button color='inherit' onClick={handleOpen}>
            Login
          </Button>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
}

const StyledAppBar = styled(AppBar)`
  background-color: rgb(66, 60, 54);
  color: rgb(255, 243, 230);
`;
