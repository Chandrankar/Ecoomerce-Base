import React,{useContext} from 'react';
import { Store } from '../utils/Store';
import Layout from '../components/Layout/Layout'; 
import Link from 'next/link';
import Image from 'next/image';
import {XCircleIcon} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { toast } from 'react-toastify';

const Cart = () => {

    const {state, dispatch} = useContext(Store);
    const {
        cart: {cartItems},
    } = state;
    const removeItemHandler =(item)=>{
        dispatch({type: 'CART_REMOVE_ITEM',payload: item})
    }
    const {push} = useRouter();
    const updateCartHandler = async(item, qty) =>{
        const quantity = Number(qty);
        const {data} = await axios.get(`/api/products/${item._id}`);
        if(data.countInStock< quantity){
            return toast.error('Sorry. Product is out of stock');
        }
        dispatch({type:'CART_ADD_ITEM', payload:{...item,quantity}})
        toast.success('Product updated in the cart');
    }

  return (
    <Layout title = "Shopping cart">
        <h1 className="mb-4 text-xl mt-4 mx-4 md:ml-20">Shopping Cart</h1>
        {
            cartItems.length===0?
            (<div className="mt-4 mx-4">
                Cart is Empty.<Link href="/">Go Shopping</Link>
            </div>):
            (<div className="mx-4 md:ml-24">
                <div className="grid md:grid-cols-4 md: gap-5">
                    <div className="overflow-x-auto md:col-span-3">
                        <table className="min-w-full">
                            <thead className="border-b">
                                <tr>
                                    <th className="px-5 text-left">Item</th>
                                    <th className="px-5 text-right">Quantity</th>
                                    <th className="px-5 text-right">Price</th>
                                    <th className="px-5">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item)=>(
                                    <tr className="border-b" key={item.slug}>
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
                                        <td className="p-5 text-right">
                                            <select value={item.quantity} onChange={(e)=> updateCartHandler(item,e.target.value)}>
                                            {[...Array(item.countInStock).keys()].map(x=>(
                                                <option key={x+1} value={x+1}>
                                                    {x+1}
                                                </option>
                                            ))}
                                            
                                            </select>
                                        </td>
                                        <td className="p-5 text-right">{item.quantity} </td>
                                        <td className="p-5 text-right">${item.price} </td>
                                        <td className="p-5 text-center"> <button onClick={()=>removeItemHandler(item)}>
                                                <XCircleIcon className="h-5 w-5"/>
                                            </button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="card p-5">
                    <ul>
                        <li>
                            <div className="pb-3">
                                Subtotal ({cartItems.reduce((a,c)=> a + c.quantity,0)})
                                {' '}
                                {cartItems.reduce((a,c)=> a+ c.quantity *c.price,0)}
                            </div>
                        </li>
                        <li><button className="primary-button w-full" onClick={()=>push('/shipping')}>Checkout</button></li>
                    </ul>
                </div>
                </div>
            </div>)
        }
    </Layout>
  )
}

export default dynamic(()=>Promise.resolve(Cart),{ssr:false})