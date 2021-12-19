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

// import Drawer from '@mui/material/Drawer';

// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

export default function Navbar() {
  const { isLoggedIn, currentUser } = useContext(AppContext);
  const [open, setOpen] = React.useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

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
  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar);
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
          {openSidebar && <Sidebar handleOpenSidebar={handleOpenSidebar} />}
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
            <StyledDiv>
              Welcome {currentUser.firstName} {currentUser.lastName}!
            </StyledDiv>
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
