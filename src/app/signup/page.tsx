'use client'
import React,{useEffect} from 'react';
import Link from "next/link";

import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';



const signupPage = () => {

  console.log(process.env.MONGOOS_URL);
  const[user,setUser]=React.useState({
    email:"",
    password:"",
    username:""
  });
  const router=useRouter();
  const[loading,setloading]=React.useState(false);
  const[buttonDisabeled,setButtonDisable]=React.useState(false);
  useEffect(()=>{
    if(user.email.length>0 && user.username.length>0 && user.password.length>0){
      setButtonDisable(false)
    }
    else{
      setButtonDisable(true)
    }
  },[user]);

  const onsingup=async ()=>{
    try{
      setloading(true);
      const response=await axios.post("/api/users/signup",user);
      console.log("SIGNUP SUCCESSFUL",response.data);
      router.push("/login");
      
    }
    catch(error:any){
      console.log("Singup Failed",error.message);
      toast.error(error.message);

    }
    finally{
      setloading(false)
    }
  };
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 >{loading ? "Processing...":"SingUp"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input className='p-1 bg-slate-500 text-color-white' type="text" value={user.username}
       id='username' placeholder='username' onChange={(e)=>setUser({...user,username:e.target.value})}/>
         <hr />
      <label htmlFor="email">email</label>
      <input className='p-1 bg-slate-500 text-color-white' type="text" value={user.email}
       id='email' placeholder='email' onChange={(e)=>setUser({...user,email:e.target.value})}/>
         
         <hr />
      <label htmlFor="password">password</label>
      <input className='p-1 bg-slate-500 text-color-white' type="password" value={user.password}
       id='password' placeholder='password' onChange={(e)=>setUser({...user,password:e.target.value})}/>
       <button onClick={onsingup} className='p-2 m-2 border
        bg-blue-200 rounded-lg mb-4 focus:outline-none
         focus:border-gray-600 ' >{buttonDisabeled ? "No SignUp":"SignUp"}</button>
       <Link className='p-2 m-2 border bg-red-800 rounded-lg
        focus:outline-none focus:border-gray-950' href='/login'>Visit Login</Link>
    </div>
  )
}

export default signupPage
