/** @format */

import React, { useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import { Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import axios from 'axios';
import PetList from './PetList';
import UserList from './UserList';

// import { Link } from 'react-router-dom';

const url = 'http://localhost:8000';

export default function AdminHome() {
  const { token } = useContext(AppContext);
  const [showPets, setShowPets] = useState(false);
  const [showUsers, setShowUsers] = useState([]);
  const [petList, setPetList] = useState([]);

  const showAllPets = async () => {
    if (showPets) {
      return setShowPets(false);
    } else {
      setShowUsers([]);
      try {
        const pets = await axios.get(`${url}/pet`, { params: token });
        setPetList(pets.data);
        setShowPets(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const showAllUsers = async () => {
    if (showUsers.length) {
      return setShowUsers([]);
    } else {
      try {
        setShowPets(false);
        const users = await axios.get(`${url}/user`, { params: token });
        setShowUsers(users.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Grid align='center'>
      <h1>The home of every Admin</h1>
      <Button onClick={showAllPets}>Show all pets</Button>
      <Button onClick={showAllUsers}>Show all users</Button>
      <StyledLink to='./addPet'>Add Pet</StyledLink>
      {showPets && <PetList petList={petList} />}
      {showUsers && <UserList userList={showUsers} />}
    </Grid>
  );
}
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
