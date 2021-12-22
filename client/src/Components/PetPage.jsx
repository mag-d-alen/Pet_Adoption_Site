/** @format */

import React, { useState, useEffect, useContext } from 'react';

import { useParams } from 'react-router-dom';
import axios from 'axios';
import AppContext from '../context/AppContext';
import {
  CardHeader,
  CardMedia,
  CardActions,
  CardContent,
  Collapse,
  Card,
  Typography,
  IconButton,
  Button,
  Paper,
  Grid,
} from '@mui/material';
import styled from '@emotion/styled';
const url = 'http://localhost:8000/pet';

export default function PetPage() {
  const params = useParams();
  const id = params.id;
  const [pet, setPet] = useState({});
  const { token } = useContext(AppContext);

  useEffect(() => {
    async function fetchInfo() {
      const result = await axios.get(`${url}/${id}`);
      setPet(result.data);
    }
    fetchInfo();
  }, []);
  console.log(pet);
  return (
    <Grid>
      <h1>HELLO</h1>
      <Paper>
        <Typography> {pet.name}</Typography>
        <CardMedia
          component='img'
          height='400'
          width='350'
          image={pet.picture}
        />
      </Paper>
    </Grid>
  );
}
