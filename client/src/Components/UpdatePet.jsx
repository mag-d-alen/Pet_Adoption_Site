/** @format */

import React, { useContext, useState } from 'react';

import AppContext from '../context/AppContext';
import PetForm from './PetForm';
import { Grid } from '@material-ui/core';
import axios from 'axios';
const url = 'http://localhost:8000/pet';

export default function UpdatePet(props) {
  const [confirmation, setConfirmation] = useState('');
  const { initialValues, id } = props;
  const { token } = useContext(AppContext);

  const handleSubmit = async (values) => {
    const newPet = values;
    try {
      const result = await axios.put(`${url}/${id}`, { token, newPet });
      setConfirmation(result.data.msg);
      props.updatePet(result.data.pet);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid>
      <PetForm
        overflow='scroll'
        handleSubmit={handleSubmit}
        initialValues={initialValues}
        confirmation={confirmation}
      />
    </Grid>
  );
}
