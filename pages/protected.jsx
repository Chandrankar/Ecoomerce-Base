import React from 'react';
import {withPageAuthRequired, getSession} from '@auth0/nextjs-auth0';

const Protected = () => {
  return (
    <div>Protected</div>
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

export default withPageAuthRequired(Protected)