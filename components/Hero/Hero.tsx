import React, {useState, Fragment} from 'react'
import Image from 'next/image';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import PermIdentitySharpIcon from '@mui/icons-material/PermIdentitySharp';
import Sidecart from '../Sidecart/Sidecart';
import Dropdown from '../Dropdown/Dropdown';
import { useRouter } from 'next/router';
import {useUser} from '@auth0/nextjs-auth0/client';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import Link from 'next/link';


function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
  }

const Hero = () => {
    const {push} = useRouter();
    const [query,setQuery] = useState('');
    const submitHandler = (e:any)=>{
        console.log('Clicked')
        e.preventDefault();
        push(`/search?query=${query}`);
      }
    const {user} = useUser();
  return (
    <div className="bg-gradient-to-t from-red-500 to-orange-500 pt-4 w-full">
        <div className="flex justify-between mx-4">
            <p className="text-white">Gauri Puja</p>
            <div className="hidden md:block bg-gray-100 rounded-lg w-1/2"><form onSubmit={submitHandler} className="flex justify-between">
                    <button className="px-1" ><SearchRoundedIcon/></button>
                    <input type="text" 
                        placeholder='Search Sarees, Kurtis and more...'
                        onChange={(e)=>setQuery(e.target.value)}
                        className="border-none bg-gray-100 w-full" />
                    <button className="px-1"><FormatListBulletedRoundedIcon/></button>
                </form></div>
                <div className="hidden md:flex px-4 text-white divide-x-2 text-xl text-center items-center">
                    {user ? (<Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/api/auth/logout"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Signout
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>):(<div className="mx-2 text-center items-center cursor-pointer" onClick={()=>push('/api/auth/login')}>
                        <PermIdentitySharpIcon/>Sign In
                    </div>)}
                    
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
            <div className="pt-24 pl-12 mb-4">
                <div className="p-4">
                <p className="text-white text-2xl py-2">Best Deal Online for Ethnic</p>
                <p className="text-amber-200 text-6xl font-bold py-2">Wear The Culture</p>
                <p className="text-white text-2xl">UP to 80% OFF</p>
                </div>
                <div className="px-4">
                <button className="text-red-700 bg-amber-300 rounded-md p-2 hover:bg-amber-200 active:bg-amber-400 focus:ring-2         " onClick={()=>push('/About')}>Learn More</button>
                </div>
                
            </div>
            <div className="hidden md:block px-8"><Image
            src="/hero.png"
            alt="Picture"
            width={350}
            height={200}
            /></div>
        </div>
        <div className="md:hidden"><Image
            src="/hero.png"
            alt="Picture"
            width={150}
            height={150}
            /></div>
    </div>
  )
}

export default Hero