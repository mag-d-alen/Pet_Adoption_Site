/** @format */

import React from 'react';
import UserCard from './UserCard';

export default function UserList(props) {
  const { userList } = props;
  return (
    <div>
      {userList.map((user) => (
        <UserCard user={user} key={user.email}></UserCard>
      ))}
    </div>
  );
}
