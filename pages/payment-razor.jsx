import React from 'react';
import axios from 'axios';

const paymentrazor = () => {

    const checkoutHandler= async ()=>{
        const{data:{order}} = await axios.post('/api/paymentController',{
            amount: 5000,
        })
        console.log(order)
        const options = {
            "key": process.env.RAZORPAY_API_KEY,
            "amount": order.amount, 
            "currency": "INR",
            "name": "Ecomm",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": order.id, 
            "callback_url": "http://localhost:3000/api/paymentverification",
            "prefill": {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);
            rzp1.open();
    }
  return (
    <div>
        <button onClick={checkoutHandler}>Razorpay</button>
        
    </div>
  )
}

export default paymentrazor