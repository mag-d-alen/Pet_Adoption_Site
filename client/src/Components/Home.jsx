/** @format */

import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

import PetList from './PetList';
// import Sidebar from './Sidebar';
import Search from './Search';

import styled from '@emotion/styled';

export default function Home() {
  // const { openSidebar, setOpenSidebar } = useContext(AppContext);
  // const [openSearch, setOpenSearch] = React.useState(false);
  // const handleToggleOpenSearch = () => {
  //   setOpenSearch(!openSearch);
  //   setOpenSidebar(!openSidebar);
  // };
  return <div></div>;
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
