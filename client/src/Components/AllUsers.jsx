/** @format */

import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import UserList from './UserList';
const url = 'http://localhost:8000';

export default function AllUsers() {
  const { token } = useContext(AppContext);
  const [showPets, setShowPets] = useState(false);
  const [showUsers, setShowUsers] = useState([]);

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
