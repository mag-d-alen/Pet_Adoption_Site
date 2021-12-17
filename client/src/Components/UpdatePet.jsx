/** @format */

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import moduleName from '../context/AppContext';
import PetForm from './PetForm';
import { Grid, Header } from '@material-ui/core';
import styled from '@emotion/styled';
import { Pets as Icon } from '@mui/icons-material';
import axios from 'axios';
const url = 'http://localhost:8000/pet';

export default function UpdatePet(props) {
  const [confirmation, setConfirmation] = useState('');
  const { initialValues, id } = props;
  const handleSubmit = async (values, actions) => {
    console.log('values', values);
    const newPet = values;
    console.log('newPet', newPet);
    try {
      const result = await axios.put(`${url}/${id}`, newPet);
      setConfirmation(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid>
      <StyledHeader>
        Update Pet Info <StyledIcon />
      </StyledHeader>
      <PetForm
        handleSubmit={handleSubmit}
        initialValues={initialValues}
        confirmation={confirmation}
      />
    </Grid>
  );
}
const StyledIcon = styled(Icon)`
  padding: 0 0.7rem;
  color: lightgray;
`;
const StyledHeader = styled('div')`
  display: flex;
  justify-content: center;
  font-weight: 500;
  text-transform: uppercase;
`;
