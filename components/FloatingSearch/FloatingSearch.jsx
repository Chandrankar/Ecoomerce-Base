import React,{useState} from 'react'
import { useRouter } from 'next/router';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const FloatingSearch = () => {

    
    
  return (
    <div>
        <button onClick={()=>setActive(!active)} className="rounded-full active:bg-red-400"><SearchOutlinedIcon/></button>
        
    </div>
  )
}

export default FloatingSearch