import React,{useState} from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import DropdownButton from '../Dropdown/DropdownButton';
import Sidecart from '../Sidecart/Sidecart';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import CategorySidebar from '../Sidebar/categorySidebar';
import { useRouter } from 'next/router';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';


const Floatnav = () => {
    const {user} =useUser();
    const {push} = useRouter();
    const [query,setQuery] = useState('');
    const[active , setActive] = useState(false)
    const submitHandler = (e)=>{
        setActive(!active)
        e.preventDefault();
        push(`/search?query=${query}`);
      }
  return (
    <>
      <div className="bg-[#7A0A03] fixed bottom-0 flex items-center justify-between h-24 w-full text-[#F6DE8D] md:hidden z-30 duration-300 px-8">
        <div><Link href='/' className=" active:bg-red-400 rounded-full relative" ><HomeOutlinedIcon/></Link></div>
        <div><button className="rounded-full active:bg-red-400" onClick={()=>setActive(!active)}><SearchOutlinedIcon/></button></div>
        <div><CategorySidebar/></div>
        <div>{user? (<DropdownButton Icon={PersonOutlineOutlinedIcon}/>):(<button onClick={()=>push('/api/auth/login')}><PersonOutlineOutlinedIcon/></button>)}</div>
        <div><Sidecart className="ml-4"/></div>
      </div>
      <div className={`${active? 'block' : 'hidden'} mx-12 fixed flex min-h-screen flex-col mt-24 overflow-hidden rounded-md md:hidden z-20`}>
            <div className=" bg-blue-100 shadow-xl rounded-md">
            <div className=" bg-gray-100 rounded-lg w-full"><form onSubmit={submitHandler} className="flex justify-between">
                    <button className="px-1" ><SearchRoundedIcon/></button>
                    <input type="text" 
                        placeholder='Search Sarees, Kurtis and more...'
                        onChange={(e)=>setQuery(e.target.value)}
                        className="border-none bg-gray-100 w-full" />
                    <button className="px-1"><FormatListBulletedRoundedIcon/></button>
                </form></div>
            </div>
        </div>
    </>
    
  )
}

export default Floatnav