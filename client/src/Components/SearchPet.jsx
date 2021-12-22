/** @format */

import React, { useState, useContext } from 'react';
import {
  Grid,
  Paper,
  InputLabel,
  Input,
  MenuItem,
  Select,
} from '@material-ui/core';
import { Pets as Icon } from '@mui/icons-material';
import styled from '@emotion/styled';
import axios from 'axios';
import AppContext from '../context/AppContext';
import { createAxiosHeaderGetReq } from '../lib/CreateAxiosReq';
const url = 'http://localhost:8000';

export default function SearchPet(props) {
  // const [searchedPetType, setSearchedPetType] = useState('');
  const [searchedPetObject, setSearchedPetObject] = useState({
    maxWeight: '20',
    minWeight: '0',
    maxHeight: '160',
    minHeight: '0',
  });

  const typeOptions = ['cat', 'dog', 'turtle', 'piglet', 'snake', 'chinchilla'];
  const { handleSetPetList } = props;

  const handleChange = (e) => {
    setSearchedPetObject((prevValue) => ({
      ...prevValue,
      type: e.target.value,
    }));
  };
  const handleFindPets = async () => {
    const petListData = await axios.get(`${url}/pet/search`, {
      params: searchedPetObject,
    });
    handleSetPetList(petListData.data);
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
