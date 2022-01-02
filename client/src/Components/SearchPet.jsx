/** @format */

import React, { useState } from 'react';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import { Pets as Icon } from '@mui/icons-material';

import styled from '@emotion/styled';
import axios from 'axios';
const url = 'http://localhost:8000';

export default function SearchPet(props) {
  const [searchedPetObject, setSearchedPetObject] = useState({
    maxWeight: '20',
    minWeight: '0',
    maxHeight: '160',
    minHeight: '0',
  });
  const [alert, setAlert] = useState('');
  const typeOptions = ['cat', 'dog', 'turtle', 'piglet', 'snake', 'chinchilla'];
  const { handleSetPetList } = props;

  const handleChange = (e) => {
    setSearchedPetObject((prevValue) => ({
      ...prevValue,
      type: e.target.value,
    }));
  };
  const handleFindPets = async () => {
    try {
      const petListData = await axios.get(`${url}/pet/search`, {
        params: searchedPetObject,
      });
      if (petListData.data.length < 0) {
        return setAlert('Pets not found. Try again');
      } else {
        handleSetPetList(petListData.data);
      }
    } catch (error) {
      console.log(error);
    }
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
const StyledPaper = styled('div')`
  width: 40rem;
  padding: 2rem;
  margin: auto;
  background-color: #ffffffd5;
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
  color: white;
`;
const StyledButton = styled('button')`
  margin: auto;
  border: none;
  color: white;
  border-radius: 0.2rem;
  padding: 0.8rem 1rem;
  text-transform: uppercase;
  background-color: #7a5d437a;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #7a5d43c3;
  }
`;
const StyledSelect = styled(Select)`
  width: 60%;
  padding: 0.5rem;
  margin: 0.5rem;
`;
