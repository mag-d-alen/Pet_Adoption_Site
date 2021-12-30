/** @format */

import React, { useState } from 'react';
import ProfileImg from './ProfileImg';

import {
  Box,
  TextField,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { Pets as Icon } from '@mui/icons-material';
import { Alert, Input, InputAdornment } from '@mui/material';
import styled from '@emotion/styled';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function PetForm(props) {
  const { handleSubmit, initialValues, confirmation } = props;
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmitForm = (values, actions) => {
    handleSubmit(values, actions);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Name is too short').max(15).required('Required'),
    type: Yup.string().required('Required'),
    adoptionStatus: Yup.string().required('Required'),
    picture: Yup.string(),
    color: Yup.string()
      .min(3, 'Please enter correct color')
      .max(15)
      .required('Required'),
    bio: Yup.string().max(250),
    dietaryRestrictions: Yup.string().max(150),
    breed: Yup.string()
      .min(3, 'Please enter correct breed')
      .required('Required'),
    weight: Yup.number()
      .positive()
      .max(20, 'Are you sure that the pet weights more than 20 kg?')
      .typeError('Please enter the correct weight')
      .required('Required'),
    height: Yup.number()
      .positive()
      .max(160, 'Are you sure that the pet is taller than 160cm?')
      .typeError('Please enter the correct height')
      .required('Required'),
    hypoallergenic: Yup.boolean().required(),
  });
  const types = ['cat', 'dog', 'turtle', 'piglet', 'snake', 'chinchilla'];
  const adoptionStatuses = ['available', 'fostered', 'adopted'];
  return (
    <StyledNewDiv>
      {/* <Grid align='center'>
        <h2>Please fill this form to add or update new pet data.</h2>
      </Grid> */}
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values, actions) => {
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
            <StyledLabel id='type'> Choose Pet's type:</StyledLabel>
            <Field id='type' as={Select} fullWidth variant='filled' name='type'>
              {types.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Field>
            {errors.type && touched.type ? (
              <StyledErrorMessage name='type'>{errors.type}</StyledErrorMessage>
            ) : null}
            <ProfileImg name='picture' />
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
              id='dietaryRestrictions'
            />
            {errors.type && touched.type ? (
              <StyledErrorMessage name='dietaryRestrictions'>
                {errors.type}
              </StyledErrorMessage>
            ) : null}
            <InputLabel id='bio'>A short pet bio</InputLabel>
            <Field
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
              {isSubmitting ? 'Loading' : 'Submit '}
              <StyledIcon />
            </StyledButton>
          </StyledForm>
        )}
      </Formik>
    </StyledNewDiv>
  );
}

const StyledNewDiv = styled('div')`
  background-color: #fffffff0;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  padding: 1rem;
  margin: auto;
  text-transform: uppercase;
`;

const StyledForm = styled(Form)`
  padding: 0.3rem;
  & > * {
    margin: 3px;
  }
  overflow: ;
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
