/** @format */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Drawer, ListItem, ListItemIcon } from '@mui/material';
import styled from '@emotion/styled';
import AppContext from '../context/AppContext';
import { Pets as Icon } from '@mui/icons-material';
import SearchPet from './SearchPet';

export default function Sidebar(props) {
  const [openSearch, setOpenSearch] = useState(false);
  const { currentUser } = React.useContext(AppContext);

  const handleToggleOpenSearch = () => {
    setOpenSearch(!openSearch);
  };
  return (
    <StyledDrawer variant='permanent'>
      <List>
        <ListItem button onClick={handleToggleOpenSearch}>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <StyledLink to='/searchpet'>Search</StyledLink>
        </ListItem>

        {currentUser?.role === 'user' && (
          <>
            <ListItem button key='Profile'>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <StyledLink to='/profile'>Profile</StyledLink>
            </ListItem>
            <ListItem button key='Home'>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <StyledLink to='/myPets'>My Pets</StyledLink>
            </ListItem>
          </>
        )}
        {openSearch && <SearchPet />}

        {currentUser?.role === 'admin' && (
          <ListItem button key='admin'>
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <StyledLink to='/admin'>Admin</StyledLink>
          </ListItem>
        )}
      </List>
    </StyledDrawer>
  );
}

const StyledDrawer = styled(Drawer)`
  & > * {
    background-color: #c4966ab5;
  }
`;
const StyledLink = styled(Link)`
  text-transform: uppercase;
  text-decoration: none;
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.87);
  line-height: 1.75;
  padding: 6px 16px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    text-decoration: none;
    color: rgba(0, 0, 0, 0.87);
  }
  &:visited {
    color: rgba(0, 0, 0, 0.87);
  }
`;
