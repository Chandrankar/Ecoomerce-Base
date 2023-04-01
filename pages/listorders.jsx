import React, {useEffect,useState} from 'react';
import Layout from '../components/Layout/Layout';
import SidebarDashboard from '../components/Sidebar/sidebarDashboard';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import axios from 'axios';

const listorders = () => {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    async function getcategories(){
        try{
        const ord = await axios.get('/api/getOrders')
        console.log(ord.data)
        setOrders(ord.data)
        //categories = cat.data
    }catch(error){
        toast.error('something went wrong')
    }
} getcategories()
}, [])
    const columns=[
        {field:"_id",headerName:"Order Id",flex:1},
        {field:"totalPrice",headerName:"Total Price",flex:1},
        {field:"isPaid",headerName:"Payment Status", flex:1},
        {field:"isDelivered",headerName:"Delivery Status",flex:1},
        {field:"status",headerName:"Status",flex:1},
        {field:"createdAt",headerName:"Order Date",flex:1},
    ]
  return (
    <Layout>
        <div className="flex">
            <SidebarDashboard/>
            <div className="ml-4 mt-4 w-full">
            <DataGrid
            columns={columns}
            rows={orders}
            getRowId={(ord)=> ord._id }
            components={{Toolbar: GridToolbar}}
            />
            </div>
        </div>
    </Layout>
  )
}


export default listorders