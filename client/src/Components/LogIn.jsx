/** @format */

import React from 'react';
import { Grid, Paper, TextField, Button, Typography } from '@material-ui/core';
import styled from '@emotion/styled';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
const url = 'http://localhost:8000';

export default function LogIn(props) {
  const initialValues = {
    email: '',
    password: '',
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('please enter valid email').required('Required'),
    password: Yup.string().required('Required'),
  });
  const onSubmit = async (values, props) => {
    props.resetForm();
    props.setSubmitting(false);
    await axios.post(`${url}/login`, values);
  };
  const handleSetIsRegistered = () => {
    props.handleSetIsRegistered(false);
  };

  return (
    <Grid>
      <StyledPaper>
        <Grid align='center'>
          <StyledHeader>Log In</StyledHeader>
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form>
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
              <Button
                type='submit'
                color='inherit'
                variant='contained'
                disabled={props.isSubmitting}
                fullWidth
              >
                {props.isSubmitting ? 'Loading' : 'Sign in'}
              </Button>
            </Form>
          )}
        </Formik>
        <Typography>
          Don't have an account yet?
          <Button onClick={handleSetIsRegistered}>Sign Up</Button>
        </Typography>
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
