import React from 'react'
import{initFirebase} from '../firebase/firebase.App'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {useAuthState} from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'; 

const loginbutton = () => {
    const app = initFirebase();
    const auth = getAuth();
    const [user,loading] = useAuthState(auth);
    const {push} = useRouter();
  return (
    <div>{user? (<button onClick={()=>auth.signOut}>Sign Out</button>):(<button onClick={()=>push('/login')}>Login</button>)}</div>
  )
}

export default loginbutton