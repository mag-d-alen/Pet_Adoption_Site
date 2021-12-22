/** @format */
//con ren in dialog
//material-theme
// create theme context wrpa app in it -> no need for consumer
//
import React, { useState, useContext, useEffect } from 'react';
import {
  Dialog,
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  DialogContent,
} from '@mui/material';
import styled from '@emotion/styled';
// import { Menu, Home } from '@mui/icons-material';

// import AppContext from '../context/AppContext';
// import Sidebar from './Sidebar';

// import Drawer from '@mui/material/Drawer';

// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import UpdatePet from './UpdatePet';
import axios from 'axios';
const url = 'http://localhost:8000/pet';

export default function UpdatePetPopup(props) {
  const [initialValues, setInitialValues] = useState(props.initialValues);
  const id = props.initialValues._id;

  const [open, setOpen] = React.useState(false);

  const handleSubmit = async (values) => {
    props.handleUpdate(values);
  };

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
        <Dialog
          open={open}
          onClose={handleClose}
          onBackdropClick={handleBackdropClick}
          disableEscapeKeyDown
        >
          <DialogContent>
            <UpdatePet
              id={id}
              handleSubmit={handleSubmit}
              initialValues={initialValues}
            />
          </DialogContent>
        </Dialog>
      </Typography>

      <Button color='inherit' onClick={handleOpen} fullWidth>
        Update
      </Button>
    </Box>
  );
}

const StyledAppBar = styled(AppBar)`
  background-color: #c4966a;
  color: rgb(255, 243, 230);
`;
const StyledDiv = styled('div')`
  margin-left: auto;
`;
