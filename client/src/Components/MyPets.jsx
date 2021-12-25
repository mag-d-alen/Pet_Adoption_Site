/** @format */

import React, { useContext, useState } from 'react';
import PetList from './PetList';
import axios from 'axios';
import AppContext from '../context/AppContext';
import { Button, Paper } from '@mui/material';
import styled from '@emotion/styled';
import cors from 'cors';
const url = 'http://localhost:8000';

export default function MyPets() {
  const { token, currentUser } = useContext(AppContext);
  const [petList, setPetList] = useState([]);

  const showPets = async (status) => {
    setPetList([]);
    try {
      const result = await axios.get(
        `${url}/user/${currentUser._id}/${status}`,
        { params: token }
      );
      const petIdArray = result.data;
      console.log(petIdArray);
      petIdArray.map((petId) =>
        axios.get(`${url}/pet/${petId}`).then((result) => {
          setPetList((prevValue) => [...prevValue, result.data]);
        })
      );

      // setPetList(petArray);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledPaper>
      <StyledDiv>
        <StyledButton onClick={() => showPets('saved')}>
          Show my Saved Pets
        </StyledButton>
        <StyledButton onClick={() => showPets('adopted')}>
          Show my Adopted Pets
        </StyledButton>
        <StyledButton onClick={() => showPets('fostered')}>
          Show my Fostered Pets
        </StyledButton>
      </StyledDiv>
      <PetList petList={petList} />
    </StyledPaper>
  );
}
const StyledPaper = styled(Paper)`
  background-color: #c4966a63;
  padding: 1rem;
  margin: 10rem auto;
`;
const StyledButton = styled(Button)`
  font-weight: 500;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #7a5d43;
  &:hover {
    background-color: #7a5d43c3;
    color: white;
  }
`;
const StyledDiv = styled('div')`
  display: flex;
  justify-content: center;
`;
