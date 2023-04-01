import React,{useEffect, useState} from 'react';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {toast} from 'react-toastify';
import axios from 'axios'
import Link from 'next/link';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const Dropdown = ({name}) => {
  const [subCat, setSubCat] = useState([])
  useEffect(() => {
    async function getcategories(){
        try{
        const cat = await axios.post('/api/getSubCat',{name})
        //console.log(cat.data)
        setSubCat(cat.data)
        //categories = cat.data
    }catch(error){
        //toast.error('something went wrong')
    }
} getcategories()
}, [name])
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md  bg-transparent px-4 py-2 text-white">
          {name}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
        <Menu.Items className="absolute  z-10 mt-2 w-56 origin-top rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {subCat.map((sub)=>(
              <Menu.Item>
              {({ active }) => (
                <Link
                  href={`/search?query=${sub.subName}`}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  {sub.subName}
                </Link>
              )}
            </Menu.Item>
            ))}
           
            
            
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={`/search?category=${name}`}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  View All
                </Link>
              )}
            </Menu.Item>
              
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Dropdown