/** @format */

import React, { useState, useEffect, useContext } from 'react';

import { useParams } from 'react-router-dom';
import axios from 'axios';
import AppContext from '../context/AppContext';
import UpdatePetPopup from './UpdatePetPopup';
import { CardMedia, Typography, Button, Box, Alert, Grid } from '@mui/material';
import styled from '@emotion/styled';
const url = 'http://localhost:8000';
export default function PetPage() {
  const params = useParams();
  const id = params.id;
  const [pet, setPet] = useState({});
  const [confirmation, setConfirmation] = useState('');
  const { token, currentUser, setCurrentUser } = useContext(AppContext);
  const [showButtons, setShowButtons] = useState({
    foster: true,
    adopt: true,
    save: true,
    return: false,
  });

  useEffect(() => {
    async function fetchInfo() {
      try {
        const result = await axios.get(`${url}/pet/${id}`);
        setPet(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchInfo();
  }, []);

  useEffect(() => {
    handleShowButtons();
  }, [currentUser, pet]);

  const handleShowButtons = () => {
    if (currentUser.savedPets.includes(id)) {
      setShowButtons((prevState) => ({
        ...prevState,
        save: false,
      }));
    } else {
      setShowButtons((prevState) => ({
        ...prevState,
        save: true,
      }));
    }
    if (pet.adoptionStatus === 'fostered') {
      setShowButtons((prevState) => ({
        ...prevState,
        return: false,
        adopt: false,
        foster: false,
      }));

      if (pet.owner === currentUser._id) {
        setShowButtons((prevState) => ({
          ...prevState,
          return: true,
          adopt: true,
          foster: false,
        }));
      }
    }
    if (pet.adoptionStatus === 'adopted') {
      setShowButtons((prevState) => ({
        ...prevState,
        adopt: false,
        foster: false,
        return: false,
      }));
    }

    if (pet.adoptionStatus === 'available') {
      setShowButtons((prevState) => ({
        ...prevState,
        return: false,
        adopt: true,
        foster: true,
      }));
    }
  };

  const handleAction = async (actionType) => {
    console.log(actionType);
    try {
      const result = await axios.post(
        `${url}/user/${currentUser._id}/${actionType}`,
        { token, id },
        { new: true }
      );
      setCurrentUser(result.data.user);
      result.data.pet && setPet(result.data.pet);
      setConfirmation(result.data.msg);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdatePet = (pet) => {
    setPet(pet);
  };

  return (
    <StyledGrid container>
      <h1>{pet.name}</h1>
      {confirmation && (
        <Alert
          onClose={() => {
            setConfirmation('');
          }}
          severity='success'
        >
          {confirmation}
        </Alert>
      )}
      <StyledPaper>
        <StyledCardMedia item xs={6} component='img' image={pet.picture} />
        <StyledGridItem item xs={5}>
          <Typography paragraph>breed: {pet.breed}</Typography>
          <Typography paragraph>color: {pet.color}</Typography>
          <Typography paragraph>
            adoption Status: {pet.adoptionStatus}
          </Typography>
          {pet.dietaryRestrictions && (
            <Typography paragraph>
              dietary Restrictions: {pet.dietaryRestrictions}
            </Typography>
          )}
          <Typography paragraph> weight: {pet.weight} kg</Typography>
          <Typography paragraph> height: {pet.height} cm</Typography>
          {pet.bio && <Typography paragraph> biography: {pet.bio}</Typography>}
          <Typography paragraph>
            {!pet.hypoallergenic && 'non'} hypoallergenic
          </Typography>
        </StyledGridItem>
        <ButtonsSection item xs={1}>
          {currentUser?.role === 'admin' && (
            <UpdatePetPopup initialValues={pet} updatePet={handleUpdatePet} />
          )}

          {currentUser?.role === 'user' && (
            <>
              <StyledButton
                onClick={() => {
                  showButtons.save
                    ? handleAction('save')
                    : handleAction('unsave');
                }}
              >
                {showButtons.save ? 'save' : 'unsave'}
              </StyledButton>
              {showButtons.foster && (
                <StyledButton
                  size='small'
                  onClick={() => {
                    handleAction('foster');
                  }}
                >
                  foster
                </StyledButton>
              )}
              {showButtons.adopt && (
                <StyledButton
                  onClick={() => {
                    handleAction('adopt');
                  }}
                >
                  adopt
                </StyledButton>
              )}
              {showButtons.return && (
                <StyledButton
                  onClick={() => {
                    handleAction('return');
                  }}
                >
                  return
                </StyledButton>
              )}
            </>
          )}
        </ButtonsSection>
      </StyledPaper>
    </StyledGrid>
  );
}
const StyledGrid = styled(Grid)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
  background-color: #c4966a63;
  text-transform: uppercase;
`;
const StyledPaper = styled(Box)`
  margin-top: 2rem;
  width: 85%;
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
`;
const StyledCardMedia = styled(CardMedia)`
  height: 25rem;
  width: 25rem;
  margin: 0 1rem;
`;

const StyledGridItem = styled(Grid)`
  margin: 0 1rem;
  display: flex;
  flex-shrink: 1;
  padding: 0.3rem;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
`;

const ButtonsSection = styled(Grid)`
  margin: auto 1rem;
`;
const StyledButton = styled(Button)`
  font-size: 1.2rem;
  width: min-content;
  color: #7a5d43ca;
  &:hover {
    background-color: #7a5d4396;
    color: white;
  }
`;
