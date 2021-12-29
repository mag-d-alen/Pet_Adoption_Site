/** @format */

import React, { useState, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {
  CardHeader,
  CardMedia,
  CardActions,
  CardContent,
  Collapse,
  Card,
  Typography,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import AppContext from '../context/AppContext';
import axios from 'axios';
const url = 'http://localhost:8000';

export default function Pet(props) {
  const { currentUser, token } = useContext(AppContext);
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();
  const {
    name,
    type,
    adoptionStatus,
    hypoallergenic,
    _id,
    color,
    weight,
    height,
    picture,
    breed,
    bio,
  } = props.pet;

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const handleExpandClick = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const handleRouteChange = () => {
    navigate(`./${_id}`);
  };

  return (
    <StyledDiv>
      <StyledCard onClick={handleRouteChange}>
        <CardHeader
          variant='h5'
          component='div'
          title={name}
          subheader={type}
        ></CardHeader>

        <CardMedia
          component='img'
          height='140'
          image={picture}
          src={picture}
          alt='profile picture'
        />

        <CardActions disableSpacing>
          <StyledFooter>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label='show more'
            >
              <ExpandMoreIcon />
            </ExpandMore>
            <Collapse in={expanded} timeout='auto' unmountOnExit>
              <CardContent>
                <Typography>Adoption status: {adoptionStatus}</Typography>
                <Typography>Breed: {breed}</Typography>
                <Typography>Color: {color} </Typography>
                <Typography>Weight: {weight} kg</Typography>
                <Typography>Height: {height} cm</Typography>
                <Typography>
                  {!hypoallergenic && 'Not'} hypoallergenic
                </Typography>
                <Typography body>{bio}</Typography>
              </CardContent>
            </Collapse>
          </StyledFooter>
        </CardActions>
      </StyledCard>
    </StyledDiv>
  );
}

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-items: space-between;
  min-width: 25rem;
  max-width: 50rem;
  height: 100%;
`;
const StyledDiv = styled('div')`
  text-transform: uppercase;
  display: flex;
  margin: 1rem;
  height: 100%;
`;
const StyledFooter = styled('footer')`
  width: 100%;
  display: flex;
  justify-items: center;
  flex-direction: column;
`;
const StyledCardMedia = styled(CardMedia)`
  height: 10rem;
  border: 1px solid brown;
`;

const StyledContentDiv = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  jusify-items: center;
  align-items: center;
`;
