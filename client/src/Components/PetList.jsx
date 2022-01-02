/** @format */

import React from 'react';
import { Grid } from '@material-ui/core';
import styled from '@emotion/styled';
import Pet from './Pet';

export default function PetList(props) {
  const { petList } = props;

  return (
    <StyledGrid>
      {petList.map((pet) => (
        <Pet key={pet._id} pet={pet} />
      ))}
    </StyledGrid>
  );
}

const StyledGrid = styled(Grid)`
  background-color: inherit;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
