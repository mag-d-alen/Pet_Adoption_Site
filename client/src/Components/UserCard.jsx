/** @format */

import React, { useEffect, useContext, useState } from 'react';
import {
  CardActions,
  CardContent,
  Collapse,
  Card,
  Typography,
  IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AppContext from '../context/AppContext';
import axios from 'axios';
const url = 'http://localhost:8000';

export default function UserCard(props) {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    fosteredPets,
    adoptedPets,
    role,
    _id,
    bio,
  } = props.user;
  const { token } = useContext(AppContext);
  const [expanded, setExpanded] = React.useState(false);
  const [fosteredPetsNames, setFosteredPetsNames] = useState([]);
  const [adoptedPetsNames, setAdoptedPetsNames] = useState([]);

  useEffect(() => {
    findPetsProfiles();
  }, []);

  const findPetsProfiles = async () => {
    setAdoptedPetsNames([]);
    setFosteredPetsNames([]);
    try {
      const fosteredPets = await axios.get(`${url}/user/${_id}/fostered`, {
        params: token,
      });

      fosteredPets.data.map(async (pet) => {
        await axios
          .get(`${url}/pet/${pet}/name`, { params: token })
          .then((pet) => {
            setFosteredPetsNames((prevState) => [...prevState, pet.data]);
          });
      });

      const adoptedPets = await axios.get(`${url}/user/${_id}/adopted`, {
        params: token,
      });

      adoptedPets.data.map(async (pet) => {
        await axios
          .get(`${url}/pet/${pet}/name`, { params: token })
          .then((pet) => {
            setAdoptedPetsNames((prevState) => [...prevState, pet.data]);
          });
      });

      if (!fosteredPets) {
        console.log('No fostered pets');
      }
      if (!adoptedPets) {
        console.log('No adopted pets');
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <StyledCard>
      <CardContent>
        <h2>
          {firstName} {lastName}
        </h2>
        {role === 'admin' && <h2>admin</h2>}
        Email: {email} <br />
        Phone Number: {phoneNumber}
      </CardContent>
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
              <Typography paragraph>
                {bio ? `bio: ${bio}` : 'no bio yet'}
              </Typography>
              <Typography paragraph>
                {adoptedPets.length > 0 ? (
                  <>
                    adopted pets :{' '}
                    {adoptedPetsNames.map((name) => {
                      return <li key={name}>{name}</li>;
                    })}
                  </>
                ) : (
                  'No adopted pets'
                )}
              </Typography>
              <Typography paragraph>
                {fosteredPets.length > 0 ? (
                  <>
                    pets fostered:{' '}
                    {fosteredPetsNames.map((name) => {
                      <Link to='./pet' />;
                      return <li key={name}>{name}</li>;
                    })}
                  </>
                ) : (
                  `No pets fostered`
                )}
              </Typography>
            </CardContent>
          </Collapse>
        </StyledFooter>
      </CardActions>
    </StyledCard>
  );
}
const StyledCard = styled(Card)`
  text-transform: uppercase;
  margin: 1rem;
  width: 60%;
`;
const StyledFooter = styled('footer')`
  width: 100%;
`;
