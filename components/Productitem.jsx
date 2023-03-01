import React, {useContext} from 'react';
import {useRouter} from 'next/router';
import { Store } from '../utils/Store';
import { toast } from 'react-toastify';
import axios from 'axios';



const Productitem = ({product}) => {

  const{state,dispatch}=useContext(Store);

  const AddtocartHandler =async()=>{
    const existItem = state.cart.cartItems.find((x)=>x.slug === product.slug);
    const quantity = existItem? existItem.quantity +1: 1
    const {data} = await axios.get(`/api/products/${product._id}`);
  
    if(data.countInStock < quantity){
        return toast.error('Product out of stock');
    }
    dispatch({type: 'CART_ADD_ITEM',payload:{...product,quantity}});
    toast.success('Product added to the cart');
  };

  const {push} = useRouter();
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-4 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-4">
            <div key={product.id} className="group relative" onClick={()=>push(`/product/${product.slug}`)}>
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80" >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.price}</p>
                  
                </div>
              </div>
            </div>
            <div className="flex justify-between">
                  <div>{product.slug}</div>
                  <button type="button" onClick={AddtocartHandler} className="ml-8 text-red-700">Buy Now</button>
                </div>
        </div>
      </div>
  )
}

export default Productitem