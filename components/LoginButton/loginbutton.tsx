import {Button, Box} from "@mui/material";
import {useRouter} from "next/router";
import {useUser} from '@auth0/nextjs-auth0/client';

const Loginbutton = () =>{
  const {push} = useRouter()
  const {isLoading,
        user,
        error} = useUser()

  if(isLoading) return(
    <div>
      Loading...
    </div>
  )

  const handleLogin =()=>push('/api/auth/login')
  const handleLogout=()=>push('/api/auth/logout')
  console.log(user);

  return(
    <div>
      {user? (<>
        <div>{user.name}</div>
        <Button variant="contained" onClick={handleLogout}>Logout</Button>
        </>
      ):(
      <Button variant="contained" onClick={handleLogin}>Login</Button>
      )}
      </div>
  )
}

export default Loginbutton