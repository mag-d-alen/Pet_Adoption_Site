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
import * as Yup from 'yup';
const url = 'http://localhost:8000';

export default function CreatePet() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const initialValues = {
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
  };
  const validationSchema = Yup.object().shape({
    type: Yup.string().required('Required'),
    name: Yup.string().min(2, 'Name is too short').required('Required'),
    adoptionStatus: Yup.string().required('Required'),
    //picture: Yup.string().url().required('Required'),
    picture: Yup.string().required('Required'),
    color: Yup.string()
      .min(3, 'Please enter correct color')
      .required('Required'),
    bio: Yup.string().required('Required'),
    breed: Yup.string()
      .min(3, 'Please enter correct breed')
      .required('Required'),
    weight: Yup.number()
      .positive()
      .max(80, 'Are you sure that the pet weights more than 80 kg?')
      .typeError('Please enter the correct weight')
      .required('Required'),
    height: Yup.number()
      .positive()
      .max(160, 'Are you sure that the pet is taller than 160cm?')
      .typeError('Please enter the correct height')
      .required('Required'),
    hypoallergenic: Yup.boolean().required(),
  });

  const handleSubmit = async (values, actions) => {
    console.log('here');
    const newPet = values;
    console.log(newPet);
    try {
      const result = await axios.post(`${url}/pet`, newPet);
      console.log(result);
      actions.setSubmitting(true);
      setTimeout(() => {
        actions.resetForm();
        actions.setSubmitting(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const types = ['cat', 'dog', 'turtle', 'piglet', 'snake', 'chinchila'];
  return (
    <Grid>
      <StyledPaper>
        <Grid align='center'>
          <StyledHeader>
            Add new pet <StyledIcon />
          </StyledHeader>
          <Typography variant='caption' gutterBottom>
            Please fill this form to ad new pet.
          </Typography>
        </Grid>

        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            handleSubmit(values, actions);
          }}
        >
          {(props) => (
            <StyledForm>
              <InputLabel id='name'>Name</InputLabel>
              <Field
                as={TextField}
                variant='filled'
                fullWidth
                name='name'
                required
                helperText={
                  <ErrorMessage
                    name='name'
                    render={(msg) => (
                      <StyledErrorMessage>{msg}</StyledErrorMessage>
                    )}
                  />
                }
              />
              <InputLabel id='type'> Choose Pet's type:</InputLabel>
              <Field
                id='type'
                as={Select}
                fullWidth
                variant='filled'
                name='type'
                helperText={
                  <ErrorMessage
                    name='type'
                    render={(msg) => (
                      <StyledErrorMessage>{msg}</StyledErrorMessage>
                    )}
                  />
                }
              >
                <MenuItem disabled value=''>
                  <em>Please Select</em>
                </MenuItem>
                {types.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Field>
              <InputLabel id='breed'>Breed</InputLabel>
              <Field
                as={TextField}
                variant='filled'
                fullWidth
                name='breed'
                required
                id='breed'
                helperText={
                  <ErrorMessage
                    name='breed'
                    render={(msg) => (
                      <StyledErrorMessage>{msg}</StyledErrorMessage>
                    )}
                  />
                }
              />
              <InputLabel id='adoptionStatus'> Adoption Status</InputLabel>
              <Field
                as={TextField}
                variant='filled'
                fullWidth
                name='adoptionStatus'
                required
                id='adoptionStatus'
                helperText={
                  <ErrorMessage
                    name='adoptionStatus'
                    render={(msg) => (
                      <StyledErrorMessage>{msg}</StyledErrorMessage>
                    )}
                  />
                }
              />
              <InputLabel id='weight'>Weight in kilograms</InputLabel>
              <Field
                as={TextField}
                variant='filled'
                fullWidth
                name='weight'
                required
                id='weight'
                helperText={
                  <ErrorMessage
                    name='weight'
                    render={(msg) => (
                      <StyledErrorMessage>{msg}</StyledErrorMessage>
                    )}
                  />
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>kg</InputAdornment>
                  ),
                }}
              />
              <InputLabel id='height'>Height in centimeters</InputLabel>
              <Field
                as={TextField}
                variant='filled'
                fullWidth
                name='height'
                required
                id='height'
                helperText={
                  <ErrorMessage
                    name='height'
                    render={(msg) => (
                      <StyledErrorMessage>{msg}</StyledErrorMessage>
                    )}
                  />
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>cm</InputAdornment>
                  ),
                }}
              />
              <InputLabel id='color'>Color</InputLabel>
              <Field
                as={TextField}
                variant='filled'
                fullWidth
                name='color'
                required
                id='color'
                helperText={
                  <ErrorMessage
                    name='adoptionStatus'
                    render={(msg) => (
                      <StyledErrorMessage>{msg}</StyledErrorMessage>
                    )}
                  />
                }
              />
              <InputLabel id='dietaryRestrictions'>
                Please outline any dietary restrictions
              </InputLabel>
              <Field
                as={TextField}
                variant='filled'
                fullWidth
                name='dietaryRestrictions'
                required
                id='dietaryRestrictions'
                helperText={
                  <ErrorMessage
                    name='dietaryRestrictions'
                    render={(msg) => (
                      <StyledErrorMessage>{msg}</StyledErrorMessage>
                    )}
                  />
                }
              />
              <Button variant='contained' component='label'>
                Upload Profile Photo
                <input
                  type='file'
                  name='picture'
                  required
                  fullWidth
                  hidden
                  helperText={
                    <ErrorMessage
                      name='picture'
                      render={(msg) => (
                        <StyledErrorMessage>{msg}</StyledErrorMessage>
                      )}
                    />
                  }
                />
              </Button>
              <InputLabel id='bio'>A short pet bio</InputLabel>
              <Field
                variant='filled'
                as={TextField}
                multiline
                rows={5}
                cols={40}
                fullWidth
                name='bio'
                required
                id='bio'
                helperText={
                  <ErrorMessage
                    name='bio'
                    render={(msg) => (
                      <StyledErrorMessage>{msg}</StyledErrorMessage>
                    )}
                  />
                }
              />
              Hypoallergenic?
              <Field
                type='checkbox'
                fullWidth
                name='hypoallergenic'
                helperText={
                  <ErrorMessage
                    name='hypoallergenic'
                    render={(msg) => (
                      <StyledErrorMessage>{msg}</StyledErrorMessage>
                    )}
                  />
                }
              />
              <StyledButton
                fullWidth
                type='submit'
                variant='contained'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Loading' : 'Add Pet '}
                <StyledIcon />
              </StyledButton>
            </StyledForm>
          )}
        </Formik>
      </StyledPaper>
    </Grid>
  );
}

const StyledPaper = styled(Paper)`
  padding: 1rem;
  width: 50rem;
  margin: 0 auto;
`;
const StyledHeader = styled('h1')`
  margin: 0 auto;
`;
const StyledForm = styled(Form)`
  padding: 0.5rem;
`;
const StyledButton = styled('button')`
  margin: 1rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border: none;
  color: white;
  border-radius: 0.2rem;
  font-size: 1.2rem;
  background-color: #aaa8a8;
  &:hover {
    background-color: #5f5d5d;
  }
`;
const StyledIcon = styled(Icon)`
  padding: 0 0.7rem;
  color: lightgray;
`;

const StyledErrorMessage = styled('span')`
  color: white;
  background-color: rgba(243, 96, 70, 0.86);
  padding: 0.5rem;
  border-radius: 0.2rem;
`;
