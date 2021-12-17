/** @format */

import React, { useState, useContext } from 'react';
import {
  Paper,
  MenuItem,
  TextField,
  Grid,
  Box,
  Select,
  InputLabel,
  FormControl,
  Button,
  Slider,
} from '@material-ui/core';
import { FormHelperText, Input, InputAdornment } from '@mui/material';
import PetList from './PetList';
import styled from '@emotion/styled';
import axios from 'axios';
import AppContext from '../context/AppContext';
const url = 'http://localhost:8000';

export default function SearchPetAdvanced() {
  const [adoptionStatus, setAdoptionStatus] = React.useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [maxWeight, setMaxWeight] = useState(20);
  const [minWeight, setMinWeight] = useState(0);
  const [maxHeight, setMaxHeight] = useState(160);
  const [minHeight, setMinHeight] = useState(0);
  const { petList, setPetList } = useContext(AppContext);
  const adoptionStatusOptions = ['adopted', 'available', 'fostered'];
  const typeOptions = ['cat', 'dog', 'turtle', 'piglet', 'snake', 'chinchilla'];

  const handleTypeChange = (event) => {
    event.preventDefault();
    setType(event.target.value);
  };
  const handleMaxWeightChange = (e) => setMaxWeight(e.target.value);
  const handleMinWeightChange = (e) => setMinWeight(e.target.value);
  const handleMaxHeightChange = (e) => setMaxHeight(e.target.value);
  const handleMinHeightChange = (e) => setMinHeight(e.target.value);

  const handleFindPets = async () => {
    const searchedPets = {
      name: name,
      adoptionStatus: adoptionStatus,
      type: type,
      // maxWeight: maxWeight,
      // maxHeight: maxHeight,
      // minWeight: minWeight,
      // minHeight: minHeight,
    };
    for (const [key, value] of Object.entries(searchedPets)) {
      if (!value) {
        delete searchedPets[key];
      }
    }
    const petListData = await axios.get(`${url}/pet/search`, {
      params: {
        searchedPets,
      },
    });

    setPetList(petListData.data);
  };
  const handleAdoptionStatusChange = (event) => {
    event.preventDefault();
    setAdoptionStatus(event.target.value);
  };
  const handleNameChange = (event) => setName(event.target.value);
  // setWeight([e.target.value, e.target.value]);
  return (
    <StyledGrid>
      {/* <Paper> */}
      <StyledDiv>
        <StyledLabel id='type'> Choose Pet's type:</StyledLabel>
        <StyledSelect name='type' onChange={handleTypeChange}>
          {typeOptions.map((option, index) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </StyledSelect>
      </StyledDiv>
      <StyledDiv>
        <InputLabel id='type'> Adoption Status</InputLabel>
        <StyledSelect
          name='adoptionStatus'
          onChange={handleAdoptionStatusChange}
        >
          {adoptionStatusOptions.map((option, index) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </StyledSelect>
      </StyledDiv>
      <StyledDiv>
        <StyledLabel id='type'> Choose Pet's name:</StyledLabel>

        <StyledInput onChange={handleNameChange} value={name}></StyledInput>
      </StyledDiv>
      <StyledDiv>
        <TextField
          label='Minimum Weight'
          id='minWeight'
          placeholder='minimum weight'
          onChange={handleMinWeightChange}
          value={minWeight}
          InputProps={{
            endAdornment: <InputAdornment position='end'>kg</InputAdornment>,
          }}
        ></TextField>

        <TextField
          label='Maximum Weight:'
          id='maxWeight'
          placeholder='maximum weight'
          onChange={handleMaxWeightChange}
          value={maxWeight}
          InputProps={{
            endAdornment: <InputAdornment position='end'>kg</InputAdornment>,
          }}
        ></TextField>
      </StyledDiv>
      <StyledDiv>
        <TextField
          label='Minimum height'
          placeholder='minimum height'
          onChange={handleMinHeightChange}
          value={minHeight}
          InputProps={{
            endAdornment: <InputAdornment position='end'>cm</InputAdornment>,
          }}
        ></TextField>

        <TextField
          label='Maximum height'
          placeholder='maximum height'
          onChange={handleMaxHeightChange}
          value={maxHeight}
          InputProps={{
            endAdornment: <InputAdornment position='end'>cm</InputAdornment>,
          }}
        ></TextField>
      </StyledDiv>
      <StyledDiv>
        <StyledButton onClick={handleFindPets}>Search</StyledButton>
      </StyledDiv>
      {/* </Paper> */}
    </StyledGrid>
  );
}
const StyledGrid = styled(Grid)`
  width: 40rem;
  padding: 2rem;
  margin: auto;
  background-color: #dbccc0;
`;
const StyledSelect = styled(Select)`
  width: 60%;
  padding: 0.5rem;
  margin: 0.5rem;
`;
const StyledInput = styled(Input)`
  width: 60%;
  margin: 0.5rem;
`;
const StyledDiv = styled('div')`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem;
  margin: 1rem;
  text-transform: uppercase;
  background-color: #dbccc0;
`;
const StyledLabel = styled(InputLabel)`
  text-align: right;
`;
const StyledButton = styled('button')`
  margin: auto;
  border: none;
  color: white;
  border-radius: 0.2rem;
  font-size: 1.2rem;
  padding: 1rem 1.5rem;
  text-transform: uppercase;
  background-color: #b58151;
  &:hover {
    background-color: #3c2113;
  }
`;