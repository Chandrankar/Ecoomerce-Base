import React, {useState} from 'react';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionIcon from '@mui/icons-material/Description';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from 'next/link';

const SidebarDashboard = () => {

    const [open, setOpen] = useState(false);
    const[submenuOpen,setSubmenuOpen] = useState(false);


    const Menus =[
      {title:"Home", icon:<HomeIcon/>, href:"/"},
      {title:"Analytics",icon: <BarChartIcon/>,href:"/"},
      {title:"Users",icon:<PeopleAltIcon/>, href:"/users"},
      {title:"User Profile",icon:<PersonIcon/>, href:"/"},
      {title:"Account",icon:<AccountBoxIcon/>, href:'/'},
      {title:"E-commerce", icon:<ShoppingCartIcon/>,
      submenu: true,
      submenuItems:[
        {title:"Overview", href:"/"},
        {title:"Products", href:"/listProducts"},
        {title:"Add Product", href: "/addproduct"},
        {title:"Orders", href:"/listorders"},
        {title:"Customer", href:"/"},
        {title:"Checkout", href:"/"}
      ]
      },
      {title:"Invoice",icon:<DescriptionIcon/>, href:"/"},
    ]

    
  return (
    <div className={`bg-red-primary h-screen fixed-insert-0 ${open ? "w-72":"w-20"} p-5 pt-8 relative duration-300 h-auto`} >
      <button onClick={()=>setOpen(!open)}>
      <ArrowCircleLeftOutlinedIcon className={`text-gold-primary text-3xl rounded-full absolute -right-3 top-9 border border-gold-primary cursor-pointer ${!open && "rotate-180"}`}/>
      </button>
      
      <ul>
        {Menus.map((menu, index)=>(
          <>
            <li key={index} className="text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-red-500 rounded-md mt-2">
              {!menu.submenu && (<Link className="flex items-center gap-x-4" href={menu.href}>
                {menu.icon}
                {open &&(<span>{menu.title}</span>)}
              </Link>)}
              {menu.submenu && (<>
                {menu.icon}
                {open &&(<span>{menu.title}</span>)}
                {menu.submenu && open &&(
                <KeyboardArrowDownIcon className={`${submenuOpen && "rotate-180"}`} onClick={()=>setSubmenuOpen(!submenuOpen)}/>
              ) }
              </>)}
              
            </li>
            {menu.submenu && submenuOpen && open&& (
              <ul>
                {menu.submenuItems.map((submenuItem)=>(
                  <li key={submenuItem.title} className="text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-red-500 rounded-md mt-2 duration-300">
                    <Link href={submenuItem.href}>{submenuItem.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        ))}
      </ul>
    </div>
  )
}

export default SidebarDashboard