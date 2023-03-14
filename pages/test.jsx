import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import FloatingSearch from '../components/FloatingSearch/FloatingSearch';
import Floatnav from '../components/Navbar/Floatnav';

const test = () => {
  const {user, isLoading, error} = useUser();

  if(isLoading) return(<div>Loading</div>)
  if(error) return (<div>{error.massage}</div>)

  console.log(user.name);
  return (
    <div>
      <Floatnav/>
    </div>
  )
}

export default test