/** @format */

import React, { useContext } from 'react';
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
import styled from '@emotion/styled';
import AppContext from '../context/AppContext';
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
