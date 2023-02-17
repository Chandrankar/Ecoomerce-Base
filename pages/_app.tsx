import '../styles/globals.css'
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import {StoreProvider} from '../utils/Store';


export default function App({ Component, pageProps }:any) {
  return (
    <UserProvider>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </UserProvider>
  );
}