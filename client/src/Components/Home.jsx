/** @format */

import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

import PetList from './PetList';
import Sidebar from './Sidebar';
import Search from './Search';

import styled from '@emotion/styled';
import { InputLabel } from '@mui/material';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export default function Home() {
  const { setIsLoggedIn, petList, openSidebar, setOpenSidebar } =
    useContext(AppContext);
  const [openSearch, setOpenSearch] = React.useState(false);
  const handleToggleOpenSearch = () => {
    setOpenSearch(!openSearch);
    setOpenSidebar(!openSidebar);
  };
  return (
    <div>
      {openSidebar && (
        <Sidebar handleToggleOpenSearch={handleToggleOpenSearch} />
      )}
      {openSearch && <Search />}

      {petList.length > 0 && <PetList petList={petList} />}
    </div>
  );
}
const StyledButton = styled('button')`
  margin: auto;
  border: none;
  color: white;
  border-radius: 0.2rem;
  font-size: 1.2rem;
  padding: 1rem 1.5rem;
  text-transform: uppercase;
  background-color: #b58151;
  &:hover {
    background-color: #3c2113;
  }
`;
