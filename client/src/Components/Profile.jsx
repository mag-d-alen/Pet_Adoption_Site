/** @format */

import React, { useState } from 'react';

// Form with the following fields: password, email, first name,
// last name, phone number,user can add a short bio.

/** @format */

import {
  Grid,
  Box,
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
import * as Yup from 'yup';

export default function Profile(props) {
  const { handleSubmit, initialValues, confirmation } = props;
  const [alertMessage, setAlertMessage] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [tempValues, setTempValues] = useState({
    // ...initialValues,
    type: (initialValues && initialValues.type) || '',
    name: (initialValues && initialValues.name) || '',
    adoptionStatus: (initialValues && initialValues.adoptionStatus) || '',
    picture: (initialValues && initialValues.picture) || '',
    height: (initialValues && initialValues.height) || '',
    weight: (initialValues && initialValues.weight) || '',
    color: (initialValues && initialValues.color) || '',
    bio: (initialValues && initialValues.bio) || '',
    hypoallergenic: (initialValues && initialValues.hypoallergenic) || false,
    dietaryRestrictions:
      (initialValues && initialValues.dietaryRestrictions) || '',
    breed: (initialValues && initialValues.breed) || '',
  });

  const handleSubmitForm = (values, actions) => {
    handleSubmit(values, actions);
    actions.resetForm();
  };

  const handleUpdatedData = (e) => {
    const { name, value } = e.target;
    setTempValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Name is too short').max(15).required('Required'),
    type: Yup.string().required('Required'),
    adoptionStatus: Yup.string().required('Required'),
    picture: Yup.string().url(),
    color: Yup.string()
      .min(3, 'Please enter correct color')
      .max(15)
      .required('Required'),
    bio: Yup.string().max(250).required('Required'),
  });
  const types = ['cat', 'dog', 'turtle', 'piglet', 'snake', 'chinchilla'];
  const adoptionStatuses = ['available', 'fostered', 'adopted'];
  console.log(tempValues);
  return (
    <Grid>
      <StyledPaper>
        <Grid align='center'>
          <Typography variant='caption'>
            Please fill this form to add or update new pet data.
          </Typography>
        </Grid>
        <Formik
          enableReinitialize
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            console.log(actions, values);
            handleSubmitForm(values, actions);
          }}
        >
          {({ errors, touched, values }) => (
            <StyledForm>
              <Field
                label='Name'
                as={TextField}
                variant='filled'
                fullWidth
                name='name'
                required
                error
              />
              {errors.name && touched.name ? (
                <StyledErrorMessage>{errors.name}</StyledErrorMessage>
              ) : null}
              {/* <ErrorMessage name='name' /> */}
              <StyledLabel id='type'> Choose Pet's type:</StyledLabel>
              <Field
                id='type'
                as={Select}
                fullWidth
                variant='filled'
                name='type'
              >
                {types.map((option, index) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Field>
              {errors.type && touched.type ? (
                <StyledErrorMessage>{errors.type}</StyledErrorMessage>
              ) : null}
              <Field
                as={TextField}
                variant='filled'
                fullWidth
                label='Breed'
                name='breed'
                required
                id='breed'
              />
              {errors.breed && touched.breed ? (
                <StyledErrorMessage name='breed'>
                  {errors.breed}
                </StyledErrorMessage>
              ) : null}{' '}
              <StyledLabel id='adoptionStatus'> Adoption Status</StyledLabel>
              <Field
                as={Select}
                fullWidth
                variant='filled'
                name='adoptionStatus'
                required
                id='adoptionStatus'
              >
                {adoptionStatuses.map((option, index) => (
                  <MenuItem key={option} value={option ? option : ' '}>
                    {option}
                  </MenuItem>
                ))}
              </Field>
              {errors.adoptionStatus && touched.adoptionStatus ? (
                <StyledErrorMessage name='adoptionStatus'>
                  {errors.adoptionStatus}
                </StyledErrorMessage>
              ) : null}
              {/* <ErrorMessage name='type' /> */}
              {/* </StyledDiv> */}
              <StyledDiv>
                <Field
                  as={TextField}
                  variant='filled'
                  name='weight'
                  required
                  label='Weight'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>kg</InputAdornment>
                    ),
                  }}
                />
                {errors.weight && touched.weight ? (
                  <StyledErrorMessage name='weight'>
                    {errors.weight}
                  </StyledErrorMessage>
                ) : null}

                <Field
                  as={TextField}
                  variant='filled'
                  name='height'
                  label='height'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>cm</InputAdornment>
                    ),
                  }}
                />
                {errors.height && touched.height ? (
                  <StyledErrorMessage name='height'>
                    {errors.height}
                  </StyledErrorMessage>
                ) : null}
              </StyledDiv>
              <InputLabel id='color'>Color</InputLabel>
              <Field
                as={TextField}
                variant='filled'
                fullWidth
                name='color'
                required
                id='color'
              />
              {errors.type && touched.color ? (
                <StyledErrorMessage name='color'>
                  {errors.color}
                </StyledErrorMessage>
              ) : null}
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
              />
              {errors.type && touched.type ? (
                <StyledErrorMessage name='dietaryRestrictions'>
                  {errors.type}
                </StyledErrorMessage>
              ) : null}
              <Button variant='contained' component='label'>
                Upload Profile Photo
                <input type='file' name='picture' hidden />
                {errors.color && touched.color ? (
                  <StyledErrorMessage name='picture'>
                    {errors.picture}
                  </StyledErrorMessage>
                ) : null}
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
              />
              {errors.bio && touched.bio ? (
                <StyledErrorMessage name='bio'>{errors.bio}</StyledErrorMessage>
              ) : null}
              Hypoallergenic?
              <Field type='checkbox' name='hypoallergenic' />
              {errors.hypoallergenic && touched.hypoallergenic ? (
                <StyledErrorMessage name='hypoallergenic'>
                  {errors.hypoallergenic}
                </StyledErrorMessage>
              ) : null}
              {confirmation && <Alert severity='success'>{confirmation}</Alert>}
              <StyledButton
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
  width: 40rem;
  margin: 0 auto;
`;
const StyledHeader = styled('h1')`
  margin: 0 auto;
`;
const StyledForm = styled(Form)`
  padding: 0.5rem;
  & > * {
    margin-bottom: 8px;
  }
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
  background-color: #b58151;
  &:hover {
    background-color: #7a5d43c3;
  }
`;
const StyledIcon = styled(Icon)`
  padding: 0 0.7rem;
  color: #e6a66b;
`;
const StyledErrorMessage = styled('div')`
  color: white;
  background-color: rgba(243, 96, 70, 0.86);
  padding: 0.5rem;
  border-radius: 0.2rem;
`;

const StyledDiv = styled(Box)`
  display: flex;
  justify-content: space-around;
  padding: 0.5rem;
  margin: 1rem;
`;
const StyledLabel = styled(InputLabel)`
  text-align: right;
`;
