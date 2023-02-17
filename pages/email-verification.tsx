import React, {useEffect,useState} from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';

const EmailVerified = () => {
    const{
        query:{updateSession},
        push
    } = useRouter();
    const[refreshed, setRefreshed] = useState(false)

    useEffect(()=>{
        if(updateSession ==='true'){
            axios.get('/api/refreshToken').then(data=>{
                if(data) setRefreshed(true)
            })
        }
    }, [updateSession])

  return (
    <div>
        Your Email is verified
        {refreshed && <Button onClick={()=>push('/')}>Go to home</Button>}
    </div>
  )
}

export default EmailVerified