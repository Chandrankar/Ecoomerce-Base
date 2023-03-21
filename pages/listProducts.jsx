import React, {useEffect} from 'react';
import Layout from '../components/Layout/Layout';
import SidebarDashboard from '../components/Sidebar/sidebarDashboard';
import {DataGrid} from '@mui/x-data-grid';
import db from '../utils/db';
import EditIcon from '@mui/icons-material/Edit';
import {useRouter} from 'next/router';
import Product from '../models/Product';

const listProducts = (props) => {
    console.log(props.products)
    const pro= props.porducts
    const{push} = useRouter();

    const columns=[
        {field:"name", headerName:"Name"},
        {field:"category", headerName:"Category"},
        {field:"price", headerName:"Price"},
        {field:"batchSize", headerName:"Size of Batch"},
        {field:"countInStock", headerName:"Remaining Stock" , flex:1},
        {field:"description", headerName:"ProductDetails",flex:1},
        {field:"edit", headername:"Edit Product",flex:1,renderCell:({row:{slug}})=>{
            return(
                <div>
                    <button onClick={()=>push(`/editproduct/${slug}`)}><EditIcon/></button>
                </div>
            )
        }}
    ]
    const testRow=[{id:1,
                    name:"Black Shirt",
                    category:"shirt",
                    price:"2000",
                    batchSize:"2",
                    countInStock:"200",
                    description:"A Nice black Shirt",
                    slug: "black-shirt"
    },
    {id:2,
        name:"Black Shirt",
        category:"shirt",
        price:"2000",
        batchSize:"2",
        countInStock:"200",
        description:"A Nice black Shirt 2",
        slug: "black-shirt-2"
}
    ]
  return (
    <Layout>
        <div className="flex">
            <SidebarDashboard/>
            <div className="ml-4 mt-4 w-full">
            <DataGrid
            columns={columns}
            rows={props.products}
            getRowId={(pro)=> pro._id }
            />
            </div>
           
        </div>
    </Layout>
  )
}

export async function getServerSideProps(){
    await db.connect();
    const products = await Product.find().limit().lean();
    await db.disconnect();
    return{
      props:{
        products: products.map(db.convertDocToObj)
      }
    }
  }

export default listProducts