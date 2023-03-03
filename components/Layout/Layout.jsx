import Head from 'next/head'
import Link from 'next/link'
import React,{useState,useEffect} from 'react';
import { useContext } from 'react';
import Cookies from 'js-cookie';
import { Store } from '../../utils/Store';
import {ToastContainer} from 'react-toastify';
import {useSession} from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import {Menu} from '@headlessui/react';
import DropdownLink from '../DropdownLink';
import {signOut} from 'next-auth/react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/footer';

const Layout = ({children, title}) => {
  const {state, dispatch} = useContext(Store);
  const {cart} = state;
  const [cartItemsCount, setCartItemsCount]= useState(0);
  
  useEffect(()=>{
    setCartItemsCount( cart.cartItems.reduce((a,c) =>a + c.quantity, 0))
  },[cart.cartItems]);

  const logoutClickHandler =()=>{
    Cookies.remove('cart');
    dispatch({type:'CART_REST'});
    signOut({callbackUrl:'/login'});
  }

  return (
    <div>
        <Head>
        <title>{title? title:'Ecomm'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1}/>

      <div className="flex min-h-screen flex-col justify-between">
        <Navbar/>
        <main className='container'>
            {children}
        </main>
        <Footer/>
      </div>
    </div>
  )
}

export default Layout