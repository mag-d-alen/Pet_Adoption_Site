/** @format */

import React, { useState } from 'react';
import styled from '@emotion/styled';
import SearchPetAdvanced from './SearchPetAdvanced';
import SearchPet from './SearchPet';
import PetList from './PetList';
import { Switch, Alert } from '@mui/material';

export default function Search() {
  const [isToggled, setIsToggled] = useState(false);
  const [petList, setPetList] = useState([]);
  const [alert, setAlert] = useState('');

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };
  const handleSetPetList = (list) => {
    list.length < 1
      ? setAlert('No Pets found, change the criteria and try again!')
      : setPetList(list);
    return;
  };

  const handleClearSearch = () => {
    setPetList([]);
    setAlert('');
  };
  const handleFormClear = () => {};

  return (
    <div>
      <StyledDiv>
        <p>Advanced Search</p>
        <Switch onChange={handleToggle}>Toggle</Switch> <p>Simple Search</p>{' '}
      </StyledDiv>
      <StyledButton onClick={handleClearSearch} disabled={petList.length < 1}>
        Clear results
      </StyledButton>

      {alert && (
        <Alert severity='error' onClose={() => setAlert('')}>
          {alert}
        </Alert>
      )}
      {petList.length < 1 ? (
        <>
          {isToggled ? (
            <SearchPet handleSetPetList={handleSetPetList} />
          ) : (
            <SearchPetAdvanced handleSetPetList={handleSetPetList} />
          )}
        </>
      ) : (
        <PetList petList={petList} />
      )}
    </div>
  );
}
const StyledDiv = styled('div')`
  padding-top: 5rem;
  text-transform: uppercase;
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
    background-color: #7a5d43c3;
  }
  &[disabled]:hover {
    background-color: #aaa8a8;
  }
`;
