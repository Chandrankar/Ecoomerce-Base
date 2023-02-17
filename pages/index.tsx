import Layout from '../components/Layout/Layout'
import Productitem from '../components/Productitem'
import Product from '../models/Product';
import db from '../utils/db';
import { useContext } from 'react';
import {Store} from '../utils/Store';
import axios from 'axios'
import { toast } from 'react-toastify';

const Home = ({products}:any) => {

  const {state, dispatch} = useContext(Store);
  const {cart} = state;
  const AddtocartHandler =async(product:any)=>{
    const existItem = cart.cartItems.find((x:any)=>x.slug === product.slug);
    const quantity = existItem? existItem.quantity +1: 1
    const {data} = await axios.get(`api/products/${product._id}`);
    if(data.countInStock < quantity){
      return toast.error('Product out of stock');
        
    }
    dispatch({type: 'CART_ADD_ITEM',payload:{...product,quantity}});
    toast.success('Product added to the cart');
  };

  return (
    <Layout title="Home Page">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product:any)=>(
            <Productitem product={product} key={product.slug}></Productitem>
          ))}
        </div>
    </Layout>
  )
}

export async function getServerSideProps(){
  await db.connect();
  const products = await Product.find().lean();
  return{
    props:{
      products: products.map(db.convertDocToObj)
    }
  }
}

export default Home