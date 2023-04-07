import React,{useEffect , useContext, useState} from 'react';
import { toast } from 'react-toastify';
import {Store} from '../utils/Store';
import { getError } from '../utils/error';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0/client';

const PostPayment = () => {

    const {user,isLoading} = useUser()
    if(isLoading) return(<div>Loading</div>)
    const {state, dispatch} = useContext(Store);
    const {cart} = state;
    const {cartItems, shippingAddress, paymentMethod}=cart;
    const router = useRouter();
    const round2 = (num)=>Math.round(num *100 + Number.EPSILON)/100;
    const itemsPrice = round2(cartItems.reduce((a,c)=> a + c.quantity*c.price,0))
    const shippingPrice = itemsPrice>200 ? 0:15;
    const taxPrice = round2(itemsPrice * 0.15)
    const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

    
    useEffect(() => {
        
        async function placeOrderHandler(){
            const pay_id = router.query.payment_id
            try{
                const {data} = await axios.post('/api/orders',{
                    orderItems: cartItems,
                    shippingAddress,
                    paymentMethod,
                    itemsPrice,
                    shippingPrice,
                    taxPrice,
                    totalPrice,
                    user,
                    pay_id,
                });
                dispatch({type:'CART_CLEAR_ITEMS'});
                Cookies.set(
                    'cart',
                    JSON.stringify({
                        ...cart,
                        cartItems:[],
                    })
                );
                router.push(`/order/${data._id}`);
                
            } catch(err){
                toast.error(getError(err));
            }
        }  placeOrderHandler();
    }, [])
    
  return (
    <div>{router.query.payment_id}</div>
  )
}

export default PostPayment