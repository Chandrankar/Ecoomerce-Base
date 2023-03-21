import React from 'react';
import Layout from '../components/Layout/Layout';
import SidebarDashboard from '../components/Sidebar/sidebarDashboard';
import {DataGrid} from '@mui/x-data-grid';

const listorders = () => {
    const columns=[
        {field:"name",headerName:"Name"},
        {field:"price",headerName:"Total Price"},
        {field:"payment-status",headerName:"Name"},
    ]
  return (
    <Layout>
        <div className="flex">
            <SidebarDashboard/>

        </div>
    </Layout>
  )
}

export default listorders