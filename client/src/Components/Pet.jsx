/** @format */

import React, { useState, useEffect, useContext } from 'react';
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
  DialogContent,
  Dialog,
  Slider,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UpdatePetPopup from './UpdatePetPopup';
import AppContext from '../context/AppContext';
import axios from 'axios';
const url = 'http://localhost:8000/user';

export default function Pet(props) {
  const {
    name,
    type,
    adoptionStatus,
    hypoallergenic,
    id,
    color,
    weight,
    height,
    picture,
    breed,
    bio,
  } = props.pet;
  const { currentUser } = useContext(AppContext);
  const [expanded, setExpanded] = React.useState(false);
  const [openPopup, setOpenPopup] = useState(false);

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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleRemovePet = () => {
    console.log('remove');
  };
  const handleSave = async () => {
    try {
      const result = await axios.post(`${url}/${currentUser.id}/save`, {
        id,
      });
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAdopt = async () => {
    try {
      const result = await axios.post(`${url}/${currentUser.id}/adopt`, {
        id,
      });
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFoster = async () => {
    try {
      const result = await axios.post(`${url}/${currentUser.id}/foster`, {
        id,
      });
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBackdropClick = (event) => {
    event.stopPropagation();
    return false;
  };

  return (
    <StyledDiv>
      <StyledCard>
        <CardHeader
          gutterBottom
          variant='h5'
          component='div'
          title={name}
          subheader={type}
        ></CardHeader>{' '}
        <CardMedia
          component='img'
          height='140'
          image={picture}
          alt='profile picture'
        />
        <CardContent>
          <Typography>Breed: {breed}</Typography>
          <Typography>Color: {color} </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <StyledFooter>
            {currentUser?.role == 'admin' && (
              <UpdatePetPopup initialValues={props.pet} />
            )}
            {currentUser && (
              <>
                <Button size='small' onClick={handleSave}>
                  save
                </Button>
                <Button size='small' onClick={handleFoster}>
                  foster
                </Button>
                <Button size='small' onClick={handleAdopt}>
                  adopt
                </Button>
              </>
            )}
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label='show more'
            >
              <ExpandMoreIcon />
            </ExpandMore>
            <Collapse in={expanded} timeout='auto' unmountOnExit>
              <Typography>Weight: {weight} kg</Typography>
              <Typography>Height: {height} cm</Typography>
              <Typography>{!hypoallergenic && 'Not'} hypoallergenic</Typography>
              <Typography body>{bio}</Typography>
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
