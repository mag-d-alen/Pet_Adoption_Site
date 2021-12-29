/** @format */

import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import { Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import axios from 'axios';
import UserList from './UserList';
const url = 'http://localhost:8000';

export default function AllUsers() {
  const { token } = useContext(AppContext);
  const [showPets, setShowPets] = useState(false);
  const [showUsers, setShowUsers] = useState([]);
  const [petList, setPetList] = useState([]);

  useEffect(() => {
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
    showAllUsers();
  }, []);

  return (
    <Grid align='center'>
      <UserList userList={showUsers} />
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
const StyledButton = styled(Button)`
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
