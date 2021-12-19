/** @format */

import React, { useState } from 'react';
import styled from '@emotion/styled';
import SearchPetAdvanced from './SearchPetAdvanced';
import SearchPet from './SearchPet';
import PetList from './PetList';
import { Switch } from '@mui/material';

export default function Search() {
  const [isToggled, setIsToggled] = useState(false);
  const [petList, setPetList] = useState([]);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };
  const handleSetPetList = (list) => {
    setPetList(list);
  };

  const handleClearSearch = () => {
    setPetList([]);
  };
  return (
    <div>
      <StyledDiv>
        <p>Advanced Search</p>
        <Switch onChange={handleToggle}>Toggle</Switch> <p>Simple Search</p>{' '}
      </StyledDiv>
      <StyledButton onClick={handleClearSearch} disabled={petList.length < 1}>
        Clear search
      </StyledButton>
      {petList.length > 0 ? (
        <PetList petList={petList} />
      ) : (
        <>
          {isToggled ? (
            <SearchPet handleSetPetList={handleSetPetList} />
          ) : (
            <SearchPetAdvanced handleSetPetList={handleSetPetList} />
          )}
        </>
      )}
    </div>
  );
}
const StyledDiv = styled('div')`
  padding-top: 10%;
  /* width: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
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
  margin: 0.5rem auto;
  align-items: center;
  &:hover {
    background-color: #3c2113;
  }
  &[disabled]:hover {
    background-color: #aaa8a8;
  }
`;
