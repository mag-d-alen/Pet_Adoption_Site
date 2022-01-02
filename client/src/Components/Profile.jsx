/** @format */

import React, { useContext } from 'react';
import ProfileSettings from './ProfileSettings';
import AppContext from '../context/AppContext';
import styled from '@emotion/styled';
import { Box } from '@material-ui/core';

export default function Profile() {
  const { currentUser, token } = useContext(AppContext);
  return (
    <StyledDiv>
      <StyledTypography>Hello {currentUser.firstName}</StyledTypography>
      <ProfileSettings user={currentUser} token={token} />
    </StyledDiv>
  );
}
const StyledDiv = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-transform: uppercase;
  margin: 5rem;
  font-family: 'Lato';
`;
const StyledTypography = styled('h2')`
  color: #7a5d43a0;
  margin: 0 auto 2rem auto;
  font-family: 'Lato';
`;
