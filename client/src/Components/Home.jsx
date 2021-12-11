/** @format */

import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import SearchPet from './SearchPet';

export default function Home() {
  const { setIsLoggedIn } = useContext(AppContext);
  return (
    <div>
      <SearchPet />
    </div>
  );
}
