import Image from 'next/image';
import Link from 'next/link';
import React,{useContext, useEffect, useState} from 'react';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout/Layout';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import axios from 'axios';


const Placeorder = () => {
    const router = useRouter();
    const {state}=useContext(Store);
    const {cart}= state;
    const {cartItems, shippingAddress, paymentMethod}=cart;
    const round2 = (num)=>Math.round(num *100 + Number.EPSILON)/100;
    const itemsPrice = round2(cartItems.reduce((a,c)=> a + c.quantity*c.price,0))
    const shippingPrice = itemsPrice>200 ? 0:15;
    const taxPrice = round2(itemsPrice * 0.15)
    const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

    useEffect(()=>{
        console.log(paymentMethod)
        if(!paymentMethod){
            router.push('/payment')
        }
    },[paymentMethod, router])

    const [loading, setLoading] = useState(false);


    const checkoutHandler= async ()=>{
        const{data:{order}} = await axios.post('/api/paymentController',{
            amount: totalPrice,
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
    <Layout title="Place Order">
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        <CheckoutWizard activeStep={3}/>
        <h1 className="mb-4 text-xl mt-4 mx-4 md:ml-20">Place Order</h1>
        {cartItems.length===0?
        (
            <div className="mt-4 mx-4">Cart is empty<Link href="/">Go Shopping</Link></div>
        ):
        (
            <div className="mt-4 mx-4 grid md:grid-cols-4 md:gap-5 md:ml-20">
                <div className="overflow-x-auto md:col-span-3">
                    <div className="card p-5">
                        <h2 className="mb-2 text-lg">Shipping Address</h2>
                        <div>
                            {shippingAddress.fullname}, {shippingAddress.address},{' '}
                            {shippingAddress.city}, {shippingAddress.city},{' '}
                        </div>
                        <div>
                            <Link href="/shipping">Edit</Link>
                        </div>
                    </div>
                    <div className="card p-5">
                        <h2 className="mb-2 text-lg">Payment Method</h2>
                        <div>{paymentMethod}</div>
                        <div>
                            <Link href="/payment">Edit</Link>
                        </div>
                    </div>
                    <div className="card overflow-x-auto -p-5">
                        <h2 className="mb-2 text-lg">Order Items</h2>
                        <table className="min-w-full">
                        <thead className="border-b">
                                <tr>
                                    <th className="px-5 text-left">Item</th>
                                    <th className="px-5 text-right">Quantity</th>
                                    <th className="px-5 text-right">Price</th>
                                    <th className="px-5 text-right">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item,index)=>(
                                    <tr className="border-b" key={index}>
                                        <td>
                                            <Link href={`/product/${item.slug}`}> 
                                                <div className="flex items-center">
                                                    {/* <Image 
                                                        src={item.image}
                                                        alt={item.name}
                                                        width={50}
                                                        height={50}
                                                    ></Image> */}
                                                        &nbsp;
                                                    {item.name}
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="p-5 text-right">{item.quantity}</td>
                                        <td className="p-5 text-right">{item.price}</td>
                                        <td className="p-5 text-right">₹{item.price * item.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div>
                            <Link href="/cart">Edit</Link>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="card p-5">
                        <h2 className="mb-2 text-lg">Order Summary</h2>
                        <ul>
                            <li>
                                <div className="mb-2 flex justify-between">
                                    <div>Items</div>
                                    <div>₹{itemsPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="mb-2 flex justify-between">
                                    <div>Tax</div>
                                    <div>₹{taxPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="mb-2 flex justify-between">
                                    <div>Shipping Price</div>
                                    <div>₹{shippingPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="mb-2 flex justify-between">
                                    <div>Total</div>
                                    <div>₹{totalPrice}</div>
                                </div>
                            </li>
                            <li>
                                <button disabled={loading} onClick={checkoutHandler} className="primary-button w-full">
                                    {loading ? 'Loading...': "Place Order"}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )}
    </Layout>
  )
}

export default Placeorder