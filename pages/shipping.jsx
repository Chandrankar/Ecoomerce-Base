import React,{useContext, useEffect} from 'react';
import Layout from'../components/Layout/Layout';
import CheckoutWizard from '../components/CheckoutWizard';
import {useForm} from 'react-hook-form';
import Cookies from 'js-cookie';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';

const Shipping = () => {
  const {push}= useRouter();
  const{
    handleSubmit,
    register,
    formState:{errors},
    setValue,
  } = useForm();

  const {state,dispatch} = useContext(Store);
  const {cart} = state;
  const {shippingAddress} = cart;

  useEffect(()=>{
    setValue('fullName',shippingAddress.fullName);
    setValue('address',shippingAddress.address);
    setValue('postalCode',shippingAddress.postalCode);
    setValue('city',shippingAddress.city);
    setValue('email',shippingAddress.email);
    setValue('phone',shippingAddress.phone);
  },[setValue, shippingAddress]);

    const submitHandler=({fullName, address, city, postalCode, email, phone})=>{
      dispatch({
        type:'SAVE_SHIPPING_ADDRESS',
        payload:{fullName, address,city,postalCode,email,phone}
      });
      Cookies.set(
        'cart',
        JSON.stringify({
          ...cart,
          shippingAddress:{
            fullName,
            address,
            city,
            postalCode,
            email,
            phone,
          },
        })
      )
      push('/payment');
      console.log('pushed')
    };
  

  return (
    <Layout className="Shipping Address">
        <CheckoutWizard activeStep={1}/>
        <form onSubmit={handleSubmit(submitHandler)}
        className="mx-4 max-w-screen-md md:ml-24"
        >
          <h1 className="mb-4 text-xl">Shipping Address</h1>
          <div className="mb-4">
            <label htmlFor="fullName">Full Name</label>
            <input className="w-full" id="fullName" autoFocus{...register('fullName',{
              required: 'Please enter full name',
            })}/>
            {errors.fullName &&(
              <div className="text-red-500">{errors.fullName.message}</div>
            )}
          </div>
          <div className="mb-4">
          <label htmlFor="email">E-Mail</label>
          <input className="w-full" id="email" autoFocus{...register('email',{
            required: 'Please enter you Email',
            minLength:{value: 3, message:'Address too short'}
          })}/>
          {errors.email &&(
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="phone">Phone Number</label>
          <input className="w-full" id="phone" autoFocus{...register('phone',{
            required: 'Please enter you Phone Number',
            minLength:{value: 3, message:'Phone Number too short'}
          })}/>
          {errors.phone &&(
            <div className="text-red-500">{errors.phone.message}</div>
          )}
        </div>
          <div className="mb-4">
            <label htmlFor="address">Address</label>
            <input className="w-full" id="address" autoFocus{...register('address',{
              required: 'Please enter you address',
              minLength:{value: 3, message:'Address too short'}
            })}/>
            {errors.address &&(
              <div className="text-red-500">{errors.address.message}</div>
            )}
          </div>
          <div className="mb-4">
          <label htmlFor="city">City</label>
          <input className="w-full" id="city" autoFocus{...register('city',{
            required: 'Please enter you address',
            minLength:{value: 3, message:'Address too short'}
          })}/>
          {errors.city &&(
            <div className="text-red-500">{errors.city.message}</div>
          )}
        </div>
        
          <div className="mb-4">
          <label htmlFor="postalCode">Pincode</label>
          <input className="w-full" id="postalCode" autoFocus{...register('postalCode',{
            required: 'Please enter your pincode',
          })}/>
          {errors.postalCode &&(
            <div className="text-red-500">{errors.postalCode.message}</div>
          )}
        </div>
        <div className="mb-4 flex justify-between">
          <button className="primary-button">Next</button>
        </div>
        </form>
    </Layout>
  )
}

export default Shipping