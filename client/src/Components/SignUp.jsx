/** @format */
import React, { useState } from 'react';
import { Grid, Paper, Typography, TextField, Button } from '@material-ui/core';
import { Alert } from '@mui/material';
import styled from '@emotion/styled';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
const url = 'http://localhost:8000';

export default function SignUp(props) {
  const [isSubmitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  };
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Name is too short').required('Required'),
    lastName: Yup.string()
      .min(2, 'Family name is too short')
      .required('Required'),
    email: Yup.string().email('Enter valid email').required('Required'),
    phoneNumber: Yup.number()
      .min(8)
      .typeError('Enter valid phone number')
      .required('Required'),
    password: Yup.string()
      .min(6, 'Password should be at least 6 characters long')
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords do not matched')
      .required('Required'),
  });

  const handleSubmit = async (values, actions) => {
    try {
      const newUser = { ...values, role: 'user' };
      const result = await axios.post(`${url}/signup`, newUser);
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

  const handleSetIsRegistered = () => {
    props.handleSetIsRegistered(true);
  };

  return (
    <Grid>
      <StyledPaper>
        <Grid align='center'>
          <StyledHeader>Sign Up</StyledHeader>
          <Typography variant='caption' gutterBottom>
            Please fill this form to create an account.
          </Typography>
        </Grid>
        {alert && (
          <Alert severity='error'>This is an error alert — check it out!</Alert>
        )}
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            handleSubmit(values, actions);
          }}
        >
          {(props) => (
            <StyledForm>
              <Field
                as={TextField}
                fullWidth
                name='firstName'
                label='Name'
                required
                placeholder='Enter your name'
                helperText={
                  <ErrorMessage
                    name='firstName'
                    render={(msg) => (
                      <StyledErrorMessage>{msg}</StyledErrorMessage>
                    )}
                  />
                }
              />
              <Field
                as={TextField}
                fullWidth
                name='lastName'
                label='Family name'
                placeholder='Enter your family name'
                required
                helperText={
                  <ErrorMessage
                    name='lastName'
                    render={(msg) => (
                      <StyledErrorMessage>{msg} </StyledErrorMessage>
                    )}
                  />
                }
              />
              <Field
                as={TextField}
                fullWidth
                name='email'
                label='Email'
                required
                placeholder='Enter your email'
                helperText={
                  <ErrorMessage
                    name='email'
                    render={(msg) => (
                      <StyledErrorMessage>{msg} </StyledErrorMessage>
                    )}
                  />
                }
              />
              <Field
                as={TextField}
                fullWidth
                name='phoneNumber'
                label='Phone Number'
                required
                placeholder='Enter your phone number'
                helperText={
                  <ErrorMessage
                    name='phoneNumber'
                    render={(msg) => (
                      <StyledErrorMessage>{msg} </StyledErrorMessage>
                    )}
                  />
                }
              />
              <Field
                as={TextField}
                fullWidth
                name='password'
                type='password'
                label='Password'
                required
                placeholder='Enter your password'
                helperText={
                  <ErrorMessage
                    name='password'
                    render={(msg) => (
                      <StyledErrorMessage>{msg}</StyledErrorMessage>
                    )}
                  />
                }
              />
              <Field
                as={TextField}
                fullWidth
                name='confirmPassword'
                type='password'
                required
                label='Confirm Password'
                placeholder='Confirm your password'
                helperText={
                  <ErrorMessage
                    name='confirmPassword'
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
                color='inherit'
              >
                {isSubmitting ? 'Loading' : 'Sign up'}
              </StyledButton>
              <Typography>
                Do you have an account yet?
                <StyledButton onClick={handleSetIsRegistered}>
                  Log In
                </StyledButton>
              </Typography>
            </StyledForm>
          )}
        </Formik>
      </StyledPaper>
    </Grid>
  );
}

const StyledPaper = styled(Paper)`
  padding: 1rem;
  width: 30rem;
  margin: 0 auto;
`;
const StyledHeader = styled('h1')`
  margin: 0 auto;
`;
const StyledForm = styled(Form)`
  padding: 0.5rem;
`;
const StyledButton = styled(Button)`
  margin: 1rem 0;
`;
const StyledErrorMessage = styled('span')`
  color: white;
  background-color: rgba(255, 0, 0, 0.6);
  padding: 0.5rem;
  border-radius: 0.2rem;
`;
