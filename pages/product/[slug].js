import React,{useContext, useState} from 'react';
import Layout from "../../components/Layout/Layout";
import {useRouter} from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import {Store} from '../../utils/Store';
import db from '../../utils/db';
import Product from '../../models/Product';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ProductScreen(props) {
    const {product}=props;
    const {state,dispatch}= useContext(Store)
    const [pquantity, setPquantity] = useState(0);
    if(!product){
        return <div classNameName="items-center"> Product Not Found </div>
    }
    const AddtocartHandler =async()=>{
        const existItem = state.cart.cartItems.find((x)=>x.slug === product.slug);
        const quantity = existItem? existItem.quantity +pquantity: pquantity
        const {data} = await axios.get(`/api/products/${product._id}`);

        if(data.countInStock < quantity){
            return toast.error('Product out of stock');
        }
        dispatch({type: 'CART_ADD_ITEM',payload:{...product,quantity}});
        toast.success('Product added to the cart');
    };

  return (
    <Layout title={product.name}>
        <div classNameName='py-2'>
            <Link href="/">back to products</Link>
        </div>
        
<section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={product.image}/>
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.brand}</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.name}</h1>
        <div className="flex mb-4">
          
        </div>
        <p className="leading-relaxed"> {product.description}</p>
        
        <div className="flex jsutify-between ">
          <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}</span>
          <span className="ml-4">
             <label className="font-bold text-xl">Quantity</label>
              <select className="mx-4" value={pquantity} onChange={(e)=> setPquantity(e.target.value)}>
              {[...Array(product.countInStock).keys()].map(x=>(
                                                <option key={x+1} value={(x+1)* product.batchSize}>
                                                    {(x+1)*product.batchSize}
                                                </option>
                                            ))}
              </select>
            </span>
          <button className="flex ml-auto text-red-700 bg-[#F6DE8D] border-0 py-2 px-6 focus:outline-none hover:bg-amber-400 active:bg-amber-500 rounded"onClick={AddtocartHandler}>Add to Cart</button>
        </div>
      </div>
    </div>
  </div>
</section>
    </Layout>
  )
}

export async function getServerSideProps(context) {
    const { params } = context;
    const { slug } = params;
  
    await db.connect();
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();
    return {
      props: {
        product: product ? db.convertDocToObj(product) : null,
      },
    };
  }