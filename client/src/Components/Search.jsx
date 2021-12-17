/** @format */

import React, { useState } from 'react';
import styled from '@emotion/styled';
import SearchPetAdvanced from './SearchPetAdvanced';
import SearchPet from './SearchPet';
import { Switch } from '@mui/material';

export default function Search() {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };
  return (
    <div>
      <StyledDiv>
        <p>Advanced Search</p>
        <Switch onChange={handleToggle}>Toggle</Switch> <p>Simple Search</p>
      </StyledDiv>
      {isToggled ? <SearchPet /> : <SearchPetAdvanced />}
    </div>
  );
}
const StyledDiv = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
