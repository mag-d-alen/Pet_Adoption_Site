/** @format */

import React from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
} from '@mui/material';

export default function UserCard(props) {
  const { firstName, lastName, email, phoneNumber } = props.user;
  console.log(firstName, phoneNumber);
  return (
    <Card>
      <CardContent>
        <h2>
          {firstName} {lastName}
        </h2>
        Email: {email} <br />
        Phone Number: {phoneNumber}
      </CardContent>
    </Card>
  );
}
