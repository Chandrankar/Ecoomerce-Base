import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import {useForm} from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';

const orderSearch = () => {
    const {push} = useRouter();
    const [orderid, setOrderid] = useState('')
    const{handleSubmit} = useForm();
    const formSubmit =()=>{
        push(`/order/${orderid}`)
    }
  return (
    <Layout>
        <div className="flex mx-4">
            <form onSubmit={handleSubmit(formSubmit)} className="flex">
                <label htmlFor="orderId" className="p-4">Enter Order Id</label>
                <div className="border-2 rounded-md">
                    <input type="text" className="border-0 p-4" onChange={(e)=>setOrderid(e.target.value)}/>
                    <button className="mt-2"><SearchIcon/></button>
                </div>
                
            </form>
        </div>
    </Layout>
  )
}

export default orderSearch