import React from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ReorderIcon from '@mui/icons-material/Reorder';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import DropdownButton from '../Dropdown/DropdownButton';
import Sidecart from '../Sidecart/Sidecart';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import CategorySidebar from '../Sidebar/categorySidebar';


const Floatnav = () => {
    const {user} =useUser();
    const{push} = useRouter();
  return (
    <div className="bg-[#7A0A03] fixed bottom-0 flex items-center justify-center h-24 w-full text-[#F6DE8D] md:hidden z-30 duration-300">
        <div><button className="p-4 active:bg-red-400 rounded-full relative"><HomeOutlinedIcon/></button></div>
        <div><button className="p-4 rounded-full active:bg-red-400"><SearchOutlinedIcon/></button></div>
        <div><CategorySidebar/></div>
        <div className="p-4 mr-2">{user? (<DropdownButton Icon={PersonOutlineOutlinedIcon}/>):(<button onClick={()=>push('/api/auth/login')}><PersonOutlineOutlinedIcon/></button>)}</div>
        <div><Sidecart/></div>
    </div>
  )
}

export default Floatnav