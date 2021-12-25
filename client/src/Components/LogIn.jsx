/** @format */

import React, { useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import { Grid, TextField } from '@material-ui/core';
import { Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
const url = 'http://localhost:8000';

export default function LogIn(props) {
  const { setIsLoggedIn, setCurrentUser } = useContext(AppContext);
  const [notification, setNotification] = useState(false);
  const initialValues = {
    email: '',
    password: '',
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('please enter valid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  const onSubmit = async (values, props) => {
    try {
      const result = await axios.post(`${url}/login`, values);
      if (result.status === 200) {
        setCurrentUser(result.data.user);
        localStorage.setItem('token', result.data.token);
        setIsLoggedIn(true);
      }
      props.resetForm();
      props.setSubmitting(false);
    } catch (error) {
      setNotification(true);
    }
  };
  const clearAlert = () => {
    setNotification(false);
  };

  const handleSetIsRegistered = () => {
    props.handleSetIsRegistered(false);
  };

  return (
    <StyledDiv>
      {notification && (
        <Alert
          onClose={() => {
            clearAlert();
          }}
          severity='error'
        >
          Log in failed
        </Alert>
      )}
      <StyledIcon
        onClick={props.handleClose}
        variant='contained'
        color='inherit'
      />

      <Grid align='center'>
        <StyledHeader>Log In</StyledHeader>
      </Grid>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(props) => (
          <Form onKeyDown={clearAlert}>
            <Field
              as={TextField}
              label='email'
              name='email'
              placeholder='Enter email'
              fullWidth
              required
              helperText={<ErrorMessage name='email' />}
            />
            <Field
              as={TextField}
              label='Password'
              name='password'
              placeholder='Enter password'
              type='password'
              fullWidth
              required
              helperText={<ErrorMessage name='password' />}
            />
            <StyledButton
              type='submit'
              color='inherit'
              variant='contained'
              disabled={props.isSubmitting}
            >
              {props.isSubmitting ? 'Loading' : 'Log in'}
            </StyledButton>
          </Form>
        )}
      </Formik>
      <StyledButton onClick={handleSetIsRegistered}>Sign Up</StyledButton>
    </StyledDiv>
  );
}

const StyledDiv = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  padding: 1.5rem;
  width: 30rem;
  margin: 0 auto;
`;
const StyledHeader = styled('h1')`
  margin: 0 auto;
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
  background-color: #aaa8a8;
  &:hover {
    background-color: #44281a;
  }
`;
const StyledIcon = styled(CloseIcon)`
  margin-left: auto;
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;
