/** @format */
import React, { useState } from 'react';
import { Grid, Paper, Typography, TextField, Button } from '@material-ui/core';
import styled from '@emotion/styled';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
const url = 'http://localhost:8000';

export default function SignUp(props) {
  const [isSubmitting, setSubmitting] = useState(false);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  };
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Enter valid email').required('Required'),
    phoneNumber: Yup.number()
      .typeError('Enter valid Phone Number')
      .required('Required'),
    password: Yup.string()
      .min(6, 'Password minimum length should be 6 characters')
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Password not matched')
      .required('Required'),
  });

  const handleSubmit = async (values, actions) => {
    try {
      const newUser = values;
      await axios.post(`${url}/signup`, newUser);
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
            Please fill this form to create an account!
          </Typography>
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            handleSubmit(values, actions);
          }}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                fullWidth
                name='firstName'
                label='Name'
                required
                placeholder='Enter your name'
                helperText={<ErrorMessage name='name' />}
              />
              <Field
                as={TextField}
                fullWidth
                name='lastName'
                label='Family name'
                required
                placeholder='Enter your family name'
                helperText={<ErrorMessage name='lastName' />}
              />
              <Field
                as={TextField}
                fullWidth
                name='email'
                label='Email'
                required
                placeholder='Enter your email'
                helperText={<ErrorMessage name='email' />}
              />
              <Field
                as={TextField}
                fullWidth
                name='phoneNumber'
                label='Phone Number'
                required
                placeholder='Enter your phone number'
                helperText={<ErrorMessage name='phoneNumber' />}
              />
              <Field
                as={TextField}
                fullWidth
                name='password'
                type='password'
                label='Password'
                required
                placeholder='Enter your password'
                helperText={<ErrorMessage name='password' />}
              />
              <Field
                as={TextField}
                fullWidth
                name='confirmPassword'
                type='password'
                required
                label='Confirm Password'
                placeholder='Confirm your password'
                helperText={<ErrorMessage name='confirmPassword' />}
              />
              <Button
                fullWidth
                type='submit'
                variant='contained'
                disabled={isSubmitting}
                color='inherit'
              >
                {isSubmitting ? 'Loading' : 'Sign up'}
              </Button>
              <Typography>
                Do you have an account yet?
                <Button onClick={handleSetIsRegistered}>Log In</Button>
              </Typography>
            </Form>
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
