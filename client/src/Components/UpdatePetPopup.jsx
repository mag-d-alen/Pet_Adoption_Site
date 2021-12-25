/** @format */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Dialog, Grid, Typography, Button, DialogContent } from '@mui/material';
import styled from '@emotion/styled';
import UpdatePet from './UpdatePet';
import axios from 'axios';
const url = 'http://localhost:8000/pet';

export default function UpdatePetPopup(props) {
  const [initialValues, setInitialValues] = useState({});
  const [open, setOpen] = React.useState(false);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    async function getInitialValues() {
      try {
        const result = await axios.get(`${url}/${id}`);
        console.log(result.data);
        setInitialValues(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    getInitialValues();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleBackdropClick = (event) => {
    event.stopPropagation();
    return false;
  };

  return (
    <StyledGridItem>
      <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
        <Dialog
          open={open}
          onClose={handleClose}
          onBackdropClick={handleBackdropClick}
          disableEscapeKeyDown
        >
          <DialogContent>
            <UpdatePet id={id} initialValues={initialValues} />
          </DialogContent>
        </Dialog>
      </Typography>

      <StyledButton color='inherit' onClick={handleOpen} fullWidth>
        Update
      </StyledButton>
    </StyledGridItem>
  );
}

//"& .MuiPaper-root" height:? width: 100%
//& .MuiPaper-root-MuiDialog-paper
const StyledButton = styled(Button)`
  margin: 0 1rem 0 2rem;
  width: 70%;
  font-size: 1.2rem;
  color: #7a5d43;
  &:hover {
    background-color: #7a5d43c3;
    color: white;
  }
`;
const StyledGridItem = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

//  root:{"& .muipaper-root-muidialog-paper: {
//     width: 100%;
//   }}
