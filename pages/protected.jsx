import React from 'react';
import {withPageAuthRequired, getSession} from '@auth0/nextjs-auth0';
import Categoryfilter from '../components/CategoryFilter/categoryfilter';
import {useUser} from '@auth0/nextjs-auth0/client'
const Protected = () => {
  const {user}=useUser()
  console.log(user)
  return (
    <div><Categoryfilter/>
    {user? (<div>{user.email}</div>): undefined}
    </div>
  )
}

// export const getServerSideProps = withPageAuthRequired(
//    { returnTo: '/',
//     getServerSideProps: async ctx=>{
//         const session = await getSession(ctx.req,ctx.res)
//         console.log(session)
//         return{
//             props:{}
//         }
//     }
//     }
// )

export default Protected