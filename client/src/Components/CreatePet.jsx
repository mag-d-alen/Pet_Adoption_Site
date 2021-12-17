/** @format */
import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { Pets as Icon } from '@mui/icons-material';
import { Alert, FormHelperText, Input, InputAdornment } from '@mui/material';
import styled from '@emotion/styled';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import PetForm from './PetForm';
const url = 'http://localhost:8000';

export default function CreatePet() {
  const [alert, setAlert] = useState(false);
  const [confirmation, setConfirmation] = useState('');

  const handleSubmit = async (values, actions) => {
    const newPet = { ...values, id: uuidv4() };
    console.log(newPet);
    try {
      const result = await axios.post(`${url}/pet`, newPet);
      setConfirmation(result.data);
      // actions.setSubmitting(true);
      // setTimeout(() => {
      //   actions.resetForm();
      //   actions.setSubmitting(false);
      // }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid>
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
    </Grid>
  );
}
const StyledIcon = styled(Icon)`
  padding: 0 0.7rem;
  color: lightgray;
`;
const StyledHeader = styled('h1')`
  margin: 0 auto;
`;
