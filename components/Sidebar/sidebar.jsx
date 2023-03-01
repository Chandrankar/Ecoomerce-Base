import React, {useState} from 'react';
import ReorderRoundedIcon from '@mui/icons-material/ReorderRounded';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionIcon from '@mui/icons-material/Description';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import Link from 'next/link';

const sidebar = () => {

    const [open, setOpen] = useState(true);
    const menus=[
      {name:"Home",link:'/',icon:HomeIcon},
      {name:"Analytics",link:'/',icon:BarChartIcon},
      {name:"Users",link:'/',icon:PeopleAltIcon},
      {name:"User Profile",link:'/',icon: PersonIcon},
      {name:"Account",link:'/',icon:AccountBoxIcon},
      {name:"Ecommerce",link:'/',icon:ShoppingCartIcon},
      {name:"Calendar",link:'/',icon:CalendarMonthIcon},
      {name:"Invoice",link:'/',icon:DescriptionIcon},
      {name:"Messages",link:'/',icon:MessageRoundedIcon}
    ]
  return (
    <section className="flex gap-6">
      <div className={`bg-[#7A0A03] min-h-screen ${open ?'w-72':'w-16'} text-white`}>
        <div className="py-3 flex justify-end">
          <ReorderRoundedIcon size={26} className="cursor-pointer" onClick={()=>setOpen(!open)}/>
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i)=>(
            <Link href={menu?.link} className="flex items-center text-sm gap-3.5 font-medium p-3 hover:bg-red-600 rounded-md">
            <div>{React.createElement(menu?.icon,{size:20})}</div>
            <h2 className={`whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`}>{menu?.name}</h2>
          </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default sidebar