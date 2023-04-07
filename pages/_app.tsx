import '../styles/globals.css'
import React from 'react';
import {StoreProvider} from '../utils/Store';



export default function App({ Component, pageProps }:any) {
  return (
      <StoreProvider>
      <script src="https://js.instamojo.com/v1/checkout.js"></script>
          <Component {...pageProps} />
      </StoreProvider>
  );
}