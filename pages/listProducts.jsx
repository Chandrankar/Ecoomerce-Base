import React from 'react';
import Layout from '../components/Layout/Layout';
import SidebarDashboard from '../components/Sidebar/sidebarDashboard';
import {DataGrid} from '@mui/x-data-grid';
import db from '../utils/db';


const listProducts = () => {
    const columns=[
        {field:"name", headerName:"Name"},
        {field:"category", headerName:"Category"},
        {field:"price", headerName:"Price"},
        {field:"batchSize", headerName:"Size of Batch"},
        {field:"countInStock", headerName:"Remaining Stock" , flex:1},
        {field:"description", headerName:"ProductDetails",flex:1}
    ]
    const testRow=[{id:1,
                    name:"Black Shirt",
                    category:"shirt",
                    price:"2000",
                    batchSize:"2",
                    countInStock:"200",
                    description:"A Nice black Shirt"
    },
    {id:2,
        name:"Black Shirt",
        category:"shirt",
        price:"2000",
        batchSize:"2",
        countInStock:"200",
        description:"A Nice black Shirt 2"
}
    ]
  return (
    <Layout>
        <div className="flex">
            <SidebarDashboard/>
            <div className="ml-4 mt-4 w-full">
            <DataGrid
            checkboxSelection
            columns={columns}
            rows={testRow}
            />
            </div>
           
        </div>
    </Layout>
  )
}

export default listProducts