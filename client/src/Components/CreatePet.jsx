/** @format */
import React, { useState, useContext } from 'react';
import { Grid } from '@material-ui/core';
import { Pets as Icon } from '@mui/icons-material';
import styled from '@emotion/styled';
import axios from 'axios';
import AppContext from '../context/AppContext';
import PetForm from './PetForm';

const url = 'http://localhost:8000';
export default function CreatePet() {
  const { token } = useContext(AppContext);
  const [confirmation, setConfirmation] = useState('');

  const handleSubmit = async (values, actions) => {
    const newPet = { ...values, owner: '' };
    actions.resetForm();
    console.log(newPet);
    try {
      const result = await axios.post(`${url}/pet`, { token, newPet });
      setConfirmation(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledGrid>
      <StyledHeader>
        Add New Pet
        <StyledIcon />
      </StyledHeader>
      <PetForm
        handleSubmit={handleSubmit}
        initialValues={{
          type: '',
          name: '',
          adoptionStatus: '',
          picture: '',
          height: '',
          weight: '',
          color: '',
          bio: '',
          hypoallergenic: false,
          dietaryRestrictions: '',
          breed: '',
        }}
        confirmation={confirmation}
      />
    </StyledGrid>
  );
}
const StyledGrid = styled(Grid)`
  width: 60rem;
`;

const StyledIcon = styled(Icon)`
  padding: 0 0.7rem;
  color: lightgray;
`;
const StyledHeader = styled('h2')`
  color: #7a5d43a0;
  margin: 2rem auto;
  text-transform: uppercase;
`;
