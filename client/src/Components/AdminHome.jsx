/** @format */

import React from 'react';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

export default function AdminHome() {
  return (
    <Grid align='center'>
      <h1>The home of every Admin</h1>

      <StyledLink to='./allusers'>Show All Users</StyledLink>
      <StyledLink to='./allpets'>Show All Pets</StyledLink>
      <StyledLink to='./addpet'>Add Pet</StyledLink>

      <Outlet />
    </Grid>
  );
}
const StyledLink = styled(Link)`
  text-transform: uppercase;
  text-decoration: none;
  font-size: 0.875rem;
  line-height: 1.75;
  padding: 6px 16px;
  font-weight: 500;
  margin-bottom: 2rem;
  color: #7a5d43;
  border-radius: 3px;

  &:hover {
    background-color: #7a5d4360;
    color: white;
  }
  &:visited {
    color: #7a5d43;
  }
`;
