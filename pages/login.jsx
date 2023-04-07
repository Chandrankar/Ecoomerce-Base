import React, { useRef, useState } from 'react'
import SafetyCheckIcon from '@mui/icons-material/SafetyCheck';
import AuthCode, { AuthCodeRef } from 'react-auth-code-input';
import CallIcon from '@mui/icons-material/Call';
import PhoneInput from "react-phone-input-2";
import {  RecaptchaVerifier } from "firebase/auth";
import {auth} from '../firebase/firebase.App'
import { signInWithPhoneNumber } from "firebase/auth";

const login = () => {
    const handleOnChange=(res)=>{
        setOtp(res)
    }
    const AuthInputRef = useRef<AuthCodeRef>(null);
    const [otp,setOtp]= useState("");
    const [ph,setPh]= useState("");
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState(null)

    const onCaptchaVerify =()=>{
        if(!window.recaptchaVerifier){
            window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container',{
                'size': 'invisible',
                'callback': (response)=>{
                    onSignup()
                },
                'expired-callback':()=>{

                }
            },auth)
        }
    }

    function onSignup(){
        onCaptchaVerify()

        const appVerifier = window.recaptchaVerifier

        const formatPh = '+' + ph
        signInWithPhoneNumber(auth, formatPh, appVerifier)
    .then((confirmationResult) => {
      
      window.confirmationResult = confirmationResult;
      setShowOTP(true)

    }).catch((error) => {
     console.log(error)
    });
    }

    function onOTPVerify(){
        window.confirmationResult.confirm(otp).then(async(result) => {
            console.log(result)
             setUser(result.user);
            // ...
          }).catch((error) => {
            console.log(error)
          });
    }
  return (
    <section className="bg-red-primary flex items-center justify-center h-screen">
        <div>
            <div id="recaptcha-container"></div>
            {user? (<div>
                <h2 className="text-center leading-normal text-white font-medium text-2xl">
                    Login Success
                </h2>
            </div>):(<div className="w-80 flex flex-col gap-4 rounded-lg p-4">
                <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
                    Welcome to <br/> GOURI PUJA
                </h1>
                {
                    showOTP? ( <>
                        <div className="bg-white text-red-primary w-fit mx-auto p-4 rounded-full">
                            <SafetyCheckIcon sx={{fontSize: 40}}/>
                        </div>
                        <label htmlFor="ph" className="font-bold text-2xl text-white text-center">
                            Enter Your OTP
                        </label>
                        <AuthCode 
                            allowedCharacters ="numeric"
                            onChange={handleOnChange} 
                            length={6}
                            />
                            <button className="primary-button" onClick={onOTPVerify}>Verify OTP</button>
                    </>):( <>
                    <div className="bg-white text-red-primary w-fit mx-auto p-4 rounded-full">
                        <CallIcon sx={{fontSize: 40}}/>
                    </div>
                    <label htmlFor="ph" className="font-bold text-2xl text-white text-center">
                        Enter Your Phone Number
                    </label>
                    <PhoneInput country={"in"} value={ph} onChange={setPh}/>
                        <button className="primary-button" onClick={onSignup}>Get OTP</button>
                </>)
                }
            </div>
            )}
            
        </div>
    </section>
  )
}

export default login