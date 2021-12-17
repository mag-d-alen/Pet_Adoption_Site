/** @format */

import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  List,
  Drawer,
  ListItem,
  Text,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import styled from '@emotion/styled';
import AppContext from '../context/AppContext';
import AdminHome from './AdminHome';

export default function Sidebar(props) {
  const { currentUser } = React.useContext(AppContext);
  const id = currentUser.id;
  return (
    <StyledBox role='presentation'>
      <List>
        <ListItem button key='Search' onClick={props.handleToggleOpenSearch}>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary='Search' />
        </ListItem>
        <ListItem button key='Profile'>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <Link to='/user/' params={{ id: id }}>
            Profile
          </Link>
        </ListItem>
        <ListItem button key='Home'>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <Link to='/myPets' params={{ id: id }}>
            My Pets
          </Link>
        </ListItem>

        {currentUser.role == 'admin' && (
          <ListItem button key='admin'>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <Link to='/admin'>Admin</Link>
          </ListItem>
        )}
      </List>
    </StyledBox>
  );
}
const StyledBox = styled(Box)`
  width: 10rem;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.07);
  margin-right: auto;
`;
