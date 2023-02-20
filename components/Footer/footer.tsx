import React from 'react';
import Link from 'next/link';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (

<footer className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
    <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
      <Link href ="/" className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
      <img className="hidden h-8 w-auto lg:block"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
          alt="Your Company"
      />
        <span className="ml-3 text-xl">Tailwind</span>
      </Link>
      <p className="mt-2 text-sm text-gray-500">Air plant banjo lyft occupy retro adaptogen indego</p>
    </div>
    <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
        <nav className="list-none mb-10">
          <li>
            <Link href="" className="text-gray-600 hover:text-gray-800">First Link</Link>
          </li>
          <li>
            <Link href="" className="text-gray-600 hover:text-gray-800">Second Link</Link>
          </li>
          <li>
            <Link href="" className="text-gray-600 hover:text-gray-800">Third Link</Link>
          </li>
          <li>
            <Link href="" className="text-gray-600 hover:text-gray-800">Fourth Link</Link>
          </li>
        </nav>
      </div>
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
        <nav className="list-none mb-10">
          <li>
            <Link href="" className="text-gray-600 hover:text-gray-800">First Link</Link>
          </li>
          <li>
            <Link href="">Second Link</Link>
          </li>
          <li>
            <Link href="" className="text-gray-600 hover:text-gray-800">Third Link</Link>
          </li>
          <li>
            <Link href="" className="text-gray-600 hover:text-gray-800">Fourth Link</Link>
          </li>
        </nav>
      </div>
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
        <nav className="list-none mb-10">
          <li>
            <Link href="" className="text-gray-600 hover:text-gray-800">First Link</Link>
          </li>
          <li>
            <Link href="" className="text-gray-600 hover:text-gray-800">Second Link</Link>
          </li>
          <li>
            <Link href="" className="text-gray-600 hover:text-gray-800">Third Link</Link>
          </li>
          <li>
            <Link href="" className="text-gray-600 hover:text-gray-800">Fourth Link</Link>
          </li>
        </nav>
      </div>
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
        <nav className="list-none mb-10">
          <li>
            <Link href="" className="text-gray-600 hover:text-gray-800">First Link</Link>
          </li>
          <li>
            <Link href="" className="text-gray-600 hover:text-gray-800">Second Link</Link>
          </li>
          <li>
            <Link href="" className="text-gray-600 hover:text-gray-800">Third Link</Link>
          </li>
          <li>
            <Link href="" className="text-gray-600 hover:text-gray-800">Fourth Link</Link>
          </li>
        </nav>
      </div>
    </div>
  </div>
  <div className="bg-gray-100">
    <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
      <p className="text-gray-500 text-sm text-center sm:text-left">© 2023 Ecom
      </p>
      <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
        <a className="text-gray-500 h-5 w-5 mb-2">
          <TwitterIcon/>
        </a>
        <a className="ml-3 text-gray-500 h-5 w-5 mb-2">
          <FacebookIcon/>
        </a>
        <a className="ml-3 text-gray-500 h-5 w-5 mb-2">
         <InstagramIcon/>
        </a>
      </span>
    </div>
  </div>
</footer>
  )
}

export default Footer