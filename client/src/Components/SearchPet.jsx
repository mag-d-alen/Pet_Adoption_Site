/** @format */

import React, { useState } from 'react';
import {
  Grid,
  Paper,
  FormControl,
  Button,
  Typography,
  InputAdornment,
  InputLabel,
  Input,
} from '@material-ui/core';
import { Pets as Icon } from '@mui/icons-material';
import styled from '@emotion/styled';

export default function SearchPet() {
  const [searchedPetType, setSearchedPetType] = useState('');
  const handleChange = (e) => {
    setSearchedPetType(e.target.value);
  };
  const handleSearchPet = () => {};
  return (
    <StyledGrid>
      <StyledPaper>
        <InputLabel htmlFor='standard-adornment-amount'>
          Find your pet
        </InputLabel>
        <StyledInput
          id='standard-adornment-amount'
          value={searchedPetType}
          onChange={handleChange}
        />
        <Button onClick={setSearchedPetType}>
          Search
          <StyledIcon />
        </Button>
      </StyledPaper>
    </StyledGrid>
  );
}
const StyledGrid = styled(Grid)`
  display: flex;
  justify-content: center;
`;

const StyledInput = styled(Input)`
  padding: 1rem;
  width: 80%;
  margin-bottom: 1rem;
`;
const StyledPaper = styled(Paper)`
  text-align: center;
  padding: 0.5rem;
  width: 80%;
  margin-top: 3rem;
`;
const StyledIcon = styled(Icon)`
  margin: 0.3rem;
`;
