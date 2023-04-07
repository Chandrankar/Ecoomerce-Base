import React,{useState, useEffect} from 'react';
import{initFirebase} from '../firebase/firebase.App'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {useAuthState} from 'react-firebase-hooks/auth'
import LoggedNav from '../components/Navbar/LoggedNav'
import ManageCategories from '../components/manageCategories'


const test = () => {
  const app = initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user,loading] = useAuthState(auth);
  const callApi=async()=>{
    const token= await user.getIdToken();
    console.log('Token',token)
  }

  if(loading) {return<div>Loading...</div>}
  if(user){ return <div>{user.displayName}
  <button onClick={()=> auth.signOut()}>Sign Out</button>
  <button onClick={()=>callApi()}>Token</button>
  </div>}

  const signIn = async()=>{
    const result = await signInWithPopup(auth, provider)
    console.log(result.user)
    
  }
  return (
    
    <div className="text-center flex flex-col gap-4 items-center">
      <LoggedNav/>
      <button className="bg-blue-600 text-white rounded-md p-2 w-48" onClick={signIn}>Sign In</button>
      <ManageCategories/>
    </div>
    
  )
}

export default test