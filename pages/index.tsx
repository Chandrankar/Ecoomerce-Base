import React from 'react';
import Hero from '../components/Hero/Hero';
import Collection from '../components/collections/collections';
import Productitem from '../components/Productitem'
import Product from '../models/Product';
import db from '../utils/db';
import Footer from '../components/Footer/footer'
import Floatnav from '../components/Navbar/Floatnav';


const test = ({products}:any) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Floatnav/>
        <div className="bg-orange-300 flex justify-between w-full">
            <div className="mx-4">Welcome to the land of the Ethnics!</div>
            <div className="mr-4">Deliver to</div>
        </div>
        <Hero/>
        <Collection/>
        <div className="w-3/4">
            <div className="flex justify-between">
                <div className="flex py-2 text-xl ml-4"><p>Grab the Best Deal on </p>&nbsp;<p className="text-red-700">Sarees</p></div>
                <div className="text-xl mr-4">View All</div>
            </div>
        
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
            {products.map((product:any)=>(
            <Productitem product={product} key={product.slug}></Productitem>
                 ))}
            </div>
        </div>
        
        <Footer/>
    </div>
  )
}
export async function getServerSideProps(){
    await db.connect();
    const products = await Product.find({isPublic: true}).limit(5).lean();
    return{
      props:{
        products: products.map(db.convertDocToObj)
      }
    }
  }

export default test