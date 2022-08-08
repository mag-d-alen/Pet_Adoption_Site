/** @format */

import React from 'react';
import { Grid } from '@material-ui/core';
import { Pets as Icon } from '@mui/icons-material';
import styled from '@emotion/styled';

export default function Home() {
  return (
    <StyledDiv>
      <StyledSubtitle>Welcome to</StyledSubtitle>
      <StyledTitle>the Pet Shelter</StyledTitle> <StyledIcon />
      <StyledPara>
        {' '}
        <p>Our pets: </p>{' '}
        <p> cats, chinchillas, snakes, piglets, turtles, and dogs</p>
        of all ages and sizes, pure breeds and mixed breeds, are waiting at our
        shelter for you to take home, to foster or adopt them. Meet you new best
        friend
      </StyledPara>
    </StyledDiv>
  );
}

const StyledTitle = styled('h2')`
  font-family: 'Lato';
  font-weight: 600;
  font-size: 3rem;
  display: flex;
  justify-content: center;
  color: #44281a;
`;
const StyledSubtitle = styled('h4')`
  font-family: 'Lato';
  font-weight: 600;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  color: #44281a;
  margin: 1rem;
`;
const StyledDiv = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  padding-top: 1.5rem;
  margin: 5rem auto 1rem auto;
  background-color: #ffffff7a;
  font-family: 'Lato';
`;
const StyledPara = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  padding: 1.5rem;
  margin: 3rem 0 0 0;
  background-color: #ffffffa9;
  padding: 1rem 15rem;
  font-family: 'Lato';
  width: 70%;
`;

const StyledIcon = styled(Icon)`
  color: #44281ab9;
  font-size: 1.2rem;
`;
