/** @format */

import React, { useState, useContext } from 'react';
import {
  Grid,
  Paper,
  FormControl,
  Button,
  Typography,
  InputAdornment,
  InputLabel,
  Input,
  MenuItem,
  Select,
} from '@material-ui/core';
import { Pets as Icon } from '@mui/icons-material';
import styled from '@emotion/styled';
import axios from 'axios';
import AppContext from '../context/AppContext';
const url = 'http://localhost:8000';

export default function SearchPet() {
  const [searchedPetType, setSearchedPetType] = useState('');
  const { petList, setPetList } = useContext(AppContext);
  const typeOptions = ['cat', 'dog', 'turtle', 'piglet', 'snake', 'chinchilla'];
  const handleChange = (e) => {
    setSearchedPetType(e.target.value);
  };
  const handleFindPets = async () => {
    const searchedPets = {
      type: searchedPetType,
    };

    const petListData = await axios.get(`${url}/pet/search`, {
      params: {
        searchedPets,
      },
    });
    setPetList(petListData.data);
  };
  return (
    <StyledPaper>
      <StyledDiv>
        <StyledLabel id='type'> Choose Pet's type:</StyledLabel>
        <StyledSelect name='type' onChange={handleChange}>
          {typeOptions.map((option, index) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </StyledSelect>
      </StyledDiv>
      <StyledButton onClick={handleFindPets}>
        Search
        <StyledIcon />
      </StyledButton>
    </StyledPaper>
  );
}

const StyledIcon = styled(Icon)`
  margin: 0.3rem;
`;
const StyledPaper = styled(Paper)`
  width: 40rem;
  padding: 2rem;
  margin: auto;
`;

const StyledInput = styled(Input)`
  width: 60%;
`;
const StyledDiv = styled('div')`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem;
  margin: 1rem;
  text-transform: uppercase;
`;
const StyledLabel = styled(InputLabel)`
  text-align: right;
`;
const StyledButton = styled('button')`
  margin: auto;
  border: none;
  color: white;
  border-radius: 0.2rem;
  padding: 0.8rem 1rem;
  text-transform: uppercase;
  background-color: #aaa8a8;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #3c2113;
  }
`;
const StyledSelect = styled(Select)`
  width: 60%;
  padding: 0.5rem;
  margin: 0.5rem;
`;
