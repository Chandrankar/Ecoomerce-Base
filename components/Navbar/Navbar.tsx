import React,{Fragment, useState} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import Loginbutton from '../LoginButton/loginbutton';
import Sidecart from '../Sidecart/Sidecart';
import { useUser } from '@auth0/nextjs-auth0/client';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import Dropdown from '../Dropdown/Dropdown';
import Floatnav from './Floatnav';


  
  function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
  }

const Navbar = () => {

  const{push} = useRouter();
  const {user} = useUser();
  const [query,setQuery] = useState('');

  const submitHandler = (e:any)=>{
    e.preventDefault();
    push(`/search?query=${query}`);
  }


  return (
    <>
    <Disclosure as="nav" className="bg-[#7A0A03] w-full">
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
                  <div className="ml-20 text-white text-xl font-bold">Gauri Puja</div>
                <div className="hidden bg-gray-100 rounded-lg md:block w-3/4"><form onSubmit={submitHandler} className="flex justify-between">
                    <button className="px-1" ><SearchRoundedIcon/></button>
                    <input type="text" 
                        placeholder='Search Sarees, Kurtis and more...'
                        onChange={(e)=>setQuery(e.target.value)}
                        className="border-none bg-gray-100 w-full" />
                    <button className="px-1"><FormatListBulletedRoundedIcon/></button>
                </form>
                </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="hidden md:block">
                <Sidecart/>
              </div>
              <div className="hidden md:block ml-4">
              {user? (<Menu as="div" className="relative ml-3">
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
                            Specials
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/dashboard"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            dashboard
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
                </Menu>):(<Loginbutton/>)}
              </div>
                
              </div>
            </div>
          </div>
          <div className="hidden md:flex justify-between items-center text-white p-2 mx-16 text-bold">
            <div><Link href="/">Home</Link></div>
            <div><Dropdown name="Saree"/></div>
            <div><Dropdown name="Kurti"/></div>
            <div><Dropdown name="Kurta Set"/></div>
            <div><Dropdown name="Grown"/></div>
            <div><Dropdown name="Shirt"/></div>
            <div><Dropdown name="Fabrics"/></div>
            <div><Dropdown name="Trending Collection"/></div>
            </div>
        </>
    </Disclosure>
    <Floatnav/>
    </>
  )
}

export default Navbar