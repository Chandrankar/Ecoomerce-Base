import React from 'react';
import Layout from '../components/Layout/Layout';
import SidebarDashboard from '../components/Sidebar/sidebarDashboard';
import{DataGrid} from "@mui/x-data-grid";

const users = () => {
    const columns=[]
  return (
    <Layout>
        <SidebarDashboard/>
    </Layout>
  )
}

export default users
