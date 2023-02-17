import React from 'react';
import {withPageAuthRequired, getSession} from '@auth0/nextjs-auth0';
import Categoryfilter from '../components/CategoryFilter/categoryfilter';
const Protected = () => {
  return (
    <div><Categoryfilter/></div>
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