import React, {useState} from 'react'
import Image from 'next/image';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import PermIdentitySharpIcon from '@mui/icons-material/PermIdentitySharp';
import Sidecart from '../Sidecart/Sidecart';
import Dropdown from '../Dropdown/Dropdown';
import { useRouter } from 'next/router';

const Hero = () => {
    const {push} = useRouter();
    const [query,setQuery] = useState('');
    const submitHandler = (e:any)=>{
        console.log('Clicked')
        e.preventDefault();
        push(`/search?query=${query}`);
      }
  return (
    <div className="bg-gradient-to-t from-red-500 to-orange-500 pt-4 w-full">
        <div className="flex justify-between mx-4">
            <p className="text-white">Gauri Puja</p>
            <div className="bg-gray-100 rounded-lg w-1/2"><form onSubmit={submitHandler} className="flex justify-between">
                    <button className="px-1" ><SearchRoundedIcon/></button>
                    <input type="text" 
                        placeholder='Search Sarees, Kurtis and more...'
                        onChange={(e)=>setQuery(e.target.value)}
                        className="border-none bg-gray-100 w-full" />
                    <button className="px-1"><FormatListBulletedRoundedIcon/></button>
                </form></div>
                <div className="flex px-4 text-white divide-x-2 text-xl text-center items-center">
                    <div className="mx-2 text-center items-center" onClick={()=>push('/api/auth/login')}>
                        <PermIdentitySharpIcon/>Sign In
                    </div>
                    <div className="mx-2 text-center items-end">
                        <Sidecart/>
                    </div>
                </div>
        </div>
        <div className="hidden md:flex justify-between text-white px-4 pt-4">
            <button>Home</button>
            <Dropdown name= "Saree"/>
            <Dropdown name = "Kurti"/>  
            <Dropdown name = "Kurta Set"/>
            <Dropdown name = "Grown"/>
            <Dropdown name = "Shirt"/>  
            <Dropdown name = "Fabrics"/>
            <Dropdown name = "Trending Collection"/>
                
        </div>
        <div className="flex justify-between px-8">
            <div className="pt-24 pl-12">
                <div className="p-4">
                <p className="text-white text-2xl py-2">Best Deal Online for Ethnic</p>
                <p className="text-amber-200 text-6xl font-bold py-2">Wear The Culture</p>
                <p className="text-white text-2xl">UP to 80% OFF</p>
                </div>
                <div className="px-4">
                <button className="text-red-700 bg-amber-300 rounded-md p-2 hover:bg-amber-200 active:bg-amber-400 focus:ring-2         ">Learn More</button>
                </div>
                
            </div>
            <div className="px-8"><Image
            src="/hero.png"
            alt="Picture"
            width={350}
            height={200}
            /></div>
        </div>
    </div>
  )
}

export default Hero