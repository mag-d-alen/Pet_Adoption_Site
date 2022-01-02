/** @format */

import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PetList from './PetList';
const url = 'http://localhost:8000';

export default function AllPets() {
  const { token } = useContext(AppContext);
  const [showPets, setShowPets] = useState(false);
  const [showUsers, setShowUsers] = useState([]);
  const [petList, setPetList] = useState([]);

  useEffect(() => {
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
    showAllPets();
  }, []);

  return (
    <Grid align='center'>
      <PetList petList={petList} />
    </Grid>
  );
}
