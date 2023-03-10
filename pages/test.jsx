import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import FloatingSearch from '../components/FloatingSearch/FloatingSearch';
import Floatnav from '../components/Navbar/Floatnav';

const test = () => {
  const {user} = useUser();
  console.log(user);
  return (
    <div>
      <Floatnav/>
    </div>
  )
}

export default test