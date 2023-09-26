'use client'
import React,{useEffect} from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';



const login = () => {
  const router=useRouter();
  const[loading,setloading]=React.useState(false);
  const[buttonDisabeled,setButtonDisable]=React.useState(false);
  const[user,setUser]=React.useState({
    email:"",
    password:"",
  });
  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0){
      setButtonDisable(false)
    }
    else{
      setButtonDisable(true)
    }
  },[user]);
  const login=async ()=>{

    try{
      setloading(true);
      const response=await axios.post("/api/users/login",user);
      console.log("Login SUCCESSFUL",response.data);
      router.push("/employee");
      
    }
    catch(error:any){
      console.log("Login Failed",error.message);
      toast.error(error.message);

    }
    finally{
      setloading(false)
    }
  };
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 >{loading ? "Processing" :"Login"}</h1>
         <hr />
      <label htmlFor="email">email</label>
      <input className='p-1 bg-slate-500 text-color-white' type="text" value={user.email}
       id='email' placeholder='email' onChange={(e)=>setUser({...user,email:e.target.value})}/>
         
         <hr />
      <label htmlFor="password">password</label>
      <input className='p-1 bg-slate-500 text-color-white' type="password" value={user.password}
       id='password' placeholder='password' onChange={(e)=>setUser({...user,password:e.target.value})}/>
       <button onClick={login} className='p-2 m-2 border bg-blue-200 rounded-lg mb-4 
       focus:outline-none focus:border-gray-600 ' >Login</button>
       <Link className='p-2 m-2 border bg-red-800 rounded-lg 
       focus:outline-none focus:border-gray-950' href='/signup'>Visit SignUp</Link>
    </div>
  )
}

export default login

