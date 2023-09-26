/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React,{useState} from 'react'
import Link from "next/link";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';


export default function userprofile() {
  const[data,setData]=useState("nothing");
  const route=useRouter();
  const logout=async ()=>{
    try{
      await axios.get('/api/users/logout');
      toast.success("Logot Successful")
      route.push('/login');
    }
    catch(error:any){
      console.log(error.message);
      toast.error(error.message);
    }
  }
  const getUserDetails=async ()=>{
    const res=await axios.get('/api/users/me');
    console.log(res.data);
    setData(res.data.data._id);
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 '>
      <h1>ProfilePage</h1>
        <h1 className='p-1 rounded bg-green-400'>{data==='nothing' ?"Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h1>
        <br />
      <button onClick={logout}
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>LogOut</button>
    <br/>
        <button onClick={getUserDetails}
      className='bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>GetuserDetails</button>

      
    </div>
  )
}

