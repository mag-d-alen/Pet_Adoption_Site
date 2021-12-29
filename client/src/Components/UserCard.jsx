/** @format */

import React, { useEffect, useContext, useState } from 'react';
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
  } = props.user;
  const { token } = useContext(AppContext);
  const [expanded, setExpanded] = React.useState(false);
  const [fosteredPetsNames, setFosteredPetsNames] = useState([]);
  const [adoptedPetsNames, setAdoptedPetsNames] = useState([]);

  useEffect(() => {
    findPetsProfiles();
    //return setFosteredPetsNames([]);
  }, []);

  const findPetsProfiles = async () => {
    try {
      const fosteredPets = await axios.get(`${url}/user/${_id}/fostered`, {
        params: token,
      });

      fosteredPets.data.map(async (pet) => {
        await axios
          .get(`${url}/pet/${pet}/name`, { params: token })
          .then((data) => setFosteredPetsNames([data.data.name]));
      });

      const adoptedPets = await axios.get(`${url}/user/${_id}/adopted`, {
        params: token,
      });

      adoptedPets.data.map(async (pet) => {
        await axios
          .get(`${url}/pet/${pet}/name`, { params: token })
          .then((data) => setAdoptedPetsNames([data.data.name]));
      });

      // const petname = petIds.map(async (petId) => {
      //   petNameArray.push(
      //     await axios.get(`${url}/pet/${petId}/name`, { params: token })
      //   );
      // });
      // setFosteredPetsNames(petNameArray);
      //const adoptedPets = await axios.get(`${url}/user/${id}/adopted`, { params: token })

      //     );

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
              <Typography>
                {adoptedPets.length > 0
                  ? `adopted pets:  ${adoptedPetsNames}`
                  : `No adopted pets`}
              </Typography>
              <Typography>
                {fosteredPets.length > 0
                  ? `pets fostered ${fosteredPetsNames}`
                  : `No pets fostered`}
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
  display: flex;
  justify-items: center;
  flex-direction: column;
`;
