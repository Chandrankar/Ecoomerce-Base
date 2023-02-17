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