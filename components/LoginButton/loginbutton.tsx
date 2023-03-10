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

  return(
    <div>
      {user? (<>
        <div>{user.name}</div>
        <button className="text-white text-xl" onClick={handleLogout}>Logout</button>
        </>
      ):(
      <button className="text-white text-xl" onClick={handleLogin}>Login</button>
      )}
      </div>
  )
}

export default Loginbutton