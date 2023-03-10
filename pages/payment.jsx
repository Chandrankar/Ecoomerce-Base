import React,{useState, useContext,useEffect} from 'react';
import Layout from '../components/Layout/Layout';
import CheckoutWizard from '../components/CheckoutWizard';
import { useRouter } from 'next/router';
import {Store} from '../utils/Store';
import {toast} from 'react-toastify'
import Cookies from 'js-cookie';

const Payment = () => {

    const [selectedPaymentMethod, setSelectedPaymentMethod]= useState('');

    const {state, dispatch} = useContext(Store);
    const {cart} = state;
    const {shippingAddress, paymentMethod} = cart;

    const router = useRouter();

    const submitHandler = (e)=>{
        e.preventDefault();
        if(!selectedPaymentMethod){
           return toast.error('Payment method is required');
        }
        dispatch({type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod});
        Cookies.set(
            'cast',
            JSON.stringify({
                ...cart,
                paymentMethod: selectedPaymentMethod,
            })
        );
        console.log(selectedPaymentMethod)
        router.push('/placeorder');
    };

    useEffect(()=>{
        if(!shippingAddress.address){
            return router.push('shipping');
        }
    setSelectedPaymentMethod(paymentMethod||'');
    },[paymentMethod, router, shippingAddress.address])

  return (
    <Layout title="Payment Methord">
        <CheckoutWizard activeStep={2}/>
        <form className="mx-4 max-w-screen-md" onSubmit={submitHandler}>
            <h1 className="mb-4 text-xl md: ml-20">Payment Method</h1>
            {
                ['Paypal','Stripe','Paytm','Razorpay','Cash on Dilevery'].map((payment)=>(
                    <div key={payment} className="mb-4 md:ml-20">
                        <input
                            name="paymentMethod"
                            className="p-2 outline-none focus-ring-0"
                            id={payment}
                            type="radio"
                            checked={selectedPaymentMethod===payment}
                            onChange={()=>setSelectedPaymentMethod(payment)}
                        />
                        <label className="p-2" htmlFor={payment}>{payment}</label>
                    </div>
                ))
            }
            <div className="mb-4 flex justify-between">
                <button className="default-button md:ml-20" type="button" onClick={()=>router.push('shipping')}>Back</button>
                <button className="primary-button md:ml-20">Next</button>
            </div>
        </form>
    </Layout>
  )
}

export default Payment