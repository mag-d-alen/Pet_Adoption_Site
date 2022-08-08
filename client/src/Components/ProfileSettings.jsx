/** @format */

import React, { useState, useContext } from 'react';
import styled from '@emotion/styled';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import AppContext from '../context/AppContext';
import * as Yup from 'yup';
import { Grid, TextField } from '@material-ui/core';
import { Alert } from '@mui/material';
const url = 'http://localhost:8000';

export default function ProfileSettings(props) {
  const [isSubmitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState('');
  const { setCurrentUser, currentUser, token } = useContext(AppContext);

  let initialValues = {
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    phoneNumber: currentUser.phoneNumber,
    password: '',
    confirmPassword: '',
    bio: currentUser.bio,
  };
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Name is too short')
      .max(20)
      .required('Required'),
    lastName: Yup.string()
      .min(2, 'Family name is too short')
      .max(30)
      .required('Required'),
    email: Yup.string().email('Enter valid email').required('Required'),
    phoneNumber: Yup.number()
      .min(8)
      .typeError('Enter valid phone number')
      .required('Required'),
    password: Yup.string()
      .min(6, 'Password should be at least 6 characters long')
      .max(15)
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords do not matched')
      .required('Required'),
  });

  const handleSubmit = async (values, actions) => {
    try {
      const newUser = values;
      const id = currentUser._id;
      const result = await axios.put(`${url}/user`, { token, newUser, id });
      setNotification(result.data.msg);
      setCurrentUser(result.data.updatedUser);
      actions.setSubmitting(true);
      setTimeout(() => {
        initialValues = false;
        actions.setSubmitting(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      setNotification('Sign up failed');
    }
  };

  return (
    <>
      <StyledPaper>
        <Grid align='center'>
          <h4>Please fill this form to update your info</h4>
        </Grid>

        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            handleSubmit(values, actions);
          }}
        >
          {({ errors, touched, values, actions }) => (
            <StyledForm
              onKeyDown={() => {
                setNotification('');
              }}
            >
              <StyledField
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
              <StyledField
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
              <StyledField
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
              <StyledField
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

              <StyledField
                placeholder='your short bio'
                variant='filled'
                as={TextField}
                multiline
                rows={5}
                cols={40}
                fullWidth
                name='bio'
                id='bio'
              />
              {errors.bio && touched.bio ? (
                <StyledErrorMessage name='bio'>{errors.bio}</StyledErrorMessage>
              ) : null}
              {notification && (
                <Alert onClose={() => setNotification('')} severity='success'>
                  {notification}
                </Alert>
              )}
              <StyledButton
                type='submit'
                variant='contained'
                disabled={isSubmitting}
                color='inherit'
              >
                {isSubmitting ? 'Loading' : 'Submit Changes'}
              </StyledButton>
            </StyledForm>
          )}
        </Formik>
      </StyledPaper>
    </>
  );
}
const StyledPaper = styled('div')`
  background-color: #ffffffd5;
  display: flex;
  justify-items: center;
  align-items: center;
  padding: 1rem;
  width: 45rem;
  margin: 0 auto;
  text-transform: uppercase;
`;

const StyledForm = styled(Form)`
  text-transform: uppercase;
  & > * {
    margin-bottom: 4px;
  }

  padding: 0.5rem;
`;
const StyledField = styled(Field)`
  text-transform: uppercase;

  margin: 0 0.5rem;
`;

const StyledButton = styled('button')`
  display: flex;
  justify-content: center;
  margin: 0.5rem auto;
  width: 20rem;
  padding: 0.5rem;
  text-transform: uppercase;
  border: none;
  color: white;
  border-radius: 0.2rem;
  background-color: #7a5d439d;
  &:hover {
    background-color: #7a5d43f8;
  }
`;

const StyledErrorMessage = styled('span')`
  color: white;
  background-color: rgba(255, 0, 0, 0.6);
  padding: 0.5rem;
  border-radius: 0.2rem;
`;
